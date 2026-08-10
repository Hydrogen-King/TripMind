/**
 * TripMind — Main Cloudflare Worker  v1.0
 * ─────────────────────────────────────────
 * 역할: API 라우팅 + Cloudflare KV 저장소 인터페이스
 *       그 외 모든 요청 → Workers Assets (정적 파일 서빙)
 *
 * API 엔드포인트:
 *   GET  /api/v            → 현재 앱 버전 (SW 캐시 이름 갱신용)
 *   GET  /api/saves?uid=…  → 저장된 일정 목록 조회
 *   POST /api/saves        → 일정 저장   body: { uid, item }
 *   DELETE /api/saves/:id?uid=… → 일정 삭제
 *   GET  /api/reminders?uid=…   → 예약 오픈 알림 목록
 *   POST /api/reminders    → 알림 등록  body: { uid, item:{id,spot,opensISO,url} }
 *   DELETE /api/reminders/:id?uid=… → 알림 삭제
 *   POST /api/notify-test  → DayPilot 푸시 테스트 (body: { uid, title, body })
 *
 * KV 키 구조:
 *   saves:{uid}      →  JSON 배열 (최대 20개)
 *   reminders:{uid}  →  JSON 배열 (예약 오픈 알림, 최대 50개)
 *
 * ⚠️ DayPilot 푸시 연동
 *   브라우저에 토큰을 두면 누구나 사용자 폰으로 푸시를 쏠 수 있으므로,
 *   토큰(DAYPILOT_TOKEN)은 이 워커의 시크릿으로만 두고 서버 간 호출로 중계한다.
 *   서버 간 호출이라 DayPilot쪽 CORS 화이트리스트도 건드릴 필요가 없다.
 *   등록:  npx wrangler secret put DAYPILOT_TOKEN
 */

const MAX_SAVES     = 20;
const MAX_REMINDERS = 50;
const DAYPILOT_ALERT = 'https://daypilot.kangjuno980126.workers.dev/api/agent/alert';

