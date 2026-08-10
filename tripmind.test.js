/**
 * TripMind — 기능 전체 검증 테스트 스위트 (Node.js, no framework)
 * 실행: node tripmind.test.js
 *
 * 브라우저 DOM이 없으므로 순수 JS 로직만 단위 테스트.
 * DOM 의존 기능은 Static Analysis(구조 검사)로 대체.
 */

'use strict';
const fs = require('fs');
// CRLF 정규화 — Windows 체크아웃(autocrlf)에서도 '\n' 기반 매칭이 동작하도록
const html = fs.readFileSync('index.html', 'utf8').replace(/\r\n/g, '\n');

/* ──────────────────────────────────────────────
   테스트 러너 (경량 TAP-like)
   ────────────────────────────────────────────── */
let _pass = 0, _fail = 0, _total = 0;
const results = [];

function test(name, fn) {
  _total++;
  try {
    fn();
    _pass++;
    results.push({ status: 'PASS', name });
  } catch(e) {
    _fail++;
    results.push({ status: 'FAIL', name, err: e.message });
  }
}
function assert(cond, msg) {
  if (!cond) throw new Error(msg || 'assertion failed');
}
function assertContains(haystack, needle, label) {
  if (!haystack.includes(needle))
    throw new Error(`${label||''} — 기대: "${needle}" 포함, 없음`);
}
function assertNotContains(haystack, needle, label) {
  if (haystack.includes(needle))
    throw new Error(`${label||''} — 기대: "${needle}" 없어야 함, 존재함`);
}
function countOccurrences(str, sub) {
  return str.split(sub).length - 1;
}

/* ══════════════════════════════════════════════
   1. HTML HEAD / SEO
   ══════════════════════════════════════════════ */
test('[HEAD-01] og:url이 Cloudflare Workers 배포 URL', () => {
  assertContains(html, 'og:url" content="https://tripmind.kangjuno980126.workers.dev/"', 'og:url');
});
test('[HEAD-02] og:url에 netlify 없음', () => {
  assertNotContains(html, 'tripmind.netlify.app', 'netlify URL');
});
test('[HEAD-03] apple-mobile-web-app-capable 중복 없음 (1번만)', () => {
  const count = countOccurrences(html, 'apple-mobile-web-app-capable');
  assert(count === 1, `apple-mobile-web-app-capable ${count}번 선언 (1이어야 함)`);
});
test('[HEAD-04] apple-mobile-web-app-title 중복 없음 (1번만)', () => {
  const count = countOccurrences(html, 'apple-mobile-web-app-title');
  assert(count === 1, `apple-mobile-web-app-title ${count}번 선언`);
});
test('[HEAD-05] apple-mobile-web-app-status-bar-style 중복 없음 (1번만)', () => {
  const count = countOccurrences(html, 'apple-mobile-web-app-status-bar-style');
  assert(count === 1, `apple-mobile-web-app-status-bar-style ${count}번 선언`);
});
test('[HEAD-06] Google Analytics 플레이스홀더 주석 처리됨', () => {
  // 실제 gtag script 로드는 주석 안에만 있어야 함 → 주석 제거 후 검사
  const htmlNoComments = html.replace(/<!--[\s\S]*?-->/g, '');
  assertNotContains(htmlNoComments, '<script async src="https://www.googletagmanager.com/gtag/js', 'GA 활성 script');
});
test('[HEAD-07] gtag stub 존재 (gtag 호출 코드가 오류 없도록)', () => {
  assertContains(html, 'window.gtag=window.gtag||function(){}', 'gtag stub');
});

/* ══════════════════════════════════════════════
   2. 핵심 JS 함수 존재 확인
   ══════════════════════════════════════════════ */
test('[JS-01] go() 함수 존재', () => {
  assertContains(html, 'function go(id)', 'go()');
});
test('[JS-02] go() 에 try-catch 감싸짐', () => {
  assertContains(html, 'try{\n  const target=document.getElementById', 'go() try-catch');
});
test('[JS-03] go() 에 target 존재 확인 로직', () => {
  assertContains(html, "if(!target){console.error('[TripMind] go():", 'go() null check');
});
test('[JS-04] generate() 함수 존재', () => {
  assertContains(html, 'function generate(skipDomRead)', 'generate()');
});
test('[JS-05] _runGenerate() 함수 존재', () => {
  assertContains(html, 'function _runGenerate()', '_runGenerate()');
});
test('[JS-06] escHtml() XSS 방어 함수 존재', () => {
  assertContains(html, 'function escHtml(s)', 'escHtml()');
});
test('[JS-07] rerollSpot() 함수 존재', () => {
  assertContains(html, 'function rerollSpot(btn)', 'rerollSpot()');
});
test('[JS-08] saveResult() 함수 존재', () => {
  assertContains(html, 'function saveResult()', 'saveResult()');
});
test('[JS-09] exportItinerary() 함수 존재', () => {
  assertContains(html, 'async function exportItinerary(btn)', 'exportItinerary()');
});
test('[JS-10] shareItinerary() 함수 존재', () => {
  assertContains(html, 'function shareItinerary()', 'shareItinerary()');
});
test('[JS-11] showToast() 함수 존재', () => {
  assertContains(html, 'function showToast(', 'showToast()');
});
test('[JS-12] parseStyle() 함수 존재', () => {
  assertContains(html, 'function parseStyle(', 'parseStyle()');
});
test('[JS-13] calcNights() 함수 존재', () => {
  assertContains(html, 'function calcNights()', 'calcNights()');
});
test('[JS-14] enrichSpot() 함수 존재', () => {
  assertContains(html, 'function enrichSpot(', 'enrichSpot()');
});
test('[JS-15] _buildSpotWhy() 함수 존재', () => {
  assertContains(html, 'function _buildSpotWhy(', '_buildSpotWhy()');
});
test('[JS-16] destroyAllMaps() 존재 (Leaflet 메모리 누수 방지)', () => {
  assertContains(html, 'function destroyAllMaps()', 'destroyAllMaps()');
});
test('[JS-17] destroyAllMaps() _runGenerate에서 호출됨', () => {
  assertContains(html, 'destroyAllMaps(); // ③ 이전 지도', '_runGenerate calls destroyAllMaps');
});

