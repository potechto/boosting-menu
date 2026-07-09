# NOVALYTE v5.3.11 PUBLIC REVIEW + VIEWPORT NAV FIX

Use this in VS Code PowerShell.

```powershell
$ErrorActionPreference = "Stop"
$base = "C:\Users\Ralph John\OneDrive\Desktop\ME FILES"
$project = Join-Path $base "Novalyte"
$downloads = Join-Path $env:USERPROFILE "Downloads"
$zipName = "NOVALYTE_v5.3.11_PUBLIC_REVIEW_VIEWPORT_NAV_FIX_20260709.zip"
$downloadZip = Join-Path $downloads $zipName
$baseZip = Join-Path $base $zipName

Write-Host "=== NOVALYTE v5.3.11 PUBLIC REVIEW + VIEWPORT NAV FIX ===" -ForegroundColor Cyan

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
Write-Host "Patch extracted into main Novalyte folder. Your novalyte.png is not included in this ZIP, so it was not overwritten." -ForegroundColor Green

Write-Host "Running JS syntax checks..." -ForegroundColor Cyan
node --check .\assets\js\data.js
node --check .\assets\js\store.js
node --check .\assets\js\app.js
node --check .\assets\js\admin.js

Write-Host "Running marker checks..." -ForegroundColor Cyan
Select-String -Path .\index.html -Pattern "v=5.3.11|Resources/Brand/novalyte.png"
Select-String -Path .\admin.html -Pattern "v=5.3.11|Resources/Brand/novalyte.png|adminConfirmModal"
Select-String -Path .\assets\js\app.js -Pattern "Pnovalyte001|They responded quickly|client-floating-nav|updateClientNavViewportPosition"
Select-String -Path .\assets\css\styles.css -Pattern "v5.3.11 PUBLIC REVIEW \+ VIEWPORT NAV FIX|client-floating-nav"
Select-String -Path .\assets\css\mobile.css -Pattern "v5.3.11 viewport-safe client hamburger dropdown|client-floating-nav"
Select-String -Path .\Documentation\NOVALYTE_FULL_PROJECT_HANDOVER_SUMMARY_v5_3_CHECKPOINT_20260708.txt -Pattern "V5.3.11 PUBLIC REVIEW \+ VIEWPORT NAV FIX"

Write-Host "Checking that old generated/base64 logo is not used in HTML..." -ForegroundColor Cyan
$badLogoMarkers = Select-String -Path .\index.html,.\admin.html -Pattern "data:image/png;base64|logo-badge.png|logo-clean.png" -ErrorAction SilentlyContinue
if ($badLogoMarkers) {
    $badLogoMarkers | Format-Table Path,LineNumber,Line -AutoSize
    throw "Old embedded/generated logo marker still found. Stop and inspect."
}

Write-Host "Checking that no raw browser confirm fallback remains..." -ForegroundColor Cyan
$badConfirmMarkers = Select-String -Path .\assets\js\admin.js -Pattern "window\.confirm|\bconfirm\s*\(" -ErrorAction SilentlyContinue
$badConfirmMarkers = @(
    $badConfirmMarkers | Where-Object {
        $_.Line -notmatch "adminConfirm\s*\(" -and
        $_.Line.Trim() -notmatch "^//" -and
        $_.Line.Trim() -notmatch "^\*" -and
        $_.Line -notmatch "browser confirmation dialogs"
    }
)
if ($badConfirmMarkers.Count -gt 0) {
    $badConfirmMarkers | Format-Table Path,LineNumber,Line -AutoSize
    throw "Actual raw browser confirm call still found. Stop and inspect."
}
Write-Host "No actual raw browser confirm calls found." -ForegroundColor Green

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
    git commit -m "Novalyte v5.3.11 public review viewport nav fix"
    git push origin main
    Write-Host "GitHub push completed." -ForegroundColor Green
} else {
    Write-Host "No git changes detected after apply. Skipping commit/push." -ForegroundColor Yellow
}

Write-Host "Opening live GitHub Pages test links..." -ForegroundColor Cyan
Start-Process "https://potechto.github.io/boosting-menu/index.html?v=53111"
Start-Process "https://potechto.github.io/boosting-menu/admin.html?v=53111"

Write-Host "Live marker check. GitHub Pages may need a few seconds to update." -ForegroundColor Cyan
Start-Sleep -Seconds 10
try {
    $liveIndex = Invoke-WebRequest "https://potechto.github.io/boosting-menu/index.html?v=53111" -UseBasicParsing
    $liveAdmin = Invoke-WebRequest "https://potechto.github.io/boosting-menu/admin.html?v=53111" -UseBasicParsing

    if ($liveIndex.Content -notmatch "v=5.3.11" -or $liveIndex.Content -notmatch "Pnovalyte001") {
        Write-Host "WARNING: live index may still be cached/not updated. Wait 30 seconds then reopen ?v=53111." -ForegroundColor Yellow
    } else {
        Write-Host "Live index marker v5.3.11 + public review detected." -ForegroundColor Green
    }

    if ($liveAdmin.Content -notmatch "v=5.3.11") {
        Write-Host "WARNING: live admin may still be cached/not updated. Wait 30 seconds then reopen ?v=53111." -ForegroundColor Yellow
    } else {
        Write-Host "Live admin marker v5.3.11 detected." -ForegroundColor Green
    }
} catch {
    Write-Host "Live marker check failed or GitHub Pages is still updating. Reopen the ?v=53111 links after 30 seconds." -ForegroundColor Yellow
}

Set-Location $base
if (Test-Path $downloadZip) { Remove-Item $downloadZip -Force }
if (Test-Path $baseZip) { Remove-Item $baseZip -Force }
Set-Location $project

Write-Host "DONE. v5.3.11 applied, checked, local pages opened, GitHub pushed if changes existed, live pages opened, ZIP cleaned." -ForegroundColor Green
```
