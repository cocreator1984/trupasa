#!/usr/bin/env pwsh
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

try {
  $root = Resolve-Path (Join-Path $PSScriptRoot '..')
  $webDir = Resolve-Path (Join-Path $root 'web')
  Set-Location $webDir

  Write-Host "[build] Installing deps (npm ci/install)."
  if (Test-Path (Join-Path $webDir 'package-lock.json')) {
    npm ci
  } else {
    npm install
  }

  Write-Host "[build] Building Next.js app."
  npm run build
  Write-Host "[build] Done. Output in .next/"
}
catch {
  Write-Error $_
  exit 1
}