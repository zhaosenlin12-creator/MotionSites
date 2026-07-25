<#
  deploy-wrangler.ps1 - Build a clean upload tree and run `wrangler pages deploy` on it.

  Excludes .git, .wrangler, .rollback, node_modules, and any file over 25 MiB
  (Cloudflare Pages hard limit per file).
#>
[CmdletBinding()]
param(
  [string]$ProjectName   = 'motionsites-prompts',
  [string]$Branch        = 'master',
  [string]$CommitHash    = '',
  [string]$CommitMessage = ''
)

$ErrorActionPreference = 'Stop'
Set-Location (Split-Path -Parent $PSScriptRoot)

$excludeNames = @('.git', '.rollback', '.wrangler', 'node_modules')
$maxUploadBytes = 25MB
$stagingRoot = Join-Path $env:TEMP ("pages-stage-$ProjectName-" + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $stagingRoot | Out-Null

function Copy-PagesTree {
  param(
    [Parameter(Mandatory=$true)][string]$Source,
    [Parameter(Mandatory=$true)][string]$Destination
  )
  New-Item -ItemType Directory -Path $Destination -Force | Out-Null
  foreach ($entry in Get-ChildItem -LiteralPath $Source -Force) {
    if ($excludeNames -contains $entry.Name) { continue }
    $targetPath = Join-Path $Destination $entry.Name
    if ($entry.PSIsContainer) {
      Copy-PagesTree -Source $entry.FullName -Destination $targetPath
      continue
    }
    if ($entry.Length -gt $maxUploadBytes) {
      Write-Host ("Skipping oversize file: {0} [{1} MiB]" -f $entry.FullName, [Math]::Round($entry.Length/1MB,2)) -ForegroundColor Yellow
      continue
    }
    Copy-Item -LiteralPath $entry.FullName -Destination $targetPath -Force
  }
}

# Resolve wrangler binary (avoids npx picking a different `pages` package).
$wranglerCmd = 'C:\\Users\\Administrator\\AppData\\Local\\npm-cache\\_npx\\32026684e21afda6\\node_modules\\.bin\\wrangler.cmd'
if (-not (Test-Path $wranglerCmd)) {
  $fromPath = (Get-Command wrangler.cmd -ErrorAction SilentlyContinue).Source
  if ($fromPath) { $wranglerCmd = $fromPath } else { throw "wrangler binary not found" }
}

try {
  Copy-PagesTree -Source (Get-Location).Path -Destination $stagingRoot

  $wranglerArgs = @(
    'pages','deploy',$stagingRoot,
    '--project-name',$ProjectName,
    '--branch',$Branch,
    '--commit-dirty=true'
  )
  if ($CommitHash)    { $wranglerArgs += @('--commit-hash',$CommitHash) }
  if ($CommitMessage) { $wranglerArgs += @('--commit-message',$CommitMessage) }

  Write-Host ("Running: {0} {1}" -f $wranglerCmd, ($wranglerArgs -join ' ')) -ForegroundColor Cyan
  & $wranglerCmd @wranglerArgs
  if ($LASTEXITCODE -ne 0) { throw "wrangler pages deploy failed (exit $LASTEXITCODE)" }
}
finally {
  if (Test-Path $stagingRoot) { Remove-Item $stagingRoot -Recurse -Force }
}
