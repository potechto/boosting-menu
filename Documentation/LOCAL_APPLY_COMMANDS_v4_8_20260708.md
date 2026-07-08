# Local Apply Command - Novalyte v4.8

Use this after downloading `NOVALYTE_v4.8_COMPACT_DETAIL_SCALE_20260708.zip`.

```powershell
$ErrorActionPreference = "Stop"

$base = "C:\Users\Ralph John\OneDrive\Desktop\ME FILES"
$project = Join-Path $base "Novalyte"
$downloads = Join-Path $env:USERPROFILE "Downloads"
$zipName = "NOVALYTE_v4.8_COMPACT_DETAIL_SCALE_20260708.zip"
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

Select-String -Path ".\assets\css\styles.css" -Pattern "v4.8 compact detail scale","review-form .textarea","detail-row"
Select-String -Path ".\Documentation\V4_8_COMPACT_DETAIL_SCALE_NOTES.md" -Pattern "Compact Detail Scale"
Select-String -Path ".\assets\js\app.js" -Pattern "phnova-00A1","combinedPublicReviews","Submit Feedback"

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

Write-Host "DONE: Novalyte v4.8 updated, verified, opened client/admin views, and patch ZIP cleaned from Downloads + ME FILES."
```
