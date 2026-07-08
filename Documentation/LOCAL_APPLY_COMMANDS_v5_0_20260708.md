# Local Apply Commands - Novalyte v5.0

Download `NOVALYTE_v5.0_LAUNCH_HARDENING_RESPONSIVE_POLISH_20260708.zip`, then paste this entire PowerShell block once.

```powershell
$ErrorActionPreference = "Stop"

$base = "C:\Users\Ralph John\OneDrive\Desktop\ME FILES"
$project = Join-Path $base "Novalyte"
$downloads = Join-Path $env:USERPROFILE "Downloads"
$zipName = "NOVALYTE_v5.0_LAUNCH_HARDENING_RESPONSIVE_POLISH_20260708.zip"
$downloadZip = Join-Path $downloads $zipName
$baseZip = Join-Path $base $zipName

Set-Location $base

if (!(Test-Path $downloadZip) -and !(Test-Path $baseZip)) {
    Write-Host "ERROR: Patch ZIP not found in Downloads or ME FILES:"
    Write-Host $zipName
    exit
}

if (Test-Path $downloadZip) {
    Copy-Item $downloadZip $baseZip -Force
    Write-Host "Copied patch from Downloads to ME FILES."
}

if (!(Test-Path $project)) {
    New-Item -ItemType Directory -Path $project | Out-Null
    Write-Host "Created project folder."
}

Expand-Archive -Path $baseZip -DestinationPath $project -Force
Write-Host "Patch applied to main Novalyte folder."

Set-Location $project

node --check ".\assets\js\data.js"
node --check ".\assets\js\store.js"
node --check ".\assets\js\app.js"
node --check ".\assets\js\admin.js"

Select-String -Path ".\index.html" -Pattern "mobileNavToggle","primaryNav","A cleaner way to browse"
Select-String -Path ".\admin.html" -Pattern "brand-logo-img","Resources/Icons/logo.png"
Select-String -Path ".\assets\js\app.js" -Pattern "setupBrandLogos","toggleMobileNav","v5.0"
Select-String -Path ".\assets\css\styles.css" -Pattern "v5.0 launch hardening","client-nav-open","mobile-nav-toggle"
if (!(Test-Path ".\Resources\Icons\logo.png")) { Write-Host "ERROR: logo.png was not applied."; exit }
Select-String -Path ".\Documentation\V5_0_LAUNCH_HARDENING_RESPONSIVE_POLISH_NOTES.md" -Pattern "Launch Hardening"

Start-Process ".\index.html"
Start-Process ".\admin.html"

Set-Location $base

if (Test-Path $downloadZip) {
    Remove-Item $downloadZip -Force
    Write-Host "Deleted Downloads patch ZIP."
}

if (Test-Path $baseZip) {
    Remove-Item $baseZip -Force
    Write-Host "Deleted ME FILES patch ZIP."
}

Set-Location $project

Write-Host "DONE: Novalyte v5.0 updated, verified, opened client/admin views, and patch ZIP cleaned from Downloads + ME FILES."
```