/* ══════════════════════════════════════════════
   3. 날짜 유효성 검사
   ══════════════════════════════════════════════ */
test('[DATE-01] 출발일 오늘 이전 체크 존재', () => {
  assertContains(html, 'fromD<todayD', '출발일 과거 체크');
});
test('[DATE-02] 귀국일 < 출발일 체크 존재', () => {
  assertContains(html, 'fromD>=toD', '귀국일 순서 체크');
});
test('[DATE-03] 최대 60일 체크 존재', () => {
  assertContains(html, '_totalDays>60', '60일 초과 체크');
});
test('[DATE-04] calcNights에서 귀국일 자동 보정 로직', () => {
  assertContains(html, 'toEl.min=minToStr', '귀국일 min 자동 설정');
});

/* ══════════════════════════════════════════════
   4. 다중 도시 / 커스텀 일수
   ══════════════════════════════════════════════ */
test('[CITY-01] renderCityDaysRows() 함수 존재', () => {
  assertContains(html, 'function renderCityDaysRows()', 'renderCityDaysRows()');
});
test('[CITY-02] adjustCityDays() 함수 존재', () => {
  assertContains(html, 'function adjustCityDays(city, delta)', 'adjustCityDays()');
});
test('[CITY-03] updateCityDaysTotal() 합계 초과 경고 존재', () => {
  assertContains(html, 'sum>totalDays', '합계 초과 경고');
});
test('[CITY-04] updateCityDaysTotal() 합계 일치 확인 로직 존재', () => {
  assertContains(html, 'sum===totalDays', '합계 일치 확인');
});
test('[CITY-05] customDays 기반 일정 분배 로직', () => {
  assertContains(html, '_hasCustom?(ST.customDays[key]||1)', 'customDays 분배');
});

/* ══════════════════════════════════════════════
   5. API 통합 (Google Maps)
   ══════════════════════════════════════════════ */
test('[API-01] GMAPS_KEY 설정됨', () => {
  assertContains(html, "const GMAPS_KEY='AIzaSyDPbxTdr4o1YNxeE-r99Qn1MzEIaD3I_8U'", 'GMAPS_KEY');
});
test('[API-02] Routes API 엔드포인트 존재', () => {
  assertContains(html, 'routes.googleapis.com/directions/v2:computeRoutes', 'Routes API');
});
test('[API-03] Places API 엔드포인트 존재', () => {
  assertContains(html, 'places.googleapis.com/v1/places:searchText', 'Places API');
});
test('[API-04] Routes API 호출 간 throttle 존재 (180ms)', () => {
  assertContains(html, 'const _routeDelay=()=>new Promise(r=>setTimeout(r,180))', 'Routes throttle');
});
test('[API-05] Places API 호출 간 throttle 존재 (120ms)', () => {
  assertContains(html, "await new Promise(r=>setTimeout(r,120)); // 120ms throttle", 'Places throttle');
});
test('[API-06] _placesCache 크기 제한 존재 (150)', () => {
  assertContains(html, 'const _PLACES_CACHE_MAX=150', '_placesCache 크기 제한');
});
test('[API-07] _placesCache LRU 삭제 로직', () => {
  assertContains(html, '_placesCache.delete(_placesCache.keys().next().value)', 'LRU 삭제');
});
test('[API-08] Places API 로딩 스켈레톤', () => {
  assertContains(html, 'letter-spacing:2px;">···</span>', 'loading skeleton');
});
test('[API-09] Places API 결과 없을 때 스켈레톤 제거', () => {
  assertContains(html, "if(!place){infoEl.innerHTML='';return;}", '스켈레톤 제거');
});
test('[API-10] TRANSIT 실패 시 DRIVE 재시도 로직', () => {
  assertContains(html, "if(travelMode==='TRANSIT')", 'TRANSIT fallback');
});

/* ══════════════════════════════════════════════
   6. UX 기능
   ══════════════════════════════════════════════ */
