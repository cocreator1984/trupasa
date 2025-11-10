param([int]$Port = 3000)
$ErrorActionPreference = 'SilentlyContinue'
try {
  $conns = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
  if ($conns) {
    $pids = $conns | Select-Object -ExpandProperty OwningProcess -Unique
    foreach ($pid in $pids) {
      try {
        $p = Get-Process -Id $pid -ErrorAction SilentlyContinue
        if ($p) {
          Write-Host "Stopping PID $pid ($($p.ProcessName)) listening on :$Port"
          Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
        }
      } catch {}
    }
  } else {
    Write-Host "No process is listening on :$Port"
  }
} catch {
  Write-Error $_
}