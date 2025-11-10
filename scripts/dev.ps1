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
  Write-Host "[dev] Starting dev server on http://localhost:$Port ."
  # Use explicit long flags to avoid shell parsing differences
  npm run dev -- --port $Port --hostname 0.0.0.0
}
catch {
  Write-Error $_
  exit 1
}