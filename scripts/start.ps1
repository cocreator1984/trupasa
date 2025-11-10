#!/usr/bin/env pwsh
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

param(
  [string]$Port = $env:PORT
)
if (-not $Port) { $Port = '3000' }

try {
  $root = Resolve-Path (Join-Path $PSScriptRoot '..')
  $webDir = Resolve-Path (Join-Path $root 'web')
  Set-Location $webDir
  Write-Host "[start] Starting on http://localhost:$Port (Next.js prod server)."
  npm run start -- --port $Port --hostname 0.0.0.0
}
catch {
  Write-Error $_
  exit 1
}