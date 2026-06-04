/**
 * ─────────────────────────────────────────────────────────────
 * TripMind — 데이트 추천 실데이터 프록시 (Cloudflare Worker)  v2
 * ─────────────────────────────────────────────────────────────
 * 정적 프론트(GitHub Pages)가 직접 못 부르는 네이버/구글 API를
 * 서버에서 대신 호출하는 프록시. (CORS + 키 보호)
 *
 * ■ 환경변수(Secret): NAVER_ID, NAVER_SECRET, GOOGLE_KEY(선택·별점/영업시간),
 *                    TOURAPI_KEY(선택·축제/전시 기간검증·한국관광공사), ALLOW_ORIGIN(선택)
 *
 * ■ 엔드포인트
 *   GET /health
 *   GET /spots?area=홍대&cat=한식&n=10&hours=1&day=5
 *        cat : 맛집 한식 중식 일식 양식 술집 카페 디저트 브런치 데이트명소 ...
 *        n   : 1~10 (네이버 지역검색은 1쿼리 최대 5건이라 여러 키워드로 모아 dedupe)
 *        hours=1 + day=(0=일~6=토) : 구글 영업시간(GOOGLE_KEY 필요)
 *   GET /enrich?name=어니언 성수&area=성수
 *
 * ■ 정직 고지: 별점·영업시간은 구글 Places에서만 옵니다(네이버/카카오 미제공).
 *   구글은 호출당 과금 → 결과 6시간 캐시로 비용 최소화.
 * ─────────────────────────────────────────────────────────────
 */

const CACHE_TTL   = 21600;  // 6시간
const RATE_LIMIT  = 30;     // IP당 일일 최대 요청 수
const RATE_TTL    = 86400;  // 1일 (KV TTL)

// ── IP별 레이트 리밋 (Cloudflare KV) ──────────────────────────
async function checkRateLimit(request, env) {
  if (!env.RATELIMIT_KV) return false; // KV 미설정 시 패스

  const ip  = request.headers.get('CF-Connecting-IP') || 'unknown';
  const day = new Date().toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD
  const key = `rl:${ip}:${day}`;

  const raw   = await env.RATELIMIT_KV.get(key);
  const count = raw ? parseInt(raw, 10) : 0;
  if (count >= RATE_LIMIT) return true; // 초과

  // 카운터 증가 (하루 만료)
  await env.RATELIMIT_KV.put(key, String(count + 1), { expirationTtl: RATE_TTL });
  return false;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const cors = {
      'Access-Control-Allow-Origin': env.ALLOW_ORIGIN || '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    if (request.method === 'OPTIONS') return new Response(null, { headers: cors });
    if (request.method !== 'GET') return json({ error: 'GET only' }, 405, cors);

    if (url.pathname === '/health') {
      return json({ ok: true,
        naver: !!(env.NAVER_ID && env.NAVER_SECRET),
        google: !!env.GOOGLE_KEY, ts: Date.now() }, 200, cors);
    }

    // 레이트 리밋 체크 (/health 제외)
    const limited = await checkRateLimit(request, env);
    if (limited) {
      return json({ error: '요청이 너무 많습니다. 내일 다시 시도해주세요.' }, 429, {
        ...cors, 'Retry-After': '86400',
      });
    }

    const cache = caches.default;
    const hit = await cache.match(request);
    if (hit) { const r = new Response(hit.body, hit); r.headers.set('X-Cache', 'HIT'); return r; }

    try {
      let body;
      if (url.pathname === '/spots')           body = await handleSpots(url, env);
      else if (url.pathname === '/enrich')     body = await handleEnrich(url, env);
      else if (url.pathname === '/geocode')    body = await handleGeocode(url, env);
      else if (url.pathname === '/exhibitions') body = await handleExhibitions(url, env);
      else return json({ error: 'not found', endpoints: ['/health', '/spots', '/enrich', '/geocode', '/exhibitions'] }, 404, cors);

      const res = json(body, 200, { ...cors, 'Cache-Control': `public, max-age=${CACHE_TTL}`, 'X-Cache': 'MISS' });
      ctx.waitUntil(cache.put(request, res.clone()));
      return res;
    } catch (e) {
      return json({ error: String((e && e.message) || e) }, 500, cors);
    }
  }
};

