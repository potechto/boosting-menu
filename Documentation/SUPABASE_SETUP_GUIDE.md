# Novalyte v6.0.0 Supabase Shared Sync Setup

Novalyte now contains an optional shared-data layer so admin records can stay consistent across desktop, mobile, and the public client view. The website still works in local browser mode while cloud configuration is disabled.

## What syncs

When cloud mode is enabled, these datasets are shared:

- Boosting services
- Digital products
- Service and digital-product orders
- Investments and finance entries
- Team members
- Reviews

The public client view reads separate sanitized catalog datasets and can look up matching orders using the exact client name/reference entered by the admin. Public catalog datasets omit provider rates and product costs. The public order lookup returns only the client name, service/product name, client fee, status, date, and order type. It does not return provider cost, provider rates, revenue/profit, notes, contact details, or target links.

## Security rules

- Never place the Supabase `service_role` key in any frontend file.
- Use only the project URL and anon/publishable key in `assets/js/cloud-config.js`.
- Admin writes are protected by Supabase Auth and Row Level Security.
- Only users listed in `novalyte_admin_profiles` receive admin access.
- The exact client reference should be treated as private. A unique order/reference code is recommended for a later privacy upgrade.

## 1. Create the Supabase project

Create or choose a dedicated Supabase project. Copy:

- Project URL
- anon/publishable key

## 2. Run the included SQL

Open Supabase **SQL Editor** and run:

```text
Documentation/NOVALYTE_SUPABASE_SHARED_SYNC.sql
```

The script creates:

- `novalyte_admin_profiles`
- `novalyte_shared_state` with private admin datasets and sanitized public catalog datasets
- RLS policies
- `novalyte_is_admin()`
- The limited public RPC `novalyte_lookup_orders()`

## 3. Create the admin account

In **Authentication > Users**, create the admin email/password account. Then register its UUID by running the final commented `insert` statement from the SQL file after replacing the sample email.

Example:

```sql
insert into public.novalyte_admin_profiles (user_id)
select id from auth.users where lower(email) = lower('admin@example.com')
on conflict (user_id) do nothing;
```

## 4. Enable cloud mode in the project

Edit `assets/js/cloud-config.js`:

```js
window.NOVALYTE_CLOUD_CONFIG = {
  enabled: true,
  supabaseUrl: 'https://YOUR_PROJECT.supabase.co',
  anonKey: 'YOUR_ANON_OR_PUBLISHABLE_KEY',
  adminEmail: 'admin@example.com'
};
```

`adminEmail` lets the existing username field continue to accept the normal Novalyte username. Enter the Supabase admin password in the password field and the existing Novalyte security PIN in the PIN field.

## 5. First cloud login

1. Open `admin.html`.
2. Sign in with the configured Supabase admin credentials and Novalyte PIN.
3. The dashboard status pill should change from **Loading shared data** to **Shared data is up to date**.
4. If a cloud dataset is still empty, the first authenticated login initializes it from that browser's current Novalyte local data.

Use the browser containing the correct/latest admin records for the first cloud login. Export a backup first as an additional safety copy.

## 6. Verify cross-device behavior

1. Create or edit an order on desktop.
2. Open the admin page on mobile and sign in with the same cloud admin account.
3. Confirm the order and totals appear.
4. Open the client view, enter the exact client name/reference, and confirm the status card appears.
5. Change the order to Pending, Processing, or Completed and recheck the client view.

## Local fallback

With `enabled: false`, Novalyte keeps its existing localStorage behavior. Local mode is browser/device-specific and cannot reflect desktop records on another phone. Shared cross-device data requires the Supabase setup above.

## Product images

Current image URLs/data continue to work as stored. A dedicated Supabase Storage bucket can be added later for larger product image libraries, but it is not required for the v6.0.0 shared-state patch.
