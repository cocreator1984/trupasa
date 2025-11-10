#!/usr/bin/env bash
set -euo pipefail

PORT="${PORT:-3000}"

cd "$(dirname "$0")/.."/web
echo "[dev] Starting dev server on http://localhost:${PORT} …"
npm run dev -- -p "$PORT" -H 0.0.0.0

