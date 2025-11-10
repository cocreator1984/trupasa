#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."/web

echo "[build] Installing deps (npm ci)…"
if command -v npm >/dev/null 2>&1; then
  if [ -f package-lock.json ]; then npm ci; else npm install; fi
else
  echo "npm not found" >&2; exit 1
fi

echo "[build] Building Next.js app…"
npm run build

echo "[build] Done. Output in .next/"

