# Novalyte v5.3.3 Visual Cleanup Hotfix - Local Apply Commands

Run this in VS Code PowerShell after downloading `NOVALYTE_v5.3.3_VISUAL_CLEANUP_HOTFIX_20260709.zip`.

```powershell
$ErrorActionPreference = "Stop"
$base = "C:\Users\Ralph John\OneDrive\Desktop\ME FILES"
$project = Join-Path $base "Novalyte"
$downloads = Join-Path $env:USERPROFILE "Downloads"
$zipName = "NOVALYTE_v5.3.3_VISUAL_CLEANUP_HOTFIX_20260709.zip"
$downloadZip = Join-Path $downloads $zipName
$baseZip = Join-Path $base $zipName

Write-Host "=== NOVALYTE v5.3.3 VISUAL CLEANUP HOTFIX ===" -ForegroundColor Cyan

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
Select-String -Path .\index.html -Pattern "v=5.3.3|logo-clean.png|info-icon-digital|info-icon-message"
Select-String -Path .\admin.html -Pattern "v=5.3.3|logo-clean.png|data-toggle-login-credentials|logoutBtn"
Select-String -Path .\assets\css\styles.css -Pattern "v5.3.3 VISUAL CLEANUP|admin-mobile-nav-toggle|eye-btn.active::after|platform-pill"
Select-String -Path .\assets\css\mobile.css -Pattern "v5.3.3 mobile layout cleanup|grid-template-columns: 1fr|admin-nav-open"
Select-String -Path .\Documentation\NOVALYTE_FULL_PROJECT_HANDOVER_SUMMARY_v5_3_CHECKPOINT_20260708.txt -Pattern "V5.3.3 VISUAL CLEANUP HOTFIX|MANDATORY PATCH DEPLOYMENT SOP"

Write-Host "Opening local PC test pages..." -ForegroundColor Cyan
Start-Process (Join-Path $project "index.html")
Start-Process (Join-Path $project "admin.html")

Write-Host "Git status before push:" -ForegroundColor Cyan
git status --short

$changes = (git status --porcelain) -join "`n"
if ($changes.Trim().Length -gt 0) {
    git add -A
    git commit -m "Novalyte v5.3.3 visual cleanup hotfix"
    git push origin main
    Write-Host "GitHub push completed." -ForegroundColor Green
} else {
    Write-Host "No git changes detected after apply. Skipping commit/push." -ForegroundColor Yellow
}

Write-Host "Opening live GitHub Pages test links..." -ForegroundColor Cyan
Start-Process "https://potechto.github.io/boosting-menu/index.html?v=5331"
Start-Process "https://potechto.github.io/boosting-menu/admin.html?v=5331"

Set-Location $base
if (Test-Path $downloadZip) { Remove-Item $downloadZip -Force }
if (Test-Path $baseZip) { Remove-Item $baseZip -Force }
Set-Location $project

Write-Host "DONE. v5.3.3 applied, checked, local pages opened, GitHub pushed if changes existed, live pages opened, ZIP cleaned." -ForegroundColor Green
```

## Verification checklist

Desktop PC:
- Client home card icons are real UI icons, not emoji or blank boxes.
- What We Do section icons are real UI icons, not emoji.
- Logo is visible and centered in its container.
- Admin sidebar has no gray hamburger line above Dashboard.
- Admin sidebar note about localStorage/Supabase is gone.
- Platform names are no longer inside pill containers.
- Password/PIN eye icon shows slash only while hidden.

Phone:
- Header logo is visible and centered.
- Client hamburger opens at the current scroll position below the sticky header.
- Client hamburger menu uses one full-width row per navigation item.
- Admin hamburger menu uses one full-width row per navigation item and includes Logout.
- Digital Products and Messenger cards show icons.
- Platform name chips are flattened.
- Admin note is gone.