test('[UX-01] 맨 위로 버튼 HTML 존재', () => {
  assertContains(html, 'id="back-to-top"', '맨 위로 버튼');
});
test('[UX-02] 맨 위로 버튼 scroll 감지 로직', () => {
  assertContains(html, "window.scrollY>300 && onResult", 'scroll 감지');
});
test('[UX-03] 이미지 저장 버튼 존재', () => {
  assertContains(html, 'function dlSpotImg(btn)', 'dlSpotImg()');
});
test('[UX-04] 이미지 저장 — iOS fallback(새탭) 존재', () => {
  assertContains(html, "window.open(url,'_blank','noopener')", 'iOS 이미지 fallback');
});
test('[UX-05] 스팟 교체 버튼 존재', () => {
  assertContains(html, 'onclick="rerollSpot(this)"', '교체 버튼');
});
test('[UX-06] 일정 공유 버튼 존재', () => {
  assertContains(html, 'onclick="shareItinerary()"', '공유 버튼');
});
test('[UX-07] 일정 이미지 저장 버튼 존재', () => {
  assertContains(html, 'onclick="exportItinerary(this)"', '이미지 저장 버튼');
});
test('[UX-08] 일정 저장 버튼 존재', () => {
  assertContains(html, 'onclick="saveResult()"', '저장 버튼');
});
test('[UX-09] 이전 여행 복원 배너 존재', () => {
  assertContains(html, 'id="restore-banner"', '복원 배너');
});
test('[UX-10] 앱 설치 안내 버튼 존재', () => {
  assertContains(html, 'openInstallModal()', '설치 버튼');
});

/* ══════════════════════════════════════════════
   7. 접근성
   ══════════════════════════════════════════════ */
test('[A11Y-01] 키보드 Enter/Space 핸들러 존재', () => {
  assertContains(html, "e.key==='Enter'||e.key===' '", '키보드 핸들러');
});
test('[A11Y-02] home-card 키보드 지원', () => {
  assertContains(html, "t.classList.contains('home-card')", 'home-card 키보드');
});
test('[A11Y-03] role=button 키보드 지원', () => {
  assertContains(html, "t.getAttribute('role')==='button'", 'role=button 키보드');
});
test('[A11Y-04] 결과 화면 aria-label 존재', () => {
  assertContains(html, 'aria-label="여행 요약"', '결과 aria-label');
});
test('[A11Y-05] 스팟 블록 aria-label 존재', () => {
  assertContains(html, 'role="article" aria-label', '스팟 aria-label');
});

/* ══════════════════════════════════════════════
   8. 다크모드 / 반응형
   ══════════════════════════════════════════════ */
test('[CSS-01] 다크모드 CSS 존재', () => {
  assertContains(html, '@media(prefers-color-scheme:dark)', 'dark mode CSS');
});
test('[CSS-02] 다크모드 --bg 변수 재정의', () => {
  assertContains(html, '--bg:#0F1117', 'dark --bg');
});
test('[CSS-03] 모바일 itinerary-scroll 우측 패딩', () => {
  assertContains(html, '.itinerary-scroll{padding-right:18px;}', '스크롤 패딩');
});
test('[CSS-04] 데스크탑 미디어쿼리 860px 존재', () => {
  assertContains(html, '@media(min-width:860px)', '860px 미디어쿼리');
});
test('[CSS-05] 데스크탑 미디어쿼리 1200px 존재', () => {
  assertContains(html, '@media(min-width:1200px)', '1200px 미디어쿼리');
});
test('[CSS-06] 맨 위로 버튼 CSS visible 클래스', () => {
  assertContains(html, '#back-to-top.visible', '맨 위로 visible CSS');
});
test('[CSS-07] 홈화면 데스크탑 중앙 정렬 CSS', () => {
  assertContains(html, '#s-home{display:flex !important;flex-direction:column !important;align-items:center !important', '홈 중앙 정렬');
});

/* ══════════════════════════════════════════════
   9. 데이터 무결성
   ══════════════════════════════════════════════ */
test('[DATA-01] 볼자노 DB 존재', () => {
  assertContains(html, "볼자노:{kr:'볼자노'", '볼자노 DB');
});
test('[DATA-02] 돌로미티 DB 존재', () => {
  assertContains(html, "돌로미티:{kr:'돌로미티'", '돌로미티 DB');
});
test('[DATA-03] 볼자노 GEO 존재', () => {
  assertContains(html, '볼자노:[46.498,11.355]', '볼자노 GEO');
});
test('[DATA-04] 돌로미티 GEO 존재', () => {
  assertContains(html, '돌로미티:[46.494,11.920]', '돌로미티 GEO');
});
test('[DATA-05] 볼자노 CITY_IMG 존재', () => {
  assertContains(html, "볼자노:'https://images.unsplash.com", 'CITY_IMG 볼자노');
});
test('[DATA-06] 돌로미티 CITY_IMG 존재', () => {
  assertContains(html, "돌로미티:'https://images.unsplash.com", 'CITY_IMG 돌로미티');
});
test('[DATA-07] _transitCities 확장됨 (빈 포함)', () => {
  assertContains(html, "'빈','프라하'", '_transitCities 확장');
});
test('[DATA-08] _transitCities 확장됨 (시드니 포함)', () => {
  assertContains(html, "'시드니'", '_transitCities 시드니');
});
test('[DATA-09] _COMPANION_REASON 정의됨', () => {
  assertContains(html, 'const _COMPANION_REASON={', '_COMPANION_REASON');
});
test('[DATA-10] CITY_FOOD_RECS 정의됨', () => {
  assertContains(html, 'const CITY_FOOD_RECS', 'CITY_FOOD_RECS');
});
test('[DATA-11] HIER (대륙-국가-도시 계층) 정의됨', () => {
  assertContains(html, 'const HIER={', 'HIER');
});
test('[DATA-12] DB 객체 정의됨', () => {
  assertContains(html, 'const DB = {', 'DB');
});
test('[DATA-13] 빈 CITY_IMG 존재', () => {
  assertContains(html, "빈:'https://images.unsplash.com", 'CITY_IMG 빈');
});
test('[DATA-14] 서울 CITY_IMG 존재', () => {
  assertContains(html, "서울:'https://images.unsplash.com", 'CITY_IMG 서울');
});
test('[DATA-15] GEO 나폴리 존재', () => {
  assertContains(html, '나폴리:[40.851,14.268]', 'GEO 나폴리');
});

