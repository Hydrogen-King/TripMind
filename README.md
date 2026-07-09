# ✈️ TripMind — AI 여행 플래너

목적지·날짜·스타일만 입력하면 AI가 맞춤 여행 일정, 예상 비용,  
실시간 날씨·환율까지 한번에 만들어주는 무료 여행 플래너입니다.

- **라이브**: https://tripmind.kangjuno980126.workers.dev/

---

## 📁 파일 구조

```
TripMind/
├── index.html            ← 메인 앱 (UI + 핵심 로직 + 기본 DB)
├── worker.js             ← 메인 Cloudflare Worker (API + 정적 서빙)
├── date-proxy-worker.js  ← 데이트 실데이터 프록시 Worker
├── sw.js                 ← Service Worker (오프라인 지원)
├── db_extra*.js          ← 추가 도시 DB (1~9)
├── hotel_data.js         ← 호텔 데이터
├── _date_new.js          ← 데이트 코스 모듈
├── favicon.svg           ← 앱 아이콘
├── apple-touch-icon.png  ← iOS 홈 화면 아이콘
├── wrangler.toml         ← 메인 Worker 설정 (KV 포함)
├── wrangler-date.toml    ← 데이트 프록시 Worker 설정
├── deploy.sh             ← 배포 스크립트 (표준 배포 경로)
└── README.md             ← 이 파일
```

> ⚠️ **모든 파일이 같은 폴더에 있어야 합니다.**  
> `db_extra*.js` 파일이 없으면 도시 데이터 대부분이 누락됩니다.

---

## 🚀 배포 (Cloudflare Workers — 표준 방식)

```bash
bash deploy.sh
```

이 한 줄로 다음이 자동 처리됩니다:

1. `sw.js`의 `SW_VERSION`을 타임스탬프로 갱신 → 서비스워커 캐시 자동 무효화
2. 메인 Worker(`tripmind`) 배포 — 정적 파일 + `/api/*` (KV 일정 저장)
3. 데이트 프록시 Worker(`tripmind-date`) 배포

> ❗ `npx wrangler deploy`를 수동으로 따로 실행하지 마세요. 항상 `deploy.sh`를 사용합니다.

### 최초 1회 설정

```bash
# KV 네임스페이스 생성 후 출력된 id를 wrangler.toml 에 반영
npx wrangler kv namespace create TRIPMIND_KV

# 데이트 프록시 시크릿 (별점·영업시간 표시용 — 선택)
npx wrangler secret put GOOGLE_KEY --config wrangler-date.toml
npx wrangler secret put NAVER_ID --config wrangler-date.toml
npx wrangler secret put NAVER_SECRET --config wrangler-date.toml
```

자세한 내용: [SETUP_KV.md](SETUP_KV.md), [DATE_API_SETUP.md](DATE_API_SETUP.md)

---

## 🧪 테스트

```bash
node tripmind.test.js
```

GitHub Actions(`.github/workflows/test.yml`)에서 push마다 자동 실행됩니다.

---

## ✨ 주요 기능

| 기능 | 설명 |
|---|---|
| 🗺️ 450개 도시 | 아시아·유럽·미주·아프리카 전역 |
| 📅 맞춤 일정 | 스타일·예산·인원 반영 |
| 💰 예상 비용 | 실제 입장료 DB 2,560개 반영 |
| ✈️ 항공권 카드 | 노선·예상가 + Skyscanner·네이버·구글 원탭 예약 |
| 🌤 실시간 날씨 | Open-Meteo 무료 API |
| 💱 실시간 환율 | 65개국 자동 감지 |
| 📸 이미지 저장 | 일정 PNG 다운로드 |
| ✅ 체크리스트 | 여행지 맞춤 준비물 |
| 💑 데이트 코스 | 한국 도시 실데이터(네이버·구글) 기반 |
| 📱 PWA | 홈 화면에 앱으로 설치 |

---

## 🛠 기술 스택

- **언어**: Vanilla HTML / CSS / JavaScript (빌드 도구 없음)
- **호스팅**: Cloudflare Workers + KV (Workers Assets 정적 서빙)
- **지도**: Leaflet.js + OpenStreetMap
- **폰트**: Pretendard (CDN)
- **이미지 저장**: html2canvas (CDN)
- **날씨**: Open-Meteo API (무료, 키 불필요)
- **환율**: open.er-api.com (무료, 키 불필요)

---

## 📄 라이선스

개인 사용 및 비상업적 공유 자유.  
상업적 이용 시 별도 문의 바랍니다.
