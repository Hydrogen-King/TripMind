# 💑 데이트 코스 — 실데이터(네이버·구글) 연동 가이드

데이트 코스 결과에 **그 동네 실제 인기 카페·맛집 TOP**(실제 상호 + 네이버 블로그 후기 수 + 구글 별점)을
띄우려면, 정적 사이트(GitHub Pages)가 직접 못 부르는 API를 대신 호출해 줄
**Cloudflare Worker 프록시** 하나만 배포하면 됩니다. (사이트는 GitHub Pages 그대로)

> 연동을 안 해도 앱은 **기존 큐레이션 추천 + 유튜브/블로그/지도 바로가기 버튼**으로 정상 동작합니다.
> 아래는 "실제 평점·블로그 랭킹"까지 켜고 싶을 때만 하면 됩니다.

```
[GitHub Pages 프론트]  ──fetch──▶  [Cloudflare Worker]  ──▶  네이버 / 구글 API
```

---

## 1. 네이버 검색 API 키 발급 (무료)
1. https://developers.naver.com/apps → **애플리케이션 등록**
2. 사용 API: **검색** 추가
3. 발급된 **Client ID** / **Client Secret** 메모
   - 무료 25,000회/일. 별점은 제공 안 함(상호·주소·지도링크·블로그 후기 수 제공).

## 2. (선택) 구글 Places 키 — ⭐별점이 필요할 때만
1. Google Cloud Console → **Places API** 활성화 + **결제(빌링)** 설정
2. **API 키** 발급
   - ⚠️ 구글 Places는 **호출당 과금**됩니다. Worker가 6시간 캐시해 비용을 줄이지만, 키는 본인 계정/결제로만 등록하세요.
   - 별점이 굳이 필요 없으면 이 단계는 **건너뛰어도** 됩니다(네이버만으로 인기 랭킹 가능).

## 3. Cloudflare Worker 배포 (토큰/Actions 불필요)
1. https://dash.cloudflare.com → **Workers & Pages** → **Create** → **Worker**
2. 저장소의 **`date-proxy-worker.js`** 내용을 통째로 붙여넣고 **Deploy**
3. 배포 주소 확인 (예: `https://tripmind-date.<계정>.workers.dev`)

## 4. Worker에 키 등록 (Secret)
배포한 Worker → **Settings → Variables and Secrets** 에서 추가:

| 이름 | 값 | 필수 |
|---|---|---|
| `NAVER_ID` | 네이버 Client ID | ✅ |
| `NAVER_SECRET` | 네이버 Client Secret | ✅ |
| `GOOGLE_KEY` | 구글 Places 키 | 선택(별점) |
| `ALLOW_ORIGIN` | `https://hydrogen-king.github.io` | 선택(기본 `*`) |

> 정상 확인: 브라우저에서 `https://<worker주소>/health` 열기 → `{"ok":true,"naver":true,...}`

## 5. 프론트에 Worker 주소 연결
`index.html` 에서 이 한 줄을 찾아 따옴표 안에 Worker 주소를 넣으세요:

```html
<script>window.TRIPMIND_DATE_API='';</script>
```
↓
```html
<script>window.TRIPMIND_DATE_API='https://tripmind-date.<계정>.workers.dev';</script>
```

저장 → `git push` 하면 끝. 데이트 코스 결과 하단에
**"☕ 실제 인기 카페 TOP / 🍽️ 실제 인기 맛집 TOP"** 카드가 뜹니다.

---

## 엔드포인트 (참고)
| 경로 | 설명 |
|---|---|
| `GET /health` | 상태 + 키 설정 여부 |
| `GET /spots?area=홍대&cat=카페&n=5` | 그 동네 실제 인기 가게 TOP |
| `GET /enrich?name=어니언 성수&area=성수` | 특정 가게 블로그 수/구글 별점 |

## 보안 메모
- API 키는 **Worker 환경변수(Secret)**에만 넣습니다. 저장소 코드(`date-proxy-worker.js`)에는 키가 없습니다.
- `date-proxy-worker.js` 는 공개돼도 안전합니다(키 미포함).