/* ══════════════════════════════════════════════
   10. 에러 핸들링 / 안정성
   ══════════════════════════════════════════════ */
test('[ERR-01] 전역 window.onerror 핸들러 존재', () => {
  assertContains(html, 'window.onerror=function(msg,src,line', 'window.onerror');
});
test('[ERR-02] unhandledrejection 핸들러 존재', () => {
  assertContains(html, "addEventListener('unhandledrejection'", 'unhandledrejection');
});
test('[ERR-03] go() 오류 시 홈 복구 로직', () => {
  assertContains(html, "}catch(e){console.error('[TripMind] go() error:'", 'go() catch');
});
test('[ERR-04] saveResult() try-catch 존재', () => {
  assertContains(html, 'function saveResult(){\n  try{', 'saveResult try-catch');
});
test('[ERR-05] saveToStorage() try-catch 존재', () => {
  assertContains(html, "} catch(e){console.warn('[TripMind] localStorage 저장 실패'", 'saveToStorage try-catch');
});
test('[ERR-06] _runGenerate() try-catch 존재', () => {
  assertContains(html, "try { _runGenerate(); }", '_runGenerate try-catch');
});
test('[ERR-07] DB 로드 실패 배너 존재', () => {
  assertContains(html, 'let _dbLoadErr=0;', 'dbLoadErr 카운터');
});
test('[ERR-08] DB 로드 실패 시 사용자에게 배너 표시', () => {
  assertContains(html, 'if(_dbLoadErr>0)', 'dbLoadErr 배너');
});

/* ══════════════════════════════════════════════
   11. PWA / 서비스워커
   ══════════════════════════════════════════════ */
test('[PWA-01] Service Worker 등록 코드 존재', () => {
  assertContains(html, "navigator.serviceWorker.register('/sw.js')", 'SW 등록');
});
test('[PWA-02] theme-color 메타태그 존재', () => {
  assertContains(html, 'name="theme-color" content="#E8580A"', 'theme-color');
});
test('[PWA-03] apple-touch-icon 존재', () => {
  assertContains(html, 'rel="apple-touch-icon"', 'apple-touch-icon');
});

/* ══════════════════════════════════════════════
   12. 네비게이션 / 화면 전환
   ══════════════════════════════════════════════ */
test('[NAV-01] s-home 화면 존재', () => {
  assertContains(html, 'id="s-home"', 's-home');
});
test('[NAV-02] s-input 화면 존재', () => {
  assertContains(html, 'id="s-input"', 's-input');
});
test('[NAV-03] s-result 화면 존재', () => {
  assertContains(html, 'id="s-result"', 's-result');
});
test('[NAV-04] s-recommend 화면 존재', () => {
  assertContains(html, 'id="s-recommend"', 's-recommend');
});
test('[NAV-05] goBack() 함수 존재', () => {
  assertContains(html, 'function goBack()', 'goBack()');
});
test('[NAV-06] 홈으로 버튼 존재 (결과 화면)', () => {
  assertContains(html, "onclick=\"go('home')\"", '홈으로 버튼');
});
test('[NAV-07] go() 초기화 .on 클래스 제거', () => {
  assertContains(html, "s.classList.remove('on')", 'screen 초기화');
});

/* ══════════════════════════════════════════════
   13. 여행 추천 기능
   ══════════════════════════════════════════════ */
test('[REC-01] 여행지 추천 화면 존재', () => {
  assertContains(html, 'id="s-recommend"', '추천 화면');
});
test('[REC-02] _buildSpotWhy 카테고리 메타 맵 존재', () => {
  assertContains(html, '_CAT_META={', '_CAT_META');
});
test('[REC-03] 추천 이유 chip - companion 존재', () => {
  assertContains(html, '"spot-why-chip companion"', 'companion chip');
});
test('[REC-04] 추천 이유 chip - interest 존재', () => {
  assertContains(html, '"spot-why-chip interest"', 'interest chip');
});
test('[REC-05] 출처 배지 (TripMind 큐레이션) 존재', () => {
  assertContains(html, 'TripMind 큐레이션', '출처 배지');
});
test('[REC-06] 위키백과 링크 존재', () => {
  assertContains(html, 'ko.wikipedia.org', '위키 링크');
});
test('[REC-07] 유튜브 링크 존재', () => {
  assertContains(html, 'youtube.com/results', '유튜브 링크');
});
test('[REC-08] 네이버 블로그 링크 존재', () => {
  assertContains(html, 'search.naver.com', '네이버 링크');
});

/* ══════════════════════════════════════════════
   14. 비용 계산
   ══════════════════════════════════════════════ */
test('[COST-01] calcCost() 함수 존재', () => {
  assertContains(html, 'function calcCost(', 'calcCost()');
});
test('[COST-02] buildLinks() 함수 존재', () => {
  assertContains(html, 'function buildLinks(', 'buildLinks()');
});
test('[COST-03] Booking.com 예약 링크 존재', () => {
  assertContains(html, 'booking.com/searchresults', 'booking 링크');
});
test('[COST-04] Agoda 예약 링크 존재', () => {
  assertContains(html, 'agoda.com', 'agoda 링크');
});
test('[COST-05] Skyscanner 항공 링크 존재', () => {
  assertContains(html, 'skyscanner.co.kr', 'skyscanner 링크');
});
test('[COST-06] Klook 액티비티 링크 존재', () => {
  assertContains(html, 'klook.com', 'klook 링크');
});

