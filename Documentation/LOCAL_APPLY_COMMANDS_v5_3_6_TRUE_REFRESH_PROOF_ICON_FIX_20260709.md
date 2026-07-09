# NOVALYTE v5.3.6 TRUE REFRESH-PROOF ICON FIX - LOCAL APPLY COMMANDS

Use this in VS Code PowerShell terminal.

```powershell
$ErrorActionPreference = "Stop"
$base = "C:\Users\Ralph John\OneDrive\Desktop\ME FILES"
$project = Join-Path $base "Novalyte"
$downloads = Join-Path $env:USERPROFILE "Downloads"
$zipName = "NOVALYTE_v5.3.6_TRUE_REFRESH_PROOF_ICON_FIX_20260709.zip"
$downloadZip = Join-Path $downloads $zipName
$baseZip = Join-Path $base $zipName

Write-Host "=== NOVALYTE v5.3.6 TRUE REFRESH-PROOF ICON FIX ===" -ForegroundColor Cyan

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

Expand-Archive -Path $baseZip -DestinationPath $project -Force
Write-Host "Patch extracted into main Novalyte folder." -ForegroundColor Green

Write-Host "Running JS syntax checks..." -ForegroundColor Cyan
node --check .\assets\js\data.js
node --check .\assets\js\store.js
node --check .\assets\js\app.js
node --check .\assets\js\admin.js

Write-Host "Running marker checks..." -ForegroundColor Cyan
Select-String -Path .\index.html -Pattern "v=5.3.6|data:image/png;base64|messenger-svg"
Select-String -Path .\admin.html -Pattern "v=5.3.6|data:image/png;base64|eye-svg-hidden|eye-svg-visible|digitalProductImageModal"
Select-String -Path .\assets\css\styles.css -Pattern "v5.3.6 TRUE REFRESH-PROOF ICON FIX|no external icon background dependencies|messenger-svg|eye-svg-visible"
Select-String -Path .\assets\css\mobile.css -Pattern "v5.3.6 TRUE REFRESH-PROOF MOBILE OVERRIDES|messenger-svg|eye-svg-visible"
Select-String -Path .\Documentation\NOVALYTE_FULL_PROJECT_HANDOVER_SUMMARY_v5_3_CHECKPOINT_20260708.txt -Pattern "V5.3.6 TRUE REFRESH-PROOF ICON FIX"

Write-Host "Checking for old external icon dependency markers that should NOT remain in active patch..." -ForegroundColor Cyan
$badMarkers = Select-String -Path .\index.html,.\admin.html -Pattern "logo-badge.png|logo-clean.png" -ErrorAction SilentlyContinue
if ($badMarkers) {
    $badMarkers | Format-Table Path,LineNumber,Line -AutoSize
    throw "Old logo asset dependency still found in HTML. Stop and inspect."
}

Write-Host "Opening local PC test pages..." -ForegroundColor Cyan
Start-Process (Join-Path $project "index.html")
Start-Process (Join-Path $project "admin.html")

Write-Host "Git status before push:" -ForegroundColor Cyan
git status --short

$changes = (git status --porcelain) -join "`n"
if ($changes.Trim().Length -gt 0) {
    git add -A
    git commit -m "Novalyte v5.3.6 true refresh-proof icon fix"
    git push origin main
    Write-Host "GitHub push completed." -ForegroundColor Green
} else {
    Write-Host "No git changes detected after apply. Skipping commit/push." -ForegroundColor Yellow
}

Write-Host "Opening live GitHub Pages test links..." -ForegroundColor Cyan
Start-Process "https://potechto.github.io/boosting-menu/index.html?v=5361"
Start-Process "https://potechto.github.io/boosting-menu/admin.html?v=5361"

Write-Host "Live marker check. GitHub Pages may need a few seconds to update." -ForegroundColor Cyan
Start-Sleep -Seconds 10
try {
    $liveIndex = Invoke-WebRequest "https://potechto.github.io/boosting-menu/index.html?v=5361" -UseBasicParsing
    $liveAdmin = Invoke-WebRequest "https://potechto.github.io/boosting-menu/admin.html?v=5361" -UseBasicParsing

    if ($liveIndex.Content -notmatch "v=5.3.6" -or $liveIndex.Content -notmatch "data:image/png;base64") {
        Write-Host "WARNING: live index may still be cached/not updated. Wait 30 seconds then reopen ?v=5361." -ForegroundColor Yellow
    } else {
        Write-Host "Live index marker v5.3.6 + embedded logo detected." -ForegroundColor Green
    }

    if ($liveAdmin.Content -notmatch "v=5.3.6" -or $liveAdmin.Content -notmatch "data:image/png;base64") {
        Write-Host "WARNING: live admin may still be cached/not updated. Wait 30 seconds then reopen ?v=5361." -ForegroundColor Yellow
    } else {
        Write-Host "Live admin marker v5.3.6 + embedded logo detected." -ForegroundColor Green
    }
} catch {
    Write-Host "Live marker check failed or GitHub Pages is still updating. Reopen the ?v=5361 links after 30 seconds." -ForegroundColor Yellow
}

Set-Location $base
if (Test-Path $downloadZip) { Remove-Item $downloadZip -Force }
if (Test-Path $baseZip) { Remove-Item $baseZip -Force }
Set-Location $project

Write-Host "DONE. v5.3.6 applied, checked, local pages opened, GitHub pushed if changes existed, live pages opened, ZIP cleaned." -ForegroundColor Green
```

## Verification checklist
- Refresh client page after first load: logo stays visible.
- Refresh admin login after first load: logo stays visible.
- Refresh client page: Messenger icon does not turn into a blank box.
- Refresh admin login: eye icon stays visible inside the PIN field.
- What We Do remains plain text without feature icons.
- Digital product image preview still opens as centered modal with X close.
- Live links use only ?v=5361 for this checkpoint.
