<#
  push-to-github.ps1 - One-shot GitHub push helper.

  Usage:
    # Interactive (you'll be prompted):
    .\push-to-github.ps1

    # Non-interactive with a PAT:
    $env:GH_TOKEN = "ghp_xxx..." ; .\push-to-github.ps1

  After this script runs, the remote at
    https://github.com/zhaosenlin12-creator/MotionSites-Prompts.git
  will be in sync with your local master branch.
#>
[CmdletBinding()]
param(
  [string]$RemoteUrl = 'https://github.com/zhaosenlin12-creator/MotionSites-Prompts.git',
  [string]$Branch = 'master'
)

$ErrorActionPreference = 'Stop'
Set-Location (Split-Path -Parent $PSScriptRoot)

# Ensure git identity (bot default works for push but log it)
if (-not (git config user.email)) { git config user.email 'bot@example.com' }
if (-not (git config user.name))  { git config user.name  'Codex' }

# Set up remote
$existing = git remote get-url origin 2>$null
if ($LASTEXITCODE -ne 0) {
  git remote add origin $RemoteUrl
  Write-Host "Added remote origin -> $RemoteUrl" -ForegroundColor Cyan
} elseif ($existing -ne $RemoteUrl) {
  Write-Host "Remote origin already set to $existing" -ForegroundColor Yellow
}

# Resolve token: env var wins, else prompt
$token = $env:GH_TOKEN
if (-not $token) {
  $secure = Read-Host 'Enter GitHub Personal Access Token (input is hidden)' -AsSecureString
  $token = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure))
  if (-not $token) { throw 'No token provided.' }
}

# Embed token in the remote URL just for this push
$authUrl = $RemoteUrl -replace '^https://', "https://x-access-token:${token}@"
git push "$authUrl" "$Branch" 2>&1 | Tee-Object -FilePath push.log
if ($LASTEXITCODE -eq 0) {
  Write-Host ''
  Write-Host 'Push succeeded. Public URL:' -ForegroundColor Green
  Write-Host ("  https://github.com/zhaosenlin12-creator/MotionSites-Prompts") -ForegroundColor Green
} else {
  Write-Host 'Push failed. See push.log above.' -ForegroundColor Red
}
