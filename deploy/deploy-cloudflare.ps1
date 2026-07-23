<#
  deploy-cloudflare.ps1 - One-shot Cloudflare Pages deploy helper.

  Step 1: Create the project (one-time) at
    https://dash.cloudflare.com/?to=/:account/pages/new
    * Project name:  motionsites-prompts
    * Build command: (leave empty)
    * Build output:  /
    * Click "Create"

  Step 2: Get your Cloudflare API token at
    https://dash.cloudflare.com/profile/api-tokens
    Template: "Edit Cloudflare Pages"

  Step 3: Run this script with the token + account id.

  After deploy, the site will be at
    https://motionsites-prompts.pages.dev
#>
[CmdletBinding()]
param(
  [string]$ProjectName = 'motionsites-prompts',
  [string]$Branch = 'master',
  [string]$ApiToken = $env:CF_API_TOKEN,
  [string]$AccountId = $env:CF_ACCOUNT_ID
)

$ErrorActionPreference = 'Stop'
Set-Location (Split-Path -Parent $PSScriptRoot)

if (-not $ApiToken) {
  $secure = Read-Host 'Cloudflare API token (hidden)' -AsSecureString
  $ApiToken = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure))
}
if (-not $AccountId) {
  $AccountId = Read-Host 'Cloudflare Account ID (visible, find in dashboard URL)'
}

# Direct upload via the Pages REST API: returns immediately and is the
# fastest way to publish a fully pre-built static site without CI.
$zipPath = Join-Path $env:TEMP "pages-upload-$ProjectName.zip"
if (Test-Path $zipPath) { Remove-Item $zipPath }
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::CreateFromDirectory((Get-Location).Path, $zipPath)

$url = "https://api.cloudflare.com/client/v4/accounts/$AccountId/pages/projects/$ProjectName/deployments"
Write-Host "Uploading $zipPath to $url ..." -ForegroundColor Cyan
$headers = @{
  Authorization = "Bearer $ApiToken"
}
$form = @{
  manifest = (Get-ChildItem -Recurse -File | ForEach-Object { "{0,-12} {1}" -f $_.Length ($_.FullName.Substring((Get-Location).Path.Length + 1) -replace '\\','/') }) -join "`n"
}
# Direct Upload with a zip body
$resp = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -InFile $zipPath -ContentType 'application/zip'
$resp | ConvertTo-Json -Depth 4
if ($resp.success) {
  Write-Host ''
  Write-Host "Live at https://$ProjectName.pages.dev" -ForegroundColor Green
  Write-Host "Deploy id: $($resp.result.id)" -ForegroundColor Green
}
