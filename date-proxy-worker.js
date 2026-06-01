/**
 * ─────────────────────────────────────────────────────────────
 * TripMind — 데이트 추천 실데이터 프록시 (Cloudflare Worker)
 * ─────────────────────────────────────────────────────────────
 * GitHub Pages(정적 프론트)에서 직접 못 부르는 네이버/구글 API를
 * 서버에서 대신 호출해 주는 "프록시" Worker입니다. (CORS + 키 보호)
 *
 * ■ 배포 방법 (GitHub Actions·토큰 불필요)
 *   1) https://dash.cloudflare.com → Workers & Pages → Create → Worker
 *   2) 이 파일 내용을 통째로 붙여넣고 Deploy
 *   3) Settings → Variables and Secrets 에 아래 값을 "Secret"으로 추가
 *        NAVER_ID       = 네이버 개발자센터 Client ID
 *        NAVER_SECRET   = 네이버 개발자센터 Client Secret
 *        GOOGLE_KEY     = (선택) 구글 Places API 키 — ⭐별점 원할 때만
 *        ALLOW_ORIGIN   = (선택) https://hydrogen-king.github.io  (기본 *)
 *   4) 배포된 주소(예: https://tripmind-date.<계정>.workers.dev)를
 *      index.html 의  const DATE_API_URL = ''  에 넣으면 끝.
 *
 * ■ 키 발급
 *   · 네이버: https://developers.naver.com/apps  → 애플리케이션 등록
 *            → "검색" API 사용 추가 → Client ID/Secret 발급 (무료, 25,000회/일)
 *   · 구글(별점, 선택): Google Cloud Console → Places API 활성화 + 결제(빌링)
 *            ※ 구글 Places는 호출당 과금됩니다. 캐시(6h)로 비용 최소화함.
 *
 * ■ 데이터 정직 고지
 *   · 네이버/카카오 공개 API에는 "별점"이 없습니다.
 *     → 별점·리뷰수는 구글 Places(GOOGLE_KEY 설정 시)에서만 옵니다.
 *   · 네이버는 실제 상호·주소·지도링크 + 블로그 후기 개수(인기 지표)를 제공.
 *
 * ■ 엔드포인트
 *   GET /health
 *   GET /spots?area=홍대&cat=카페&n=5     ← 그 동네 실제 인기 가게 TOP
 *   GET /enrich?name=어니언 성수&area=성수  ← 특정 가게 블로그수/구글별점
 * ─────────────────────────────────────────────────────────────
 */

const CACHE_TTL = 21600; // 결과 캐시 6시간 (네이버/구글 호출량·비용 절감)

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

    // health 는 캐시하지 않음
    if (url.pathname === '/health') {
      return json({ ok: true,
        naver: !!(env.NAVER_ID && env.NAVER_SECRET),
        google: !!env.GOOGLE_KEY, ts: Date.now() }, 200, cors);
    }

    // 캐시 HIT
    const cache = caches.default;
    const hit = await cache.match(request);
    if (hit) { const r = new Response(hit.body, hit); r.headers.set('X-Cache', 'HIT'); return r; }

    try {
      let body;
      if (url.pathname === '/spots')       body = await handleSpots(url, env);
      else if (url.pathname === '/enrich') body = await handleEnrich(url, env);
      else return json({ error: 'not found', endpoints: ['/health', '/spots', '/enrich'] }, 404, cors);

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

// ── 네이버 지역검색 (실제 상호·주소, 블로그 리뷰 많은 순) ──
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

// ── 구글 Places (⭐별점·리뷰수, 선택) ──
async function googlePlace(env, query) {
  if (!env.GOOGLE_KEY) return null;
  try {
    const u = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(query)}&inputtype=textquery&language=ko&fields=rating,user_ratings_total,name,place_id&key=${env.GOOGLE_KEY}`;
    const r = await fetch(u);
    if (!r.ok) return null;
    const d = await r.json();
    const c = (d.candidates || [])[0];
    if (!c) return null;
    return { rating: c.rating ?? null, reviews: c.user_ratings_total ?? null, placeId: c.place_id || null };
  } catch (_) { return null; }
}

// 슬롯 카테고리 → 네이버 검색어 키워드
const CAT_QUERY = {
  '카페': '카페', '맛집': '맛집', '식사': '맛집', '점심': '맛집', '저녁': '맛집',
  '활동': '가볼만한곳', '놀거리': '가볼만한곳', '야경': '야경 명소',
};

// ── /spots — 그 동네 실제 인기 가게 TOP ──
async function handleSpots(url, env) {
  const area = (url.searchParams.get('area') || '').trim();
  const cat = (url.searchParams.get('cat') || '카페').trim();
  const n = parseInt(url.searchParams.get('n') || '5', 10);
  if (!area) throw new Error('area 파라미터 필요');
  const kw = CAT_QUERY[cat] || cat;
  const query = `${area} ${kw}`;
  const items = await naverLocal(env, query, n);
  // 가게별 블로그수 + 구글별점 병렬 보강
  await Promise.all(items.map(async it => {
    const gq = `${it.name} ${area}`;
    const [blog, g] = await Promise.all([naverBlogTotal(env, it.name), googlePlace(env, gq)]);
    it.blogTotal = blog;
    if (g) { it.googleRating = g.rating; it.googleReviews = g.reviews; it.placeId = g.placeId; }
  }));
  items.sort((a, b) => (b.blogTotal || 0) - (a.blogTotal || 0)); // 블로그 후기 많은 순
  return { area, cat, query, count: items.length, items };
}

// ── /enrich — 특정 큐레이션 스팟에 실데이터 덧붙이기 ──
async function handleEnrich(url, env) {
  const name = (url.searchParams.get('name') || '').trim();
  const area = (url.searchParams.get('area') || '').trim();
  if (!name) throw new Error('name 파라미터 필요');
  const gq = `${name} ${area}`.trim();
  const [blog, g] = await Promise.all([naverBlogTotal(env, name), googlePlace(env, gq)]);
  return { name, area, blogTotal: blog, googleRating: g ? g.rating : null, googleReviews: g ? g.reviews : null, placeId: g ? g.placeId : null };
}
