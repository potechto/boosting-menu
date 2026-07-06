# Novalyte Boosting Menu + Admin Tracker

Static GitHub Pages prototype for a client-facing service menu and an internal admin tracker.

## Live pages

- Client page: `index.html`
- Admin page: `admin.html`

## v1.1 cleanup features

- Responsive client-facing service menu
- Admin login with password/PIN eye viewer
- Presentable modals for service editing, order creation, void confirmation, and order details
- Provider price stays inside admin only
- Client visible price controls public pricing
- Create order button per service
- Order price snapshot per order
- Automatic provider charge, client charge, and revenue calculation
- Investment log with notes
- Dashboard totals for invest, provider charges, client sales, revenue, available fund, paid sales, receivables, and order counts
- Order status: Active, Pending, Processing, Completed, Cancelled, Voided
- Payment status: Paid, Partial, Unpaid
- Void and undo void workflow
- Archive/restore services without deleting records
- Export/import JSON backup
- Export orders CSV

## Important security note

This is still a static GitHub Pages prototype. The admin login is only a front-end gate. Do not store real sensitive provider pricing, private client data, or production financial records here until a real backend is connected.

Recommended next upgrade:

- Supabase Auth for real login
- Supabase database for shared services, orders, investment logs, and admin access
- Row-level security rules

## Terminal workflow

Work in:

```powershell
cd "C:\Users\Ralph John\OneDrive\Desktop\ME FILES\BOOSTING"
```

Normal update flow:

```powershell
git status
git add .
git commit -m "Update v1.1 cleanup"
git push origin v1.1-cleanup
```

When v1.1 is approved:

```powershell
git checkout main
git merge v1.1-cleanup
git push origin main
```

GitHub Pages will redeploy from `main` automatically.

## v1.2 Cleanup Notes

Added after internal review:

- Admin dashboard now behaves like navigation panels instead of showing everything in one long screen.
- Admin services table and order table now have pagination controls.
- Password/PIN fields keep one custom eye viewer button only.
- Client calculator now has a Proceed / Order via Messenger button.
- Proceed copies the generated order text, then opens the Messenger chat page.
- Public services now use hardcoded platform icons/badges for Facebook, TikTok, Instagram, YouTube, and Telegram.
- Seed services were expanded from the draft provider screenshots. Provider rates remain internal/admin-only; client rates remain editable from the admin side.

Messenger chat target:

```text
https://www.facebook.com/messages/t/707867809081709
```

Important: Messenger does not reliably support auto-sending a prefilled message from a static GitHub Pages site. The safe flow is: copy generated order text automatically, open Messenger, then paste/send.

## v1.4 local social icons workflow

Use your local PNG icons from `Resources/icons` and copy them into the website asset folder before committing:

```powershell
cd "C:\Users\Ralph John\OneDrive\Desktop\ME FILES\BOOSTING"
New-Item -ItemType Directory -Force ".\assets\icons\social"
Copy-Item ".\Resources\icons\facebook.png" ".\assets\icons\social\facebook.png" -Force
Copy-Item ".\Resources\icons\instagram.png" ".\assets\icons\social\instagram.png" -Force
Copy-Item ".\Resources\icons\telegram.png" ".\assets\icons\social\telegram.png" -Force
Copy-Item ".\Resources\icons\tiktok.png" ".\assets\icons\social\tiktok.png" -Force
Copy-Item ".\Resources\icons\twitter.png" ".\assets\icons\social\twitter.png" -Force
Copy-Item ".\Resources\icons\youtube.png" ".\assets\icons\social\youtube.png" -Force
```

`Resources/` remains ignored for drafts, but `assets/icons/social/` is part of the public website and will be pushed.

## v1.5 Provider-style Calculator Update

This update changes the public client page into a service-provider style order panel:

- Search bar at the top of the order form.
- Category dropdown similar to the provider panel format.
- Service dropdown with service ID, name, and visible client rate.
- Service Dashboard block with status, ID, min, and max.
- Service Analytics block with rate, average time, and notes.
- Average time field.
- Link/username field.
- Quantity field.
- Charge field showing the exact client total.
- New Order button that copies order details and opens Messenger.
- Copy Details Only secondary button.

Social media PNG icons should be copied from the local ignored folder:

```powershell
New-Item -ItemType Directory -Force ".\assets\icons\social"
Copy-Item ".\Resources\icons\facebook.png" ".\assets\icons\social\facebook.png" -Force
Copy-Item ".\Resources\icons\instagram.png" ".\assets\icons\social\instagram.png" -Force
Copy-Item ".\Resources\icons\telegram.png" ".\assets\icons\social\telegram.png" -Force
Copy-Item ".\Resources\icons\tiktok.png" ".\assets\icons\social\tiktok.png" -Force
Copy-Item ".\Resources\icons\twitter.png" ".\assets\icons\social\twitter.png" -Force
Copy-Item ".\Resources\icons\youtube.png" ".\assets\icons\social\youtube.png" -Force
```
