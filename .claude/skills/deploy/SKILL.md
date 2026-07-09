---
name: deploy
description: TripMind(여행 플래너)를 배포하거나 배포 상태를 확인할 때 사용. "TripMind 배포", "여행 앱 업데이트", "데이트 프록시 반영해줘", "서비스워커 캐시 갱신이 안 돼" 같은 요청에 반드시 사용한다. 이미 만들어둔 deploy.sh가 메인 Worker와 데이트 프록시 Worker를 한번에 배포하고 BUILD_VERSION도 자동 주입해주므로, 수동으로 wrangler deploy를 따로 치지 말고 이 스크립트를 거쳐야 한다.
---

## 배경

- `deploy.sh`가 이미 다음을 자동으로 처리한다: (1) 현재 타임스탬프를 `BUILD_VERSION`으로 주입해 `npx wrangler deploy` 실행(메인 `tripmind` Worker), (2) `wrangler-date.toml`이 존재하면 데이트 프록시 Worker(`tripmind-date`)도 이어서 배포. 그래서 배포 자체는 `bash deploy.sh` 한 줄로 끝난다 — 각 Worker를 따로 `wrangler deploy`하지 않는다.
- `sw.js`의 `SW_VERSION` 상수(예: `v17-2026-06-08`)는 `deploy.sh`의 `BUILD_VERSION`과 **완전히 별개**다. 과거에 이 둘을 연결하려다 실패한 이력이 `sw.js` 상단 주석에 남아있다(`/api/v`가 호스트마다 다른 응답을 줘서 실패). stale-while-revalidate 방식 덕분에 `SW_VERSION`을 안 올려도 다음 로드에서 자동으로 최신화되지만, 사용자가 "지금 당장 반영되게" 원하면 `SW_VERSION`을 수동으로 올려야 한다.

## 절차

1. `git status`, `git diff`로 변경사항을 확인한다.
2. 정적 자산(`STATIC_ASSETS`에 포함된 파일, 특히 `_date_new.js`나 `db_extra*.js`)이 바뀌었고 사용자가 즉시 반영을 원하면, `sw.js`의 `SW_VERSION`을 오늘 날짜로 올린다 (`vNN-YYYY-MM-DD` 형식을 유지하고 번호를 하나 올린다).
3. `bash deploy.sh`를 실행한다. 출력에서 "tripmind 배포 완료"와 (해당되면) "tripmind-date 배포 완료" 메시지를 확인한다.
4. `cloudflare-observability` MCP로 `tripmind`와 `tripmind-date` 두 Worker의 로그를 각각 확인해서 에러가 없는지 체크한다.
5. 사용자에게 요약해서 보고한다: 배포된 Worker 목록, BUILD_VERSION 값, SW_VERSION 변경 여부, 라이브 URL.

## 참고

- GitHub: `Hydrogen-King/TripMind` (private)
- 메인 Worker: `tripmind` (KV: `TRIPMIND_KV`, 일정 저장) / 데이트 프록시: `tripmind-date` (KV: `RATELIMIT_KV`, IP당 하루 30회 레이트리밋)
- 데이트 프록시용 네이버/구글 API 키가 없어도 앱은 큐레이션 추천으로 정상 동작하므로, 그 키들이 없다고 배포를 막을 필요는 없다.
