# CLAUDE.md — TripMind (AI 여행 플래너)

> 이 파일은 새 대화에서 자동 로드되어 프로젝트 맥락을 잡아준다.
> 세부 이력이 필요하면 아래 "관련 세션"을 `search_session_transcripts`로 복원할 것.

## 개요
목적지·날짜·스타일 입력 → AI가 맞춤 일정/예상비용/실시간 날씨·환율 생성하는 여행 플래너.
- **폴더**: `C:\Users\kangj\OneDrive\바탕 화면\TripMind`
- **GitHub**: `Hydrogen-King/TripMind` (private)
- **라이브**: https://tripmind.kangjuno980126.workers.dev/
- **호스팅**: Cloudflare Worker + KV (계정 `kangjuno980126@gmail.com`, `wrangler` 로그인됨)

## 스택
Vanilla HTML/CSS/JS (빌드 도구 없음) · Leaflet.js+OpenStreetMap · Pretendard · html2canvas ·
날씨 wttr.in · 환율 open.er-api.com · PWA(sw.js). 도시 데이터 430개는 `db_extra*.js`에 분산.

## 파일 구조 (핵심)
```
index.html          — 메인 앱(UI + 로직 + 기본 DB)
worker.js           — 메인 Cloudflare Worker
date-proxy-worker.js— 데이트/날짜 프록시 Worker
db_extra*.js        — 추가 도시 DB (없으면 도시 대부분 누락)
hotel_data.js       — 호텔 데이터
sw.js               — Service Worker(오프라인 캐시, BUILD_VERSION으로 무효화)
deploy.sh           — 배포 스크립트(아래)
wrangler.toml / wrangler-date.toml — Worker 설정 2종
SETUP_KV.md, DATE_API_SETUP.md — KV/날짜 API 세팅 문서
```
⚠️ README.md의 Netlify/Vercel 배포 안내는 **구식**. 실제 배포는 아래 Cloudflare 방식.

## 배포 (반드시 이 방식)
`bash deploy.sh` 하나로 메인 Worker + 데이트 프록시 Worker를 배포하고 `BUILD_VERSION`을
타임스탬프로 자동 주입 → SW 캐시 자동 무효화. **수동으로 `wrangler deploy`를 따로 치지 말 것.**
→ `/TripMind:deploy` 스킬이 이 절차를 감싼다.

## 관련 세션 (연결성 있는 개발용)
- `local_7d44f6b1` — 최초 구축(원류)
- `local_e03634cf` — 항공편 예약 기능
- `local_6c834eac` — 아시아나 마일리지 이탈리아/이스탄불 일정(앱 활용)

메모리: `project-tripmind`

---

## 📖 진행 이력 (과거 대화 증류)

**두 개의 모드로 진화:**
1. **여행 계획** — 심리테스트로 취향 파악 → 대륙/국가/도시(다중 선택) 기반 일정.
   목표 도시 수 430개(원래 "5배=410개" 요청에서 시작). 도시별 관광 스팟 5개+ / 대표사진 /
   포토스팟 / 맛집(유튜브·구글평점 우선, 대표메뉴) / 호텔 예시 / 실입장료 기반 예상비용.
   체력 옵션(하루 이동량 조절), 축제·전시 자동반영, 다국가 동시 여행 지원.
2. **데이트 코스** — 한국 한정, 매주용. 출발지별 동선 최적화, 카테고리(한식/중식/일식/양식/
   술집/디저트/브런치 등), Top10 맛집·카페, 영업시간/별점. `tripmind-date` 워커 + `date-proxy-worker.js`.

**항공권**: 결과 화면에 항공권 정보 카드(노선/비행시간/예상 왕복료) + Skyscanner·네이버항공·구글항공
원탭 예약 링크. 추가 API 없이 기존 DB만으로 동작.

**인프라 결정:** 초기엔 Gemini/Groq API 썼으나 무료 한도 문제로 → API 없는 정적 DB 방식으로 전환
(gangnamhouseowner 아키텍처 참고). 배포는 GitHub Pages→Cloudflare Worker로 이전, `deploy.sh`가 표준.
Google Maps는 **Routes API(이동시간)** + **Places API(별점·영업중·사진)** 사용 — 서버키는
`tripmind-date` 워커의 `GOOGLE_KEY` 시크릿, 클라이언트키는 HTML에 리퍼러 제한(도메인 2개)으로 노출.

## 🔧 자주 재발한 이슈 (주의)
- **버튼 클릭 안 됨** — 여러 번 재발. "강건하게 짜달라"는 요청 있었음. 배포 후 항상 버튼 동작 확인할 것.
- 데스크탑 레이아웃에서 글씨 작음/빈 화면 많음 → 반복적으로 "꽉 채우고 글씨 키워달라" 요청.
- 관광지 대표 이미지가 실제와 불일치(같은 이미지 반복) — DB 정확도 이슈.
- 맛집/일정 중복 추천 → 중복 제거 로직 필요.

## ✅ 다음에 이어서 할 일 (미완/열린 항목)
- 추천 장소의 **이유 + 출처(유튜브/네이버 링크)** 표기 — 정윤님 피드백, 일부만 반영.
- 정해진 방문일정(날짜 고정) 반영, 숙소↔관광지 이동시간.

## ✔ 2026-07-09 반영 완료 (전면 리뷰 후속)
- KV 일정 저장 API 첫 정상 배포: `TRIPMIND_KV` 네임스페이스 생성(id `84aa1e07…`),
  wrangler.toml에 `main=worker.js` + `binding="ASSETS"` (ASSETS 바인딩 누락 시 비자산 경로 1101 에러 — 주의).
- `deploy.sh`가 sw.js `SW_VERSION`을 타임스탬프로 sed 주입 → SW 캐시 진짜 자동 무효화.
  index.html에 SW `updatefound` → "새 버전" 토스트 추가.
- 저장/복원: 스냅샷에서 Leaflet 잔재 제거+`maps` 스펙 저장 → 복원 시 지도 재생성(`_initResultMaps`).
  `_lsSet` 실패(쿼터) 시 거짓 성공 토스트 제거.
- 결과 화면 sticky 섹션 내비(`buildResultNav`), 날씨 위젯 여행기간 전체(최대 7일) 표시,
  Routes API sessionStorage 캐시, Leaflet 이중 로드 제거, apple-touch-icon.png 실파일 생성,
  og:url workers.dev로 교체, `.assetsignore`로 소스/설정 공개 서빙 차단, worker.js CORS 화이트리스트.
- netlify.toml/vercel.json 삭제, README Cloudflare 기준 재작성, GitHub Actions CI(test.yml),
  tripmind.test.js 낡은 기대값 수정 + CRLF 정규화 → 133/133 통과.
- `GOOGLE_KEY` 시크릿 등록 완료(리퍼러 제한 없는 서버 전용 키) → `/health`에서 `google:true`,
  데이트 코스 화면에서 실제 별점·리뷰수·영업중 상태 표시 확인됨 (예: "⭐ 4.9 (3,320)").
