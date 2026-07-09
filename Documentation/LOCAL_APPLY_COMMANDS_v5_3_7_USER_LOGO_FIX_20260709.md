# NOVALYTE v5.3.7 USER-MANAGED TRANSPARENT LOGO FIX

Use this in VS Code PowerShell.

```powershell
$ErrorActionPreference = "Stop"
$base = "C:\Users\Ralph John\OneDrive\Desktop\ME FILES"
$project = Join-Path $base "Novalyte"
$downloads = Join-Path $env:USERPROFILE "Downloads"
$zipName = "NOVALYTE_v5.3.7_USER_TRANSPARENT_LOGO_FIX_20260709.zip"
$downloadZip = Join-Path $downloads $zipName
$baseZip = Join-Path $base $zipName

Write-Host "=== NOVALYTE v5.3.7 USER TRANSPARENT LOGO FIX ===" -ForegroundColor Cyan

if (Test-Path $downloadZip) {
    Copy-Item $downloadZip $baseZip -Force
    Write-Host "Patch ZIP copied from Downloads to ME FILES." -ForegroundColor Green
} elseif (Test-Path $baseZip) {
    Write-Host "Patch ZIP already found in ME FILES." -ForegroundColor Green
} else {
    throw "Patch ZIP not found. Put $zipName in Downloads or ME FILES first."
}

if (!(Test-Path $project)) {
    throw "Project folder not found: $project"
}

Set-Location $project

Write-Host "Checking your updated transparent logo before patch apply..." -ForegroundColor Cyan
if (!(Test-Path .\Resources\Brand\novalyte.png)) {
    throw "Your updated logo is missing: Resources\Brand\novalyte.png"
}

Expand-Archive -Path $baseZip -DestinationPath $project -Force
Write-Host "Patch extracted into main Novalyte folder. Your novalyte.png was NOT included in the ZIP, so it was not overwritten." -ForegroundColor Green

Write-Host "Running JS syntax checks..." -ForegroundColor Cyan
node --check .\assets\js\data.js
node --check .\assets\js\store.js
node --check .\assets\js\app.js
node --check .\assets\js\admin.js

Write-Host "Running marker checks..." -ForegroundColor Cyan
Select-String -Path .\index.html -Pattern "v=5.3.7|Resources/Brand/novalyte.png"
Select-String -Path .\admin.html -Pattern "v=5.3.7|Resources/Brand/novalyte.png|digitalProductImageModal"
Select-String -Path .\assets\css\styles.css -Pattern "v5.3.7 USER-MANAGED TRANSPARENT LOGO FIX|user-managed at Resources/Brand/novalyte.png"
Select-String -Path .\assets\css\mobile.css -Pattern "v5.3.7 user-managed transparent logo mobile fix"
Select-String -Path .\Documentation\NOVALYTE_FULL_PROJECT_HANDOVER_SUMMARY_v5_3_CHECKPOINT_20260708.txt -Pattern "V5.3.7 USER-MANAGED TRANSPARENT LOGO FIX"

Write-Host "Checking that old embedded/base64 logo is gone from HTML..." -ForegroundColor Cyan
$badLogoMarkers = Select-String -Path .\index.html,.\admin.html -Pattern "data:image/png;base64|logo-badge.png|logo-clean.png" -ErrorAction SilentlyContinue
if ($badLogoMarkers) {
    $badLogoMarkers | Format-Table Path,LineNumber,Line -AutoSize
    throw "Old embedded/generated logo marker still found. Stop and inspect."
}

Write-Host "Force-adding your updated transparent logo so GitHub Pages receives it..." -ForegroundColor Cyan
git add -f .\Resources\Brand\novalyte.png

Write-Host "Opening local PC test pages..." -ForegroundColor Cyan
Start-Process (Join-Path $project "index.html")
Start-Process (Join-Path $project "admin.html")

Write-Host "Git status before push:" -ForegroundColor Cyan
git status --short

$changes = (git status --porcelain) -join "`n"
if ($changes.Trim().Length -gt 0) {
    git add -A
    git add -f .\Resources\Brand\novalyte.png
    git commit -m "Novalyte v5.3.7 user transparent logo fix"
    git push origin main
    Write-Host "GitHub push completed." -ForegroundColor Green
} else {
    Write-Host "No git changes detected after apply. Skipping commit/push." -ForegroundColor Yellow
}

Write-Host "Opening live GitHub Pages test links..." -ForegroundColor Cyan
Start-Process "https://potechto.github.io/boosting-menu/index.html?v=5371"
Start-Process "https://potechto.github.io/boosting-menu/admin.html?v=5371"

Write-Host "Live marker check. GitHub Pages may need a few seconds to update." -ForegroundColor Cyan
Start-Sleep -Seconds 10
try {
    $liveIndex = Invoke-WebRequest "https://potechto.github.io/boosting-menu/index.html?v=5371" -UseBasicParsing
    $liveAdmin = Invoke-WebRequest "https://potechto.github.io/boosting-menu/admin.html?v=5371" -UseBasicParsing
    $liveLogo = Invoke-WebRequest "https://potechto.github.io/boosting-menu/Resources/Brand/novalyte.png?v=5371" -UseBasicParsing

    if ($liveIndex.Content -notmatch "v=5.3.7" -or $liveIndex.Content -notmatch "Resources/Brand/novalyte.png") {
        Write-Host "WARNING: live index may still be cached/not updated. Wait 30 seconds then reopen ?v=5371." -ForegroundColor Yellow
    } else {
        Write-Host "Live index marker v5.3.7 + novalyte.png reference detected." -ForegroundColor Green
    }

    if ($liveAdmin.Content -notmatch "v=5.3.7" -or $liveAdmin.Content -notmatch "Resources/Brand/novalyte.png") {
        Write-Host "WARNING: live admin may still be cached/not updated. Wait 30 seconds then reopen ?v=5371." -ForegroundColor Yellow
    } else {
        Write-Host "Live admin marker v5.3.7 + novalyte.png reference detected." -ForegroundColor Green
    }

    if ($liveLogo.StatusCode -eq 200) {
        Write-Host "Live logo asset is reachable: Resources/Brand/novalyte.png" -ForegroundColor Green
    }
} catch {
    Write-Host "Live marker/logo check failed or GitHub Pages is still updating. Reopen the ?v=5371 links after 30 seconds." -ForegroundColor Yellow
}

Set-Location $base
if (Test-Path $downloadZip) { Remove-Item $downloadZip -Force }
if (Test-Path $baseZip) { Remove-Item $baseZip -Force }
Set-Location $project

Write-Host "DONE. v5.3.7 applied, checked, local pages opened, GitHub pushed if changes existed, live pages opened, ZIP cleaned." -ForegroundColor Green
```
