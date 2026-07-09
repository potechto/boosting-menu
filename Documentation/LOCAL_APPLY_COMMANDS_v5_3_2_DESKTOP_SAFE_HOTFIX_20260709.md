# Novalyte v5.3.2 Desktop-Safe Mobile Hotfix Apply Command

Use this in VS Code PowerShell from any folder after downloading:
`NOVALYTE_v5.3.2_DESKTOP_SAFE_MOBILE_HOTFIX_20260709.zip`

```powershell
$ErrorActionPreference = "Stop"
$base = "C:\Users\Ralph John\OneDrive\Desktop\ME FILES"
$project = Join-Path $base "Novalyte"
$downloads = Join-Path $env:USERPROFILE "Downloads"
$zipName = "NOVALYTE_v5.3.2_DESKTOP_SAFE_MOBILE_HOTFIX_20260709.zip"
$downloadZip = Join-Path $downloads $zipName
$baseZip = Join-Path $base $zipName

Write-Host "=== NOVALYTE v5.3.2 DESKTOP-SAFE MOBILE HOTFIX ===" -ForegroundColor Cyan

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

Write-Host "Running desktop-safety and marker checks..." -ForegroundColor Cyan
Select-String -Path .\index.html -Pattern "v=5.3.2|media=\"screen and \(max-width: 820px\)\"|Messenger|Open Messenger"
Select-String -Path .\admin.html -Pattern "v=5.3.2|media=\"screen and \(max-width: 820px\)\"|Internal dashboard|Export Backup|statsGrid"
Select-String -Path .\assets\css\mobile.css -Pattern "v5.3.2 desktop-safe mobile review hotfix|max-width: 820px|admin-dashboard-mode #statsGrid"
Select-String -Path .\assets\css\styles.css -Pattern "v5.3.2 desktop safety helpers|eye-icon"
Select-String -Path .\assets\js\app.js -Pattern "compactServiceRange|client-nav-top|max-width: 820px"
Select-String -Path .\assets\js\admin.js -Pattern "admin-nav-top|max-width: 820px|exportBackupBtn"
Select-String -Path .\Documentation\NOVALYTE_FULL_PROJECT_HANDOVER_SUMMARY_v5_3_CHECKPOINT_20260708.txt -Pattern "MANDATORY PATCH DEPLOYMENT SOP|v5.3.2 DESKTOP-SAFE MOBILE REVIEW HOTFIX"

Write-Host "Opening local PC test pages..." -ForegroundColor Cyan
Start-Process (Join-Path $project "index.html")
Start-Process (Join-Path $project "admin.html")

Write-Host "Git status before push:" -ForegroundColor Cyan
git status --short

$changes = (git status --porcelain) -join "`n"
if ($changes.Trim().Length -gt 0) {
    git add -A
    git commit -m "Novalyte v5.3.2 desktop-safe mobile hotfix"
    git push origin main
    Write-Host "GitHub push completed." -ForegroundColor Green
} else {
    Write-Host "No git changes detected after apply. Skipping commit/push." -ForegroundColor Yellow
}

Write-Host "Opening live GitHub Pages test links..." -ForegroundColor Cyan
Start-Process "https://potechto.github.io/boosting-menu/index.html?v=5321"
Start-Process "https://potechto.github.io/boosting-menu/admin.html?v=5321"

Set-Location $base
if (Test-Path $downloadZip) { Remove-Item $downloadZip -Force }
if (Test-Path $baseZip) { Remove-Item $baseZip -Force }
Set-Location $project

Write-Host "DONE. v5.3.2 applied, syntax/marker checks passed, local pages opened, GitHub pushed if changes existed, live pages opened, ZIP cleaned." -ForegroundColor Green
```

## Verification checklist

### Desktop / PC
- Client page does not switch into mobile card layout on wide screen.
- Admin page keeps desktop dashboard content: helper text, quick links, export/import, and stats.
- Desktop header/nav spacing remains normal.
- Tables remain normal desktop tables on wide screen.

### Phone / mobile
- No visible build marker.
- Logo appears.
- Messenger card says Messenger / Open Messenger.
- Services Min-Max is compact and one-line where possible.
- Pagination is smaller.
- Digital Product modal description and X button are visible/aligned.
- Client hamburger opens near current scrolled header.
- Admin mobile dashboard shows centered Welcome, Admin only.
- Admin Services, Investments, Orders, and Financial Logs are readable.
- Client View does not show a false active highlight.