// ── 유틸 ──
function json(obj, status, headers) {
  return new Response(JSON.stringify(obj), {
    status: status || 200,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...(headers || {}) }
  });
}
function stripTags(s) { return String(s || '').replace(/<[^>]*>/g, '').trim(); }

// ── 네이버 지역검색 (실제 상호·주소, 블로그 리뷰 많은 순) — 1쿼리 최대 5건 ──
async function naverLocal(env, query, n) {
  if (!env.NAVER_ID || !env.NAVER_SECRET) throw new Error('네이버 키 미설정 (NAVER_ID / NAVER_SECRET)');
  const display = Math.min(Math.max(n || 5, 1), 5);
  const u = `https://openapi.naver.com/v1/search/local.json?query=${encodeURIComponent(query)}&display=${display}&sort=comment`;
  const r = await fetch(u, { headers: { 'X-Naver-Client-Id': env.NAVER_ID, 'X-Naver-Client-Secret': env.NAVER_SECRET } });
  if (!r.ok) throw new Error(`네이버 지역검색 실패 ${r.status}`);
  const d = await r.json();
  return (d.items || []).map(it => ({
    name: stripTags(it.title),
    category: it.category || '',
    address: it.roadAddress || it.address || '',
    tel: it.telephone || '',
    naverLink: it.link || '',
    mapx: it.mapx, mapy: it.mapy,
  }));
}

// ── 네이버 블로그 총 개수 (인기/후기 지표) ──
async function naverBlogTotal(env, query) {
  try {
    const u = `https://openapi.naver.com/v1/search/blog.json?query=${encodeURIComponent(query)}&display=1`;
    const r = await fetch(u, { headers: { 'X-Naver-Client-Id': env.NAVER_ID, 'X-Naver-Client-Secret': env.NAVER_SECRET } });
    if (!r.ok) return null;
    const d = await r.json();
    return typeof d.total === 'number' ? d.total : null;
  } catch (_) { return null; }
}

// ── 구글 Places — ⭐별점·리뷰수 + (옵션) 영업시간 ──
async function googlePlace(env, query, wantHours, dayIdx) {
  if (!env.GOOGLE_KEY) return null;
  try {
    const u = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(query)}&inputtype=textquery&language=ko&fields=rating,user_ratings_total,place_id,opening_hours,name&key=${env.GOOGLE_KEY}`;
    const r = await fetch(u);
    if (!r.ok) return null;
    const d = await r.json();
    const c = (d.candidates || [])[0];
    if (!c) return null;
    const out = {
      rating: c.rating ?? null, reviews: c.user_ratings_total ?? null, placeId: c.place_id || null,
      openNow: (c.opening_hours && typeof c.opening_hours.open_now === 'boolean') ? c.opening_hours.open_now : null,
      todayHours: null,
    };
    if (wantHours && out.placeId) {
      const det = await googleDetails(env, out.placeId, dayIdx);
      if (det) { if (det.openNow != null) out.openNow = det.openNow; out.todayHours = det.todayHours; }
    }
    return out;
  } catch (_) { return null; }
}

// 구글 Place Details — 요일별 영업시간(weekday_text)에서 해당 요일만 추출
async function googleDetails(env, placeId, dayIdx) {
  try {
    const u = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&language=ko&fields=opening_hours&key=${env.GOOGLE_KEY}`;
    const r = await fetch(u);
    if (!r.ok) return null;
    const d = await r.json();
    const oh = d.result && d.result.opening_hours;
    if (!oh) return null;
    let today = null;
    if (Array.isArray(oh.weekday_text) && dayIdx != null && dayIdx >= 0 && dayIdx <= 6) {
      const ko = ['일', '월', '화', '수', '목', '금', '토'][dayIdx];
      today = oh.weekday_text.find(s => s.indexOf(ko + '요일') === 0) || null;
    }
    return { openNow: (typeof oh.open_now === 'boolean') ? oh.open_now : null, todayHours: today };
  } catch (_) { return null; }
}