/* ══════════════════════════════════════════════
   15. 날씨 / 환율 위젯
   ══════════════════════════════════════════════ */
test('[WIDGET-01] 날씨 위젯 placeholder 존재', () => {
  assertContains(html, 'id="weather-widget"', '날씨 위젯');
});
test('[WIDGET-02] 환율 위젯 placeholder 존재', () => {
  assertContains(html, 'id="rate-widget"', '환율 위젯');
});
test('[WIDGET-03] 축제 위젯 placeholder 존재', () => {
  assertContains(html, 'id="festival-widget"', '축제 위젯');
});
test('[WIDGET-04] CITY_FESTIVALS 데이터 존재', () => {
  assertContains(html, 'const CITY_FESTIVALS', 'CITY_FESTIVALS');
});

/* ══════════════════════════════════════════════
   16. 지도
   ══════════════════════════════════════════════ */
test('[MAP-01] Leaflet CSS 로드', () => {
  assertContains(html, 'unpkg.com/leaflet@1.9.4/dist/leaflet.css', 'Leaflet CSS');
});
test('[MAP-02] Leaflet JS 로드', () => {
  assertContains(html, 'unpkg.com/leaflet@1.9.4/dist/leaflet.js', 'Leaflet JS');
});
test('[MAP-03] 전체 여행 경로 지도 섹션 존재', () => {
  assertContains(html, '전체 여행 경로 지도', '여행 경로 지도');
});
test('[MAP-04] GEO 도쿄 좌표 정확', () => {
  assertContains(html, '도쿄:[35.676,139.650]', 'GEO 도쿄');
});
test('[MAP-05] GEO 파리 좌표 정확', () => {
  assertContains(html, '파리:[48.857,2.352]', 'GEO 파리');
});

/* ══════════════════════════════════════════════
   17. 숙소 추천 / 이동 정보
   ══════════════════════════════════════════════ */
test('[ACCOM-01] ACCOM_ZONES 정의됨', () => {
  assertContains(html, 'const ACCOM_ZONES', 'ACCOM_ZONES');
});
test('[ACCOM-02] 볼자노 숙소 구역 존재', () => {
  assertContains(html, "'볼자노':{번화가:", '볼자노 숙소구역');
});
test('[ACCOM-03] 숙소→첫 관광지 이동 정보 (hotel-to-first)', () => {
  assertContains(html, 'class="hotel-to-first"', 'hotel-to-first');
});
test('[ACCOM-04] 스팟 간 이동 화살표 (transit-connector)', () => {
  assertContains(html, 'class="transit-connector"', 'transit-connector');
});
test('[ACCOM-05] _gmapsDuration() 함수 존재', () => {
  assertContains(html, 'async function _gmapsDuration(', '_gmapsDuration()');
});

/* ══════════════════════════════════════════════
   18. Day 헤더 날짜 표시
   ══════════════════════════════════════════════ */
test('[DAY-01] 실제 날짜 계산 로직 (ST.from 기반)', () => {
  assertContains(html, 'toLocaleDateString(\'ko-KR\',{month:\'long\',day:\'numeric\',weekday:\'short\'})', '날짜 포맷');
});
test('[DAY-02] Day N + 날짜 헤더 표시 로직', () => {
  assertContains(html, 'Day ${dn}${_suffix', 'Day 헤더');
});

/* ══════════════════════════════════════════════
   19. 저장/불러오기
   ══════════════════════════════════════════════ */
test('[SAVE-01] localStorage 키 정의됨', () => {
  assertContains(html, "'tm_saved_results_v1'", '_SAVE_KEY');
});
test('[SAVE-02] 최대 저장 개수 정의됨 (KV 확장 후 20개)', () => {
  assertContains(html, 'const _MAX_SAVES = 20', '_MAX_SAVES');
});
test('[SAVE-03] 저장된 일정 섹션 존재', () => {
  assertContains(html, 'id="saved-section"', 'saved-section');
});
test('[SAVE-04] restoreTrip() 함수 존재', () => {
  assertContains(html, 'function restoreTrip()', 'restoreTrip()');
});
test('[SAVE-05] 7일 초과 세션 무효화', () => {
  assertContains(html, '7*24*60*60*1000', '7일 만료');
});

/* ══════════════════════════════════════════════
   20. 숙소 결정 도우미 (실측 비교·체크인 충돌·평점·티켓 시간)
   ══════════════════════════════════════════════ */
