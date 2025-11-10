#!/usr/bin/env pwsh
param(
  [string]$Mode,
  [string]$Port,
  [switch]$Detach,
  [switch]$NoTail
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

if (-not $Mode) { $Mode = 'dev' }
if (-not $Port) { $Port = $env:PORT }
if (-not $Port) { $Port = '3000' }

$root = Resolve-Path (Join-Path $PSScriptRoot '..')
$webDir = Resolve-Path (Join-Path $root 'web')
$log = Join-Path $root '.launch.log'

function Wait-ForServer($url, [int]$timeoutSec = 60) {
  Write-Host -NoNewline "[launch] Waiting for server to be ready"
  $stopWatch = [System.Diagnostics.Stopwatch]::StartNew()
  $hasTimeoutParam = $false
  try {
    $cmd = Get-Command Invoke-WebRequest -ErrorAction Stop
    $hasTimeoutParam = $cmd.Parameters.ContainsKey('TimeoutSec')
  } catch {}
  while ($stopWatch.Elapsed.TotalSeconds -lt $timeoutSec) {
    try {
      if ($hasTimeoutParam) {
        $resp = Invoke-WebRequest -Uri $url -Method Get -TimeoutSec 2 -UseBasicParsing -ErrorAction Stop
        if ($resp.StatusCode -ge 200 -and $resp.StatusCode -lt 400) {
          Write-Host " - up!"
          return $true
        }
      } else {
        $req = [System.Net.HttpWebRequest]::Create($url)
        $req.Method = 'GET'
        $req.Timeout = 2000
        $req.AllowAutoRedirect = $true
        $resp = $req.GetResponse()
        try {
          $code = [int]$resp.StatusCode
          if ($code -ge 200 -and $code -lt 400) {
            Write-Host " - up!"
            return $true
          }
        } finally { $resp.Close() }
      }
    } catch {}
    Write-Host -NoNewline '.'
    Start-Sleep -Seconds 1
  }
  Write-Host " - timeout waiting for $url"
  return $false
}

try {
  Set-Location $webDir

  if ($Mode -eq 'start') {
    Write-Host "[launch] Ensuring build."
    if (-not (Test-Path (Join-Path $webDir '.next'))) { npm run build }
    Write-Host "[launch] Starting production server."
    $args = @('run','start','--','--port', $Port, '--hostname','0.0.0.0')
  } else {
    Write-Host "[launch] Starting dev server."
    $args = @('run','dev','--','--port', $Port, '--hostname','0.0.0.0')
  }

  if (Test-Path $log) { Remove-Item $log -Force }
  New-Item -ItemType File -Path $log -Force | Out-Null
  $psi = New-Object System.Diagnostics.ProcessStartInfo
  $psi.FileName = $env:ComSpec
  $quotedLog = $log
  $psi.Arguments = '/c npm ' + ($args -join ' ') + ' >> "' + $quotedLog + '" 2>>&1'
  $psi.RedirectStandardOutput = $false
  $psi.RedirectStandardError = $false
  $psi.UseShellExecute = $false
  $psi.CreateNoWindow = $true
  $psi.WorkingDirectory = $webDir
  $proc = New-Object System.Diagnostics.Process
  $proc.StartInfo = $psi
  $null = $proc.Start()

  Write-Host "[launch] PID: $($proc.Id) (logs: $log)"
$url = "http://localhost:$Port"
  $ready = Wait-ForServer -url $url -timeoutSec 180

  Write-Host "[launch] Opening $url in default browser."
  Start-Process $url | Out-Null

  if ($Detach) { Write-Host '[launch] Detach enabled. Leaving server running and returning.'; return }


  if ($NoTail) {
    Write-Host "[launch] Not tailing logs (NoTail). Exiting and stopping server."
    Start-Sleep -Seconds 2
    if (-not $proc.HasExited) { try { $proc.Kill() } catch {} }
    return
  }

  Write-Host "[launch] Press Ctrl+C to stop. Tailing logs."
  try {
    Get-Content -Path $log -Wait -Tail 50
  } finally {
    if (-not $proc.HasExited) {
      Write-Host "[launch] Stopping (PID $($proc.Id))."
      try { $proc.Kill() } catch {}
    }

  }
}
catch {
  Write-Error $_
  exit 1
}




