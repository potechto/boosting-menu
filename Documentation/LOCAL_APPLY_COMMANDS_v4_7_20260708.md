# Local Apply Commands - Novalyte v4.7

Use this one-paste PowerShell command after downloading `NOVALYTE_v4.7_FEEDBACK_SINGLE_SUBMISSION_CLEAN_EDIT_20260708.zip`.

```powershell
$ErrorActionPreference = "Stop"

$base = "C:\Users\Ralph John\OneDrive\Desktop\ME FILES"
$project = Join-Path $base "Novalyte"
$downloads = Join-Path $env:USERPROFILE "Downloads"
$zipName = "NOVALYTE_v4.7_FEEDBACK_SINGLE_SUBMISSION_CLEAN_EDIT_20260708.zip"
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

Select-String -Path ".\index.html" -Pattern "Share Your Feedback","Submit Feedback"
Select-String -Path ".\assets\js\app.js" -Pattern "phnova-00A1","combinedPublicReviews","Submit Feedback"
Select-String -Path ".\assets\js\store.js" -Pattern "phnova-00A","nextReviewId"
Select-String -Path ".\admin.html" -Pattern "serviceVisible","serviceArchived"
Select-String -Path ".\Documentation\V4_7_FEEDBACK_SINGLE_SUBMISSION_CLEAN_EDIT_NOTES.md" -Pattern "Feedback Single Submission"

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

Write-Host "DONE: Novalyte v4.7 updated, verified, opened client/admin views, and patch ZIP cleaned from Downloads + ME FILES."
```