// 카테고리 → 네이버 검색 키워드(여러 개로 모아 TOP10까지 확보)
const CAT_KW = {
  '맛집': ['맛집', '맛집 추천'], '한식': ['한식', '한식 맛집'], '중식': ['중식', '중국집'],
  '일식': ['일식', '이자카야'], '양식': ['양식', '파스타'], '술집': ['술집', '포차'],
  '카페': ['카페', '감성 카페'], '디저트': ['디저트 카페', '베이커리'], '브런치': ['브런치', '브런치 카페'],
  '데이트명소': ['가볼만한곳', '데이트'], '데이트 명소': ['가볼만한곳', '데이트'],
  '식사': ['맛집'], '점심': ['맛집'], '저녁': ['맛집'], '활동': ['가볼만한곳'], '놀거리': ['가볼만한곳'], '야경': ['야경 명소'],
};

// ── /spots — 그 동네 실제 인기 가게 TOP(최대 10, 카테고리·영업시간) ──
async function handleSpots(url, env) {
  const area = (url.searchParams.get('area') || '').trim();
  const cat = (url.searchParams.get('cat') || '카페').trim();
  const want = Math.min(Math.max(parseInt(url.searchParams.get('n') || '10', 10) || 10, 1), 10);
  const wantHours = url.searchParams.get('hours') === '1';
  const dayRaw = url.searchParams.get('day');
  const dayIdx = (dayRaw != null && dayRaw !== '') ? parseInt(dayRaw, 10) : null;
  if (!area) throw new Error('area 파라미터 필요');

  const kws = CAT_KW[cat] || [cat];
  // 여러 키워드 결과를 합쳐 상호 기준 dedupe → TOP10 확보
  const items = []; const seen = new Set();
  for (const kw of kws) {
    if (items.length >= want) break;
    let part = [];
    try { part = await naverLocal(env, `${area} ${kw}`, 5); }
    catch (e) { if (!items.length && kw === kws[0]) throw e; }
    for (const it of part) { if (it.name && !seen.has(it.name)) { seen.add(it.name); items.push(it); } }
  }
  const top = items.slice(0, want);
  // 블로그수 + 구글(별점·영업시간) 병렬 보강
  await Promise.all(top.map(async it => {
    const gq = `${it.name} ${area}`;
    const [blog, g] = await Promise.all([naverBlogTotal(env, it.name), googlePlace(env, gq, wantHours, dayIdx)]);
    it.blogTotal = blog;
    if (g) { it.googleRating = g.rating; it.googleReviews = g.reviews; it.openNow = g.openNow; it.todayHours = g.todayHours; }
  }));
  top.sort((a, b) => (b.blogTotal || 0) - (a.blogTotal || 0)); // 블로그 후기 많은 순
  return { area, cat, count: top.length, items: top };
}

// ── /geocode — 코스 스팟 이름들을 좌표로 (지도 핀용) ──
// names=이름1|이름2|...  (네이버 mapx/mapy ÷ 1e7 = 경도/위도)
async function handleGeocode(url, env) {
  const area = (url.searchParams.get('area') || '').trim();
  const names = (url.searchParams.get('names') || '').split('|').map(s => s.trim()).filter(Boolean).slice(0, 10);
  if (!names.length) throw new Error('names 파라미터 필요');
  const points = await Promise.all(names.map(async nm => {
    // 2단계: ①전체 이름 → ②핵심 단어(활동/풍경 접미사 제거한 대표 명소명)
    const tries = [(area && !nm.includes(area)) ? `${area} ${nm}` : nm];
    const core = nm.split(/[·,]/)[0].replace(/(산책|피크닉|야경|투어|체험|관람|나들이|코스|먹거리|거리)/g, ' ').trim().split(/\s+/)[0];
    if (core && core.length >= 2 && core !== nm) { if (area) tries.push(`${area} ${core}`); tries.push(core); }
    for (const q of tries) {
      try {
        const items = await naverLocal(env, q, 1);
        const it = items[0];
        if (it && it.mapx && it.mapy) return { name: nm, realName: it.name, lat: Number(it.mapy) / 1e7, lng: Number(it.mapx) / 1e7 };
      } catch (_) { }
    }
    return { name: nm, lat: null, lng: null };
  }));
  return { area, points };
}

