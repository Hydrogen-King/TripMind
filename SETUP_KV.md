# TripMind — Cloudflare KV 초기 셋업 가이드

## 1. KV 네임스페이스 생성

```bash
# 메인 앱용 (일정 저장)
npx wrangler kv namespace create TRIPMIND_KV
# → id = "xxxxxxxxxxxxxxxxxxxxxxxx" 를 복사

# 데이트 프록시용 (레이트 리밋)
npx wrangler kv namespace create RATELIMIT_KV --config wrangler-date.toml
# → id = "yyyyyyyyyyyyyyyyyyyyyyyy" 를 복사
```

## 2. wrangler.toml 에 ID 입력

`wrangler.toml` 파일에서 아래 줄을 실제 ID로 교체:
```toml
id = "REPLACE_WITH_YOUR_KV_ID"
```

`wrangler-date.toml` 에서:
```toml
id = "REPLACE_WITH_YOUR_RATELIMIT_KV_ID"
```

## 3. Secrets 등록 (데이트 프록시)

```bash
npx wrangler secret put NAVER_ID --config wrangler-date.toml
npx wrangler secret put NAVER_SECRET --config wrangler-date.toml
npx wrangler secret put GOOGLE_KEY --config wrangler-date.toml
```

## 4. 배포

```bash
bash deploy.sh
```

## 구조 요약

```
tripmind (메인 Worker)
  ├── GET  /api/v            → 배포 버전 (SW 캐시 무효화용)
  ├── GET  /api/saves?uid=…  → 저장 목록 (KV 조회)
  ├── POST /api/saves        → 일정 저장 (KV 저장)
  ├── DELETE /api/saves/:id  → 일정 삭제 (KV 삭제)
  └── *                      → Workers Assets (정적 파일)

tripmind-date (데이트 프록시 Worker)
  ├── GET /health
  ├── GET /spots
  ├── GET /enrich
  ├── GET /geocode
  └── GET /exhibitions
      ↑ 모두 IP별 일일 30회 레이트 리밋 적용
```
