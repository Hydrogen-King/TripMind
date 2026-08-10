// TripMind Service Worker — v17 (stale-while-revalidate)
// ────────────────────────────────────────────────────────────
// 이전(v3.0) 문제: 캐시 이름을 /api/v 의 JSON 버전으로 정하려 했으나,
//   /api/v 가 두 호스트 모두 JSON을 주지 않음(GitHub Pages=404, Workers=HTML).
//   → fetchVersion()이 항상 실패 → 캐시명이 'tripmind-local'로 영구 고정.
//   거기에 에셋이 cache-first 라, 한 번 캐시된 _date_new.js 등 옛 파일이
//   영원히 유지됨 → 새 index.html + 옛 JS 불일치로 "버튼이 안 먹는" 증상.
//
// 개선: /api/v 의존을 제거하고
//   (1) 정적 버전 상수(SW_VERSION) → 배포 때 올리면 새 캐시로 즉시 교체
//   (2) stale-while-revalidate → 버전을 안 올려도 다음 로드에 자동 최신화
//   둘을 합쳐, 같은 캐시 세대에서 HTML+JS가 항상 한 쌍으로 일관되게 갱신됨.
// ────────────────────────────────────────────────────────────

const SW_VERSION   = 'v-202608102348';     // ← 의미 있는 배포마다 올리면 즉시 갱신
const CACHE_PREFIX = 'tripmind-';
const CACHE_NAME   = CACHE_PREFIX + SW_VERSION;
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/db_extra.js',
  '/db_extra2.js',
  '/db_extra3.js',
  '/db_extra4.js',
  '/db_extra5.js',
  '/db_extra6.js',
  '/db_extra7.js',
  '/db_extra8.js',
  '/db_extra9.js',
  '/hotel_data.js',
  '/_date_new.js',
  '/favicon.svg',
  '/apple-touch-icon.png',
];

// ── 설치: 새 버전 캐시에 에셋 사전 캐시 → 즉시 활성화 대기 ─────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache =>
        cache.addAll(STATIC_ASSETS).catch(err =>
          console.warn('[SW] 일부 에셋 캐시 실패 (정상)', err)
        )
      )
      .then(() => self.skipWaiting())
  );
});

// ── 활성화: 다른 버전(접두사 일치, 이름 불일치) 캐시 모두 삭제 ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys =>
        Promise.all(
          keys
            .filter(k => k.startsWith(CACHE_PREFIX) && k !== CACHE_NAME)
            .map(k => { console.log('[SW] 구버전 캐시 삭제:', k); return caches.delete(k); })
        )
      )
      .then(() => self.clients.claim())
  );
});

// ── Fetch: 동일출처 GET → stale-while-revalidate ──────────────
//   캐시가 있으면 즉시 반환(빠름) + 백그라운드로 네트워크 갱신(항상 최신).
//   캐시가 없으면 네트워크 대기. 오프라인이면 캐시로 폴백.
//   외부 요청(프록시 등) · /api/* · 비-GET 은 그대로 통과(캐시 안 함).
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;   // 외부(프록시·CDN 등)
  if (url.pathname.startsWith('/api/'))    return;    // 동적 API

  event.respondWith(
    caches.open(CACHE_NAME).then(cache =>
      cache.match(req).then(cached => {
        const network = fetch(req)
          .then(res => {
            if (res && res.ok) cache.put(req, res.clone());
            return res;
          })
          .catch(() => cached);          // 오프라인 → 캐시 폴백
        return cached || network;        // 캐시 우선 반환, 없으면 네트워크
      })
    )
  );
});