// ── /exhibitions — 그 지역 현재 축제·전시 (공식 TourAPI 우선 → 네이버 폴백) ──
// region: 서울 / 경기·인천 / 강원 / 충청 / 전라 / 경상 / 제주  (TOURAPI_KEY 필요)
const AREA_CODE = { '서울': 1, '경기·인천': 31, '강원': 32, '충청': 34, '전라': 38, '경상': 36, '제주': 39 };
async function handleExhibitions(url, env) {
  const area = (url.searchParams.get('area') || '').trim();
  const region = (url.searchParams.get('region') || '').trim();
  const n = Math.min(Math.max(parseInt(url.searchParams.get('n') || '6', 10) || 6, 1), 10);
  if (!area && !region) throw new Error('area 파라미터 필요');
  // ① 공식 TourAPI — 기간 검증된 축제·전시(행사)
  if (env.TOURAPI_KEY && region && AREA_CODE[region]) {
    try { const ev = await tourapiEvents(env, region, n); if (ev.length) return { area, region, source: 'tourapi', count: ev.length, items: ev }; } catch (_) { }
  }
  // ② 폴백 — 네이버 검색
  const items = await naverExhibitionSearch(env, area || region, n);
  return { area, region, source: 'naver', count: items.length, items };
}
// 한국관광공사 TourAPI — 기간 검증된 축제/공연/전시(행사) by 지역·오늘
async function tourapiEvents(env, region, n) {
  const areaCode = AREA_CODE[region] || 1;
  const t = new Date();
  const ymd = `${t.getFullYear()}${String(t.getMonth() + 1).padStart(2, '0')}${String(t.getDate()).padStart(2, '0')}`;
  const u = `https://apis.data.go.kr/B551011/KorService1/searchFestival1?serviceKey=${env.TOURAPI_KEY}&MobileOS=ETC&MobileApp=TripMind&_type=json&listYN=Y&arrange=A&eventStartDate=${ymd}&areaCode=${areaCode}&numOfRows=40&pageNo=1`;
  const r = await fetch(u);
  if (!r.ok) return [];
  let d; try { d = await r.json(); } catch (_) { return []; }
  let items = d && d.response && d.response.body && d.response.body.items && d.response.body.items.item;
  if (!items) return [];
  if (!Array.isArray(items)) items = [items];
  const todayNum = Number(ymd);
  const mapped = items.map(it => ({
    title: stripTags(it.title || ''),
    place: stripTags(it.addr1 || ''),
    start: String(it.eventstartdate || ''), end: String(it.eventenddate || ''),
    image: it.firstimage || '',
    ongoing: (Number(it.eventstartdate) <= todayNum && Number(it.eventenddate) >= todayNum),
  })).filter(x => x.title);
  // 진행중 먼저, 그다음 시작일 빠른 순
  mapped.sort((a, b) => (Number(b.ongoing) - Number(a.ongoing)) || (Number(a.start) - Number(b.start)));
  return mapped.slice(0, n);
}
async function naverExhibitionSearch(env, area, n) {
  if (!env.NAVER_ID || !env.NAVER_SECRET) return [];
  // 블로그 검색: "{지역} 전시회" 최신순 → 실제 회자되는 전시·특별전
  const u = `https://openapi.naver.com/v1/search/blog.json?query=${encodeURIComponent(area + ' 전시회')}&display=${n}&sort=sim`;
  const r = await fetch(u, { headers: { 'X-Naver-Client-Id': env.NAVER_ID, 'X-Naver-Client-Secret': env.NAVER_SECRET } });
  if (!r.ok) return [];
  const d = await r.json();
  return (d.items || []).map(it => ({
    title: stripTags(it.title),
    desc: stripTags(it.description || '').slice(0, 90),
    link: it.link || '',
    date: it.postdate || '',
  })).filter(x => x.title);
}

// ── /enrich — 특정 가게에 실데이터 덧붙이기 ──
async function handleEnrich(url, env) {
  const name = (url.searchParams.get('name') || '').trim();
  const area = (url.searchParams.get('area') || '').trim();
  const wantHours = url.searchParams.get('hours') === '1';
  const dayRaw = url.searchParams.get('day');
  const dayIdx = (dayRaw != null && dayRaw !== '') ? parseInt(dayRaw, 10) : null;
  if (!name) throw new Error('name 파라미터 필요');
  const gq = `${name} ${area}`.trim();
  const [blog, g] = await Promise.all([naverBlogTotal(env, name), googlePlace(env, gq, wantHours, dayIdx)]);
  return { name, area, blogTotal: blog,
    googleRating: g ? g.rating : null, googleReviews: g ? g.reviews : null,
    openNow: g ? g.openNow : null, todayHours: g ? g.todayHours : null };
}
