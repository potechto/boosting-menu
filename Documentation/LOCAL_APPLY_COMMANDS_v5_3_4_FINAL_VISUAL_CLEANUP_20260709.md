# NOVALYTE v5.3.4 FINAL VISUAL CLEANUP — LOCAL APPLY COMMANDS

Use this in VS Code PowerShell.

```powershell
$ErrorActionPreference = "Stop"
$base = "C:\Users\Ralph John\OneDrive\Desktop\ME FILES"
$project = Join-Path $base "Novalyte"
$downloads = Join-Path $env:USERPROFILE "Downloads"
$zipName = "NOVALYTE_v5.3.4_FINAL_VISUAL_CLEANUP_20260709.zip"
$downloadZip = Join-Path $downloads $zipName
$baseZip = Join-Path $base $zipName

Write-Host "=== NOVALYTE v5.3.4 FINAL VISUAL CLEANUP ===" -ForegroundColor Cyan

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
Select-String -Path .\index.html -Pattern "v=5.3.4|logo-badge.png|messenger-icon.png"
Select-String -Path .\admin.html -Pattern "v=5.3.4|logo-badge.png|digitalProductImageModal"
Select-String -Path .\assets\css\styles.css -Pattern "v5.3.4 FINAL VISUAL CLEANUP|messenger-icon.png|eye-hidden.png|eye-visible.png"
Select-String -Path .\assets\css\mobile.css -Pattern "v5.3.4 mobile cleanup overrides|eye-hidden.png|eye-visible.png"
Select-String -Path .\Documentation\NOVALYTE_FULL_PROJECT_HANDOVER_SUMMARY_v5_3_CHECKPOINT_20260708.txt -Pattern "V5.3.4 FINAL VISUAL CLEANUP"

Write-Host "Opening local PC test pages..." -ForegroundColor Cyan
Start-Process (Join-Path $project "index.html")
Start-Process (Join-Path $project "admin.html")

Write-Host "Git status before push:" -ForegroundColor Cyan
git status --short

$changes = (git status --porcelain) -join "`n"
if ($changes.Trim().Length -gt 0) {
    git add -A
    git commit -m "Novalyte v5.3.4 final visual cleanup"
    git push origin main
    Write-Host "GitHub push completed." -ForegroundColor Green
} else {
    Write-Host "No git changes detected after apply. Skipping commit/push." -ForegroundColor Yellow
}

Write-Host "Opening live GitHub Pages test links..." -ForegroundColor Cyan
Start-Process "https://potechto.github.io/boosting-menu/index.html?v=5341"
Start-Process "https://potechto.github.io/boosting-menu/admin.html?v=5341"

Set-Location $base
if (Test-Path $downloadZip) { Remove-Item $downloadZip -Force }
if (Test-Path $baseZip) { Remove-Item $baseZip -Force }
Set-Location $project

Write-Host "DONE. v5.3.4 applied, checked, local pages opened, GitHub pushed if changes existed, live pages opened, ZIP cleaned." -ForegroundColor Green
```

## Verification checklist
- Client header logo displays on desktop and mobile (no N fallback).
- Admin login logo and sidebar logo display on desktop and mobile.
- Messenger card icon uses the cleaner Messenger-style icon.
- What We Do cards show plain text headings/content without icons.
- Eye toggle is smaller, inside the PIN field, hidden=slash, shown=no slash.
- Login footnote/prototype note is gone.
- Digital product image preview opens in centered modal with X close button.
- Desktop layout remains intact and mobile nav remains one item per row.
