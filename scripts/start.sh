#!/usr/bin/env bash
set -euo pipefail

PORT="${PORT:-3000}"

cd "$(dirname "$0")/.."/web
echo "[start] Starting on http://localhost:${PORT} (Next.js prod server)…"
npm run start -- -p "$PORT" -H 0.0.0.0