test('[ACMP-01] _renderAccomCompareCard() 함수 존재', () => {
  assertContains(html, 'function _renderAccomCompareCard(', '_renderAccomCompareCard()');
});
test('[ACMP-02] 초 단위 실측 함수 _gmapsRouteSecs() 존재', () => {
  assertContains(html, 'async function _gmapsRouteSecs(', '_gmapsRouteSecs()');
});
test('[ACMP-03] _gmapsDuration()은 _gmapsRouteSecs 래퍼로 유지 (기존 호출부 호환)', () => {
  assertContains(html, 'const r=await _gmapsRouteSecs(origin,destination,mode);', '_gmapsDuration 래퍼');
});
test('[ACMP-04] Routes 경유지가 placeId를 지원 (이름 지오코딩 오인식 방지)', () => {
  assertContains(html, "if(s.startsWith('place:')) return {placeId:s.slice(6)};", '_routeWaypoint placeId');
});
test('[ACMP-04b] Routes 경유지가 좌표(geo:)도 지원', () => {
  assertContains(html, "if(s.startsWith('geo:')){", '_routeWaypoint geo');
  assertContains(html, 'return {location:{latLng:{latitude:lat,longitude:lng}}};', 'latLng 변환');
});
test('[ACMP-05] Places 검색에 도시 locationBias 적용', () => {
  assertContains(html, 'body.locationBias={circle:{center:{latitude:center[0],longitude:center[1]},radius:30000}}', 'locationBias');
});
test('[ACMP-06] 도시에서 60km 넘는 결과는 무효화 (동명 브랜드 타국 지점)', () => {
  assertContains(html, '_haversineKm(center,[lat,lng])>60', '60km 가드');
});
test('[ACMP-07] 실측 비교 실행 함수 존재', () => {
  assertContains(html, 'async function runAcCompare(', 'runAcCompare()');
});
test('[ACMP-08] 비교표 호출 간 throttle 존재 (180ms)', () => {
  assertContains(html, 'const _routeDelay=()=>new Promise(r=>setTimeout(r,180)); // API quota 보호용 딜레이',
    '비교표 throttle');
});
test('[ACMP-09] 도보 3시간 초과는 도보권 밖으로 표기', () => {
  assertContains(html, "const far=(mode==='walking'&&r.secs>3*3600);", '도보권 밖 판정');
});
test('[ACMP-10] 교통 허브 DB(CITY_HUBS) 정의됨', () => {
  assertContains(html, 'const CITY_HUBS={', 'CITY_HUBS');
  assertContains(html, "'로마':'Roma Termini Station'", '로마 허브');
});
test('[CHAIN-01] 브랜드 혼동 감지 함수 존재', () => {
  assertContains(html, 'function _chainConfusion(names)', '_chainConfusion()');
});
test('[CHAIN-02] 같은 브랜드 2곳 이상일 때만 경고', () => {
  assertContains(html, 'new Set(v).size>=2', '브랜드 중복 조건');
});
test('[CHAIN-03] 호텔 예시 목록에 경고 연결됨', () => {
  assertContains(html, '_chainWarnHtml(hotels.map(ht=>ht.name))', '호텔 블록 경고');
});
test('[CIN-01] 체크인 충돌 카드 렌더 함수 존재', () => {
  assertContains(html, 'function _renderCheckinCard()', '_renderCheckinCard()');
});
test('[CIN-02] 충돌 평가 함수 존재', () => {
  assertContains(html, 'function evalCheckinConflicts(el)', 'evalCheckinConflicts()');
});
test('[CIN-03] 일정 렌더 중 날짜별 시간대 수집', () => {
  assertContains(html, '_TRIP_DAYS.push({d:dn,date:_dateStr,city:cityName,', '_TRIP_DAYS 수집');
});
test('[CIN-04] 생성 시마다 수집 버퍼 초기화', () => {
  assertContains(html, '_TRIP_DAYS.length=0;', '_TRIP_DAYS 초기화');
});
test('[CIN-05] 결과 렌더 후 체크인 카드 채움', () => {
  assertContains(html, '_renderCheckinCard();', '_renderCheckinCard 호출');
});
test('[CIN-06] 시간대별 시작·종료 기준 테이블 존재', () => {
  assertContains(html, 'const _CI_PERIOD_START=', '_CI_PERIOD_START');
  assertContains(html, 'const _CI_PERIOD_END', '_CI_PERIOD_END');
});
test('[TZ-01] 목적지 시간대 판별 함수 존재', () => {
  assertContains(html, 'function _destTz(dObj)', '_destTz()');
});
test('[TZ-02] 국가→시간대 매핑 정의됨', () => {
  assertContains(html, 'const COUNTRY_TZ={', 'COUNTRY_TZ');
  assertContains(html, "'이탈리아':'Europe/Rome'", '이탈리아 시간대');
});
test('[TZ-03] 다중 시간대 국가 목록 존재', () => {
  assertContains(html, "const TZ_MULTI=new Set(['미국','캐나다','러시아','브라질','호주'", 'TZ_MULTI');
});
test('[TZ-04] 현지 시각 → 절대 시각 변환 함수 존재', () => {
  assertContains(html, 'function _localInstant(dateStr,minutes,tz)', '_localInstant()');
});
test('[NIGHT-01] 심야 도착 판단 함수 존재', () => {
  assertContains(html, 'async function runNightArrival(', 'runNightArrival()');
});
test('[NIGHT-02] 심야 여부를 먼저 가르고 분리 판단 (낮 도착 오판 방지)', () => {
  assertContains(html, 'const lateNight=depOfDay>=22*60||depOfDay<5*60;', '심야 게이트');
  assertContains(html, 'const split=lateNight&&(veryLate||!transitTxt||refSecs>=40*60);', '분리 판단');
});
test('[NIGHT-03] 자정 넘김 처리 (분 단위 모듈러)', () => {
  assertContains(html, 'const depOfDay=depMin%1440;', '자정 넘김');
});
test('[TICKET-01] 예약 시간 충돌 검사 함수 존재', () => {
  assertContains(html, 'function evalTicketSlots(el)', 'evalTicketSlots()');
});
test('[TICKET-02] 겹침 판정 로직 존재', () => {
  assertContains(html, 'if(c.s<p.e){', '겹침 판정');
});
test('[TICKET-03] 30분 미만 간격 경고', () => {
  assertContains(html, 'else if(c.s-p.e<30){', '간격 부족 경고');
});
test('[RATE-01] 평점 리터러시 카드 존재', () => {
  assertContains(html, '⭐ 숙소 평점 읽는 법', '평점 카드');
});
test('[RATE-02] 플랫폼별 기준선 문구 존재', () => {
  assertContains(html, '에어비앤비 4.5는 사실 낮은 편', '에어비앤비 기준');
  assertContains(html, '부킹닷컴 9점대는 확실히 우수', '부킹닷컴 기준');
});
test('[RATE-03] 리뷰 개수·최신성 안내 존재', () => {
  assertContains(html, '점수보다 리뷰 개수·최신성', '리뷰 리터러시');
});
test('[CHK-01] 심야 이동 체크리스트 항목 추가됨', () => {
  assertContains(html, '자정 이후 이동은 택시승강장이 최종 안전판', '심야 이동 체크리스트');
});
test('[JOSA-01] 한글 조사 자동 선택 함수 존재', () => {
  assertContains(html, "function _josa(word,pair)", '_josa()');
});

