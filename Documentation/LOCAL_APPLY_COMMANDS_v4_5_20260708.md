# Novalyte v4.5 Local Apply Commands

Use these from PowerShell after downloading the ZIP into:

```powershell
C:\Users\Ralph John\OneDrive\Desktop\ME FILES
```

## Apply the ZIP, verify, then delete the ZIP

```powershell
cd "C:\Users\Ralph John\OneDrive\Desktop\ME FILES"
$zip = ".\NOVALYTE_v4.5_LAUNCH_READY_20260708.zip"
$target = ".\Novalyte"
if (!(Test-Path $target)) { New-Item -ItemType Directory -Path $target | Out-Null }
Expand-Archive -Path $zip -DestinationPath $target -Force
cd $target
node --check ".\assets\js\data.js"
node --check ".\assets\js\store.js"
node --check ".\assets\js\app.js"
node --check ".\assets\js\admin.js"
Select-String -Path ".\index.html" -Pattern "Novalyte Digital Growth Portal","Digital Growth Solutions"
Select-String -Path ".\admin.html" -Pattern "ordersSummaryGrid"
Select-String -Path ".\assets\js\admin.js" -Pattern "renderOrderSummary"
Select-String -Path ".\Documentation\V4_5_LAUNCH_READY_WRAPUP_NOTES.md" -Pattern "Launch-Ready Wrapup"
Remove-Item $zip -Force
```

## Open locally

```powershell
start ".\index.html"
start ".\admin.html"
```

## Commit and push after browser review

```powershell
git status
git add -A
git commit -m "Novalyte v4.5 launch ready wrapup"
git push origin main
git status
```