// DayPilot으로 푸시 중계 — 토큰 미설정이면 조용히 skip (기능 자체는 계속 동작)
async function pushToDayPilot(env, { title, body, tag }) {
  if (!env.DAYPILOT_TOKEN) return { ok: false, reason: 'no-token' };
  try {
    const r = await fetch(DAYPILOT_ALERT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.DAYPILOT_TOKEN}`,
      },
      body: JSON.stringify({ title, body, tag, archive: true }),
    });
    return { ok: r.ok, status: r.status };
  } catch (e) {
    return { ok: false, reason: String(e) };
  }
}
// API는 같은 오리진(정적 파일과 동일 워커)에서만 쓰므로 교차출처는 화이트리스트만 허용
const ALLOWED_ORIGINS = [
  'https://tripmind.kangjuno980126.workers.dev',
  'http://localhost:3000',   // 로컬 개발
];
function corsFor(request) {
  const origin = request.headers.get('Origin') || '';
  return {
    'Access-Control-Allow-Origin':  ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const CORS = corsFor(request);
    const json = (obj, status = 200) => new Response(JSON.stringify(obj), {
      status,
      headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS },
    });

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS });
    }

    // ── /api/* 라우팅 ──────────────────────────────────────────
    if (url.pathname.startsWith('/api/')) {

      // ① GET /api/v — 앱 버전 (SW 캐시 자동 무효화용)
      if (url.pathname === '/api/v' && request.method === 'GET') {
        const version = env.BUILD_VERSION || String(Date.now());
        return json({ version, ts: Date.now() });
      }

      // ② GET /api/saves?uid=… — 저장 목록 조회
      if (url.pathname === '/api/saves' && request.method === 'GET') {
        const uid = url.searchParams.get('uid');
        if (!uid || uid.length < 8) return json({ error: 'uid 필요' }, 400);

        const raw = await env.TRIPMIND_KV.get(`saves:${uid}`);
        const saves = raw ? JSON.parse(raw) : [];
        return json({ saves });
      }

      // ③ POST /api/saves — 일정 저장
      if (url.pathname === '/api/saves' && request.method === 'POST') {
        let body;
        try { body = await request.json(); } catch { return json({ error: '잘못된 JSON' }, 400); }

        const { uid, item } = body;
        if (!uid || uid.length < 8) return json({ error: 'uid 필요' }, 400);
        if (!item || !item.id)      return json({ error: 'item.id 필요' }, 400);

        const raw = await env.TRIPMIND_KV.get(`saves:${uid}`);
        const saves = raw ? JSON.parse(raw) : [];

        // 이미 같은 id가 있으면 교체, 없으면 맨 앞에 추가
        const idx = saves.findIndex(s => s.id === item.id);
        if (idx !== -1) saves[idx] = item;
        else saves.unshift(item);

        // 최대 개수 초과 시 가장 오래된 항목 제거
        const trimmed = saves.slice(0, MAX_SAVES);

        await env.TRIPMIND_KV.put(`saves:${uid}`, JSON.stringify(trimmed), {
          expirationTtl: 60 * 60 * 24 * 365,   // 1년 TTL
        });
        return json({ ok: true, count: trimmed.length });
      }

      // ④ DELETE /api/saves/:id?uid=… — 일정 삭제
      const delMatch = url.pathname.match(/^\/api\/saves\/([^/]+)$/);
      if (delMatch && request.method === 'DELETE') {
        const itemId  = delMatch[1];
        const uid     = url.searchParams.get('uid');
        if (!uid || uid.length < 8) return json({ error: 'uid 필요' }, 400);

        const raw = await env.TRIPMIND_KV.get(`saves:${uid}`);
        if (!raw) return json({ ok: true });
        const saves   = JSON.parse(raw);
        const updated = saves.filter(s => String(s.id) !== String(itemId));
        await env.TRIPMIND_KV.put(`saves:${uid}`, JSON.stringify(updated), {
          expirationTtl: 60 * 60 * 24 * 365,
        });
        return json({ ok: true, count: updated.length });
      }

      // ⑤ 예약 오픈 알림 — 조회
      if (url.pathname === '/api/reminders' && request.method === 'GET') {
        const uid = url.searchParams.get('uid');
        if (!uid || uid.length < 8) return json({ error: 'uid 필요' }, 400);
        const raw = await env.TRIPMIND_KV.get(`reminders:${uid}`);
        return json({ reminders: raw ? JSON.parse(raw) : [], push: !!env.DAYPILOT_TOKEN });
      }

      // ⑥ 예약 오픈 알림 — 등록 (오픈일 아침에 cron이 푸시)
      if (url.pathname === '/api/reminders' && request.method === 'POST') {
        let body;
        try { body = await request.json(); } catch { return json({ error: '잘못된 JSON' }, 400); }
        const { uid, item } = body;
        if (!uid || uid.length < 8)  return json({ error: 'uid 필요' }, 400);
        if (!item || !item.opensISO) return json({ error: 'item.opensISO 필요' }, 400);

        const raw  = await env.TRIPMIND_KV.get(`reminders:${uid}`);
        const list = raw ? JSON.parse(raw) : [];
        const id   = item.id || `${item.spot}|${item.opensISO}`;
        if (!list.some(r => r.id === id)) {
          list.push({ id, spot: item.spot || '', opensISO: item.opensISO, url: item.url || '', sent: false });
        }
        await env.TRIPMIND_KV.put(`reminders:${uid}`, JSON.stringify(list.slice(-MAX_REMINDERS)), {
          expirationTtl: 60 * 60 * 24 * 400,
        });
        return json({ ok: true, count: list.length, push: !!env.DAYPILOT_TOKEN });
      }

      // ⑦ 예약 오픈 알림 — 삭제
      const remDel = url.pathname.match(/^\/api\/reminders\/([^/]+)$/);
      if (remDel && request.method === 'DELETE') {
        const uid = url.searchParams.get('uid');
        if (!uid || uid.length < 8) return json({ error: 'uid 필요' }, 400);
        const raw = await env.TRIPMIND_KV.get(`reminders:${uid}`);
        if (!raw) return json({ ok: true });
        const updated = JSON.parse(raw).filter(r => r.id !== decodeURIComponent(remDel[1]));
        await env.TRIPMIND_KV.put(`reminders:${uid}`, JSON.stringify(updated), {
          expirationTtl: 60 * 60 * 24 * 400,
        });
        return json({ ok: true, count: updated.length });
      }

      // ⑧ 푸시 연결 테스트
      if (url.pathname === '/api/notify-test' && request.method === 'POST') {
        let body = {};
        try { body = await request.json(); } catch {}
        const r = await pushToDayPilot(env, {
          title: body.title || '✈️ TripMind 연결 테스트',
          body:  body.body  || 'DayPilot으로 알림이 잘 도착했어요.',
          tag:   'tripmind-test',
        });
        return json(r, r.ok ? 200 : 502);
      }

      return json({ error: '알 수 없는 API 경로' }, 404);
    }

    // ── 나머지: Workers Assets에 위임 (정적 파일 서빙) ──────────
    return env.ASSETS.fetch(request);
  },

  // ── 매일 아침 예약 오픈 알림 발송 (cron: KST 09:00 = UTC 00:00) ──
  // 오픈일이 오늘 이하이고 아직 안 보낸 항목을 DayPilot 푸시로 넘긴다.
  async scheduled(event, env, ctx) {
    ctx.waitUntil((async () => {
      if (!env.DAYPILOT_TOKEN) return;
      // KST 기준 오늘 날짜
      const kst = new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10);
      const list = await env.TRIPMIND_KV.list({ prefix: 'reminders:' });
      for (const key of list.keys) {
        const raw = await env.TRIPMIND_KV.get(key.name);
        if (!raw) continue;
        let items;
        try { items = JSON.parse(raw); } catch { continue; }
        let changed = false;
        for (const it of items) {
          if (it.sent || !it.opensISO || it.opensISO > kst) continue;
          const r = await pushToDayPilot(env, {
            title: `🎫 ${it.spot} 예약 오픈`,
            body: `오늘부터 예매할 수 있어요. 인기 명소는 며칠 만에 매진되니 지금 바로.\n${it.url || ''}`.trim(),
            tag: `tripmind-book-${it.id}`,
          });
          if (r.ok) { it.sent = true; changed = true; }
        }
        // 방문일이 한참 지난 항목 정리
        const kept = items.filter(it => !(it.sent && it.opensISO < kst));
        if (changed || kept.length !== items.length) {
          await env.TRIPMIND_KV.put(key.name, JSON.stringify(kept), {
            expirationTtl: 60 * 60 * 24 * 400,
          });
        }
      }
    })());
  },
};