/* ══════════════════════════════════════════════
   21. 회사 제휴 프로모션 반영 숙소
   ══════════════════════════════════════════════ */
test('[CORP-01] 프로모션 실데이터 5종 정의됨', () => {
  assertContains(html, 'const CORP_PROMOS=[', 'CORP_PROMOS');
  ['marriott','ihg','accor','hilton','hyatt'].forEach(id =>
    assertContains(html, `id:'${id}'`, `${id} 프로모션`));
});
test('[CORP-02] 프로모션 구조 3종(체험/달성/배수) 구분됨', () => {
  assertContains(html, "type:'trial'", '체험형');
  assertContains(html, "type:'achieve'", '달성형');
  assertContains(html, "type:'multiplier'", '포인트배수형');
});
test('[CORP-03] 종료일 지난 프로모션 자동 비활성', () => {
  assertContains(html, 'function _activePromos(now)', '_activePromos()');
  assertContains(html, "const to=new Date(p.to+'T23:59:59').getTime();", '종료일 비교');
});
test('[CORP-04] 갱신 확인 안내 존재', () => {
  assertContains(html, '복지포털에서 올해 프로모션을 다시 확인', '갱신 안내');
});
test('[CORP-05] 아코르 코드는 소스에 없고 localStorage 사용 (대외비 보호)', () => {
  assertNotContains(html, 'SCP148480', '회사ID 하드코딩 금지');
  assertNotContains(html, 'HY693GB774', '액세스코드 하드코딩 금지');
  assertContains(html, "const _CORP_CODE_KEY='tm_corp_codes_v1'", '코드 저장 키');
});
test('[CORP-06] 브랜드 → 체인 판별 맵 존재', () => {
  assertContains(html, 'const CHAIN_BRANDS={', 'CHAIN_BRANDS');
  assertContains(html, 'function _chainOf(name)', '_chainOf()');
});
test('[CORP-07] 지리적 게이트 — 도보 20분 초과 제외', () => {
  assertContains(html, 'if(r&&r.secs<=20*60) kept.push(', '20분 게이트');
});
test('[CORP-08] 직선거리 1.5km 1차 선별 (Routes 호출 절감)', () => {
  assertContains(html, 'if(km>1.5) return;', '직선거리 선별');
});
test('[CORP-09] 지점 없는 체인은 조건 무관 제외 안내', () => {
  assertContains(html, '조건과 무관하게 제외', '지리 게이트 탈락 문구');
});
test('[CORP-10] 체험형 즉시혜택 금전환산 함수 존재', () => {
  assertContains(html, 'function _promoNightValue(p,dObj,ppl,rate)', '_promoNightValue()');
});
test('[CORP-11] 달성형은 즉시혜택 0으로 명시', () => {
  assertContains(html, '이번 숙박 즉시 혜택 <b>없음</b>', '달성형 즉시혜택 없음');
});
test('[CORP-12] 올해 추가 예정 박수로 문턱 누적 계산', () => {
  assertContains(html, 'const total=nights+extra;', '누적 박수');
  assertContains(html, '없다면 등급 연장 가치는 0', '미달 시 가치 0');
});
test('[CORP-13] 실질가 = 요금 − 프로모션 가치 로 정렬', () => {
  assertContains(html, 'net:rate-v.value', '실질가 계산');
  assertContains(html, 'cands.sort((a,b)=>a.net-b.net);', '실질가 정렬');
});
test('[CORP-14] 동가격대는 승자를 정하지 않고 두 축 병렬 제시', () => {
  assertContains(html, '승자를 정하지 않을게요', '트레이드오프 문구');
  assertContains(html, '🚶 위치 우위', '위치 축');
  assertContains(html, '🎫 프로모션 우위', '프로모션 축');
});
test('[CORP-15] 마리엇 OTA 실적 불인정 경고 존재', () => {
  assertContains(html, 'OTA·포인트·여행사 선결제는 실적 불인정', '마리엇 예약경로 경고');
});
test('[CORP-16] 하얏트 3년 1회 제한 경고 존재', () => {
  assertContains(html, '3년에 1회만 참여 가능', '하얏트 참여제한');
});
test('[CORP-17] IHG 2박 문턱이 가장 낮게 정의됨', () => {
  assertContains(html, "tiers:[{nights:2,label:'골드 엘리트 (2027년까지)'}", 'IHG 2박 문턱');
});

