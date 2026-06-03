// TripMind Service Worker — v2.0
// 전략: Network First (HTML), Cache First (JS/SVG 에셋)
const CACHE_NAME = 'tripmind-v13';
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
];

// ── 설치: 핵심 에셋 사전 캐시 ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS).catch(err => {
        console.warn('[SW] 일부 에셋 캐시 실패 (정상)', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// ── 활성화: 이전 버전 캐시 삭제 ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// ── fetch: index.html → Network First, 나머지 → Cache First ──
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // 외부 API(날씨·환율·지도 타일)는 SW 통과 — 캐시 안함
  if (!url.origin.includes(self.location.origin)) return;

  const isHtml = url.pathname === '/' || url.pathname.endsWith('.html');

  if (isHtml) {
    // Network First: 항상 최신 index.html 시도
    event.respondWith(
      fetch(event.request)
        .then(res => {
          if (res && res.ok) { const clone = res.clone(); caches.open(CACHE_NAME).then(c => c.put(event.request, clone)); }
          return res;
        })
        .catch(() => caches.match(event.request))
    );
  } else {
    // Cache First: JS/SVG 에셋
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(res => {
          if (res && res.ok) { const clone = res.clone(); caches.open(CACHE_NAME).then(c => c.put(event.request, clone)); }
          return res;
        });
      })
    );
  }
});
