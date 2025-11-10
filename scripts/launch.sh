#!/usr/bin/env bash
set -euo pipefail

# Launch Next.js and open the site in the Windows host browser from WSL.

MODE="${1:-dev}"   # dev|start
PORT="${PORT:-3000}"

root_dir="$(cd "$(dirname "$0")/.." && pwd)"
web_dir="$root_dir/web"

cd "$web_dir"

if [ "$MODE" = "start" ]; then
  echo "[launch] Ensuring build…"
  if [ ! -d .next ]; then npm run build; fi
  echo "[launch] Starting production server…"
  npm run start -- -p "$PORT" -H 0.0.0.0 > "$root_dir/.launch.log" 2>&1 &
else
  echo "[launch] Starting dev server…"
  npm run dev -- -p "$PORT" -H 0.0.0.0 > "$root_dir/.launch.log" 2>&1 &
fi

pid=$!
echo "[launch] PID: $pid (logs: $root_dir/.launch.log)"

echo -n "[launch] Waiting for server to be ready"
for i in {1..60}; do
  status=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:${PORT}" || true)
  if [[ "$status" =~ ^2|3 ]]; then
    echo " - up!"
    break
  fi
  echo -n "."
  sleep 1
done

URL="http://localhost:${PORT}"
echo "[launch] Opening $URL in Windows host…"
if command -v wslview >/dev/null 2>&1; then
  wslview "$URL" || true
else
  # Fallback to Windows start via cmd.exe
  cmd.exe /c start "$URL" >/dev/null 2>&1 || true
fi

echo "[launch] Press Ctrl+C to stop. Tailing logs…"
trap 'echo; echo "[launch] Stopping (PID $pid)…"; kill $pid 2>/dev/null || true; exit 0' INT TERM
tail -f "$root_dir/.launch.log"

