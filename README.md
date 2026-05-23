# ✈️ TripMind — AI 여행 플래너

목적지·날짜·스타일만 입력하면 AI가 맞춤 여행 일정, 예상 비용,  
실시간 날씨·환율까지 한번에 만들어주는 무료 여행 플래너입니다.

---

## 📁 파일 구조

```
TripMind/
├── index.html        ← 메인 앱 (UI + 핵심 로직 + 기본 DB)
├── sw.js             ← Service Worker (오프라인 지원)
├── db_extra.js       ← 추가 도시 DB 1
├── db_extra2.js      ← 추가 도시 DB 2
├── db_extra3.js      ← 추가 도시 DB 3
├── db_extra4.js      ← 추가 도시 DB 4
├── db_extra5.js      ← 추가 도시 DB 5
├── db_extra6.js      ← 추가 도시 DB 6
├── db_extra7.js      ← 추가 도시 DB 7
├── favicon.svg       ← 앱 아이콘
├── netlify.toml      ← Netlify 배포 설정
├── vercel.json       ← Vercel 배포 설정
└── README.md         ← 이 파일
```

> ⚠️ **모든 파일이 같은 폴더에 있어야 합니다.**  
> `db_extra*.js` 파일이 없으면 도시 데이터 대부분이 누락됩니다.

---

## 🚀 배포 방법 (3가지 중 선택)

### ① Netlify Drop — 가장 빠름 (계정 없이 가능)
1. [app.netlify.com/drop](https://app.netlify.com/drop) 접속
2. `TripMind` 폴더 전체를 페이지에 **드래그 앤 드롭**
3. 30초 후 `https://xxxx.netlify.app` URL 발급 완료

> 계정을 만들면 URL 커스텀 + HTTPS + 자동 업데이트 가능

---

### ② GitHub Pages — URL 고정 추천
1. [github.com](https://github.com) 로그인 → **New repository** 생성
2. TripMind 폴더 내 모든 파일을 repo에 업로드
3. Settings → Pages → Branch: `main` / Folder: `/ (root)` → Save
4. `https://{유저명}.github.io/{레포이름}/` 으로 접속

---

### ③ Vercel — 가장 빠른 CDN
1. [vercel.com](https://vercel.com) 로그인
2. **Add New → Project** → GitHub repo 연결  
   (또는 CLI: `npx vercel` 실행 후 폴더 지정)
3. Framework Preset: **Other** 선택 → Deploy

---

## ⚙️ 배포 전 설정 (선택)

### Google Analytics 연동
`index.html` 파일에서 `G-XXXXXXXXXX` 를 본인 GA4 측정 ID로 교체

```html
<!-- 변경 전 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
...gtag('config', 'G-XXXXXXXXXX');

<!-- 변경 후 (예시) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ABC1234567"></script>
...gtag('config', 'G-ABC1234567');
```

### OG 이미지 URL 변경 (SNS 공유 미리보기)
`index.html` 상단의 og:url 을 실제 배포 URL로 교체

```html
<meta property="og:url" content="https://YOUR-DOMAIN.com">
```

---

## ✨ 주요 기능

| 기능 | 설명 |
|---|---|
| 🗺️ 430개 도시 | 아시아·유럽·미주·아프리카 전역 |
| 📅 맞춤 일정 | 스타일·예산·인원 반영 |
| 💰 예상 비용 | 실제 입장료 DB 2,560개 반영 |
| 🌤 실시간 날씨 | wttr.in 무료 API |
| 💱 실시간 환율 | 65개국 자동 감지 |
| 📸 이미지 저장 | 일정 PNG 다운로드 |
| ✅ 체크리스트 | 여행지 맞춤 준비물 |
| 📱 PWA | 홈 화면에 앱으로 설치 |

---

## 🛠 기술 스택

- **언어**: Vanilla HTML / CSS / JavaScript (빌드 도구 없음)
- **지도**: Leaflet.js + OpenStreetMap
- **폰트**: Pretendard (CDN)
- **이미지 저장**: html2canvas (CDN)
- **날씨**: wttr.in API (무료, 키 불필요)
- **환율**: open.er-api.com (무료, 키 불필요)

---

## 📄 라이선스

개인 사용 및 비상업적 공유 자유.  
상업적 이용 시 별도 문의 바랍니다.
