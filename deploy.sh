#!/bin/bash
# TripMind 배포 스크립트
# 사용법: bash deploy.sh
# ─────────────────────────────────────────────────────────────
# BUILD_VERSION을 현재 타임스탬프로 주입 → SW 캐시 자동 무효화
# ─────────────────────────────────────────────────────────────

set -e

BUILD_VERSION=$(date +%Y%m%d%H%M)
echo "▶ 배포 버전: $BUILD_VERSION"

# sw.js 캐시 버전 자동 갱신 — 배포마다 새 캐시 세대로 교체 (진짜 SW 무효화 지점)
sed -i.bak -E "s/^const SW_VERSION[[:space:]]*=[[:space:]]*'[^']*'/const SW_VERSION   = 'v-$BUILD_VERSION'/" sw.js
rm -f sw.js.bak
echo "▶ sw.js SW_VERSION → v-$BUILD_VERSION"

# Worker 환경변수로 버전 주입 (/api/v 가 반환 — 진단용)
npx wrangler deploy \
  --var BUILD_VERSION:"$BUILD_VERSION"

echo "✅ tripmind 배포 완료"

# 데이트 프록시 Worker 배포 (별도 config)
if [ -f wrangler-date.toml ]; then
  echo "▶ 데이트 프록시 Worker 배포 중..."
  npx wrangler deploy --config wrangler-date.toml
  echo "✅ tripmind-date 배포 완료"
fi

echo ""
echo "══════════════════════════════════════"
echo "  배포 완료! 버전: $BUILD_VERSION"
echo "  SW 캐시가 자동으로 무효화됩니다."
echo "══════════════════════════════════════"
