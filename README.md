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
