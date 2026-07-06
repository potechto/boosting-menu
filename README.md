# Novalyte Boosting Menu + Admin Tracker

First working prototype for a client-facing boosting service menu and an internal admin dashboard.

## Included Pages

- `index.html` - public/client menu with service search, filters, and live price calculator.
- `admin.html` - admin login, price control, order creation, income tracker, void/undo void, import/export.

## Current Prototype Features

### Client Side

- Search services by platform, category, name, or provider ID.
- View final client-facing price only.
- Quantity calculator.
- Generated inquiry/order message with copy button.
- Responsive layout for mobile and desktop.

### Admin Side

- Login gate with username, password, and PIN.
- Total Invest tracker.
- Total Orders / Provider Charges tracker.
- Total Client Sales tracker.
- Total Revenue tracker.
- Available Fund Estimate.
- Service price editor.
- Provider rate and client rate control.
- Service visibility control.
- Create Order button per service.
- Auto-computed provider charge, client charge, and revenue.
- Order history.
- Void and Undo Void order actions.
- Export backup JSON.
- Import backup JSON.
- Export orders CSV.

## Important Security Note

This version is a static GitHub Pages prototype. The admin login is only a simple front-end gate. It is not secure for real sensitive data because anyone with technical knowledge can inspect static files.

For real shared access among admins, upgrade to:

- Supabase Auth or Firebase Auth for login.
- Supabase/Firebase database for services, orders, and investment data.
- Row-level security rules so only admins can read internal provider prices and order logs.

## Local Use

Open `index.html` or `admin.html` in your browser.

Admin edits are saved in the same browser using `localStorage`.

## GitHub Pages Deployment

1. Create a new GitHub repository, for example `boosting-menu`.
2. Upload all files in this folder.
3. Go to repository Settings.
4. Open Pages.
5. Choose `Deploy from branch`.
6. Select `main` branch and `/root` folder.
7. Save.

Your public URL will look like:

```text
https://yourusername.github.io/boosting-menu/
```

## VS Code Git Commands

Run these inside the project folder:

```bash
git init
git add .
git commit -m "Initial Novalyte boosting menu"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/boosting-menu.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

## Recommended Next Upgrade

After confirming the design and workflow, connect the admin side to Supabase so all admins can access the same live data from different devices.