/* ══════════════════════════════════════════════
   22. 교통수단 (도시 내 전략 · 도시 간 이동 · 구간 다중수단)
   ══════════════════════════════════════════════ */
test('[TRN-01] 도시별 교통 DB 존재', () => {
  assertContains(html, 'const CITY_TRANSIT={', 'CITY_TRANSIT');
  ['로마','베네치아','도쿄','이스탄불','런던'].forEach(c =>
    assertContains(html, `'${c}':{modes:`, `${c} 교통정보`));
});
test('[TRN-02] 국가 폴백 + 도시명 별칭 해소', () => {
  assertContains(html, 'const COUNTRY_TRANSIT={', 'COUNTRY_TRANSIT');
  assertContains(html, "const _TRANSIT_ALIAS={'LA':'로스앤젤레스'", '별칭 맵');
});
test('[TRN-03] 렌트 적합도 3단계 구분', () => {
  assertContains(html, 'const _RENTAL_UI={', '_RENTAL_UI');
  ['no','suburb','yes'].forEach(k => assertContains(html, `${k}:{icon:`, `rental ${k}`));
});
test('[TRN-04] 렌트 필수 도시(LA·제주) 명시', () => {
  assertContains(html, 'LA는 렌트가 사실상 필수', 'LA 렌트');
  assertContains(html, '제주는 렌트가 정답', '제주 렌트');
});
test('[TRN-05] 지역 특화 수단 반영 (바포레토·페리·컨택리스)', () => {
  assertContains(html, '바포레토', '베네치아 바포레토');
  assertContains(html, '이스탄불카트', '이스탄불카트');
  assertContains(html, '오이스터카드 살 필요 없어요', '런던 컨택리스');
});
test('[TRN-06] 도시 내 교통 카드 렌더 함수 존재', () => {
  assertContains(html, 'function _renderCityTransitCard(destKeys)', '_renderCityTransitCard()');
});
test('[ICT-01] 도시 간 이동 카드 렌더 함수 존재', () => {
  assertContains(html, 'function _renderIntercityCard(destKeys)', '_renderIntercityCard()');
});
test('[ICT-02] 거리 밴드별 수단 추천 로직', () => {
  assertContains(html, 'function _intercityAdvice(km,sameCountry)', '_intercityAdvice()');
  assertContains(html, 'if(km<300) return', '300km 밴드');
  assertContains(html, 'if(km<700) return', '700km 밴드');
});
test('[ICT-03] 자차 실측 함수 존재', () => {
  assertContains(html, 'async function measureIntercity(btn)', 'measureIntercity()');
});
test('[ICT-04] 국가별 택시 km당 요금 테이블', () => {
  assertContains(html, 'const TAXI_KM_KRW=', 'TAXI_KM_KRW');
  assertContains(html, 'function _taxiKmKrw(dObj)', '_taxiKmKrw()');
});
test('[ICT-05] 렌트 손익분기 계산 — 인원수 곱셈 반영', () => {
  assertContains(html, 'function calcRentBreakeven(el)', 'calcRentBreakeven()');
  assertContains(html, 'const trainTotal=train1*ppl;', '기차는 인원수 곱');
});
test('[ICT-06] Rome2Rio 범용 비교 링크', () => {
  assertContains(html, 'https://www.rome2rio.com/map/', 'Rome2Rio 링크');
});
test('[SEG-01] 구간 이동은 도보를 먼저 측정', () => {
  assertContains(html, "const walk=await _gmapsRouteSecs(from,to,'walking');", '도보 우선 측정');
});
test('[SEG-02] 도보 20분 이하면 도보만 표기', () => {
  assertContains(html, 'if(walk&&walk.secs<=20*60){', '20분 임계');
});
test('[SEG-03] 20~90분은 도보·대중교통 병기', () => {
  assertContains(html, 'if(walk&&alt&&walk.secs<=90*60){', '90분 임계');
  assertContains(html, "timeEl.innerHTML=`🚶 ${_fmtSecs(walk.secs)} · ${alt.drive?'🚗':'🚇'} ${_fmtSecs(alt.secs)}`;", '병기 표기');
});
test('[SEG-04] 도보 90분 초과는 도보 숫자를 감춤', () => {
  assertContains(html, '걸어갈 거리가 아니에요', '도보 불가 안내');
});

/* ══════════════════════════════════════════════
   결과 출력
   ══════════════════════════════════════════════ */
console.log('\n====================================');
console.log('  TripMind TDD 검증 결과');
console.log('====================================\n');

let failDetails = [];
results.forEach(r => {
  const icon = r.status === 'PASS' ? '✅' : '❌';
  if (r.status === 'FAIL') {
    failDetails.push(`  ${icon} ${r.name}\n     └ ${r.err}`);
  }
});

if (failDetails.length > 0) {
  console.log('실패 항목:\n');
  failDetails.forEach(d => console.log(d));
  console.log('');
}

console.log(`총 ${_total}개 테스트 | ✅ PASS: ${_pass} | ❌ FAIL: ${_fail}`);
console.log('====================================\n');

process.exit(_fail > 0 ? 1 : 0);
