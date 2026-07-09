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
 *
 * KV 키 구조:
 *   saves:{uid}  →  JSON 배열 (최대 20개)
 */

const MAX_SAVES   = 20;
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

      return json({ error: '알 수 없는 API 경로' }, 404);
    }

    // ── 나머지: Workers Assets에 위임 (정적 파일 서빙) ──────────
    return env.ASSETS.fetch(request);
  },
};
