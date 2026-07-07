# Novalyte Supabase Setup Guide

This guide is for moving Novalyte admin data from browser localStorage into Supabase later.

## Goal

Keep these separate:

- Boosting services
- Digital products
- Orders
- Investments
- Product images/assets
- Admin-only write access
- Public/client read-only access

## Recommended Supabase project

Use one dedicated Supabase project for Novalyte, preferably named `novalyte` or `novalyte-production`.

If you reuse an existing project, keep Novalyte tables in the `public` schema with clear names such as:

- `novalyte_services`
- `novalyte_digital_products`
- `novalyte_orders`
- `novalyte_investments`
- `novalyte_admin_profiles`

## Important security rule

Never place the Supabase `service_role` key inside frontend files.

The public website can use the Supabase project URL and anon/publishable key only. Admin write access must be controlled by Supabase Auth plus Row Level Security policies.

## Step 1 - Create or choose project

1. Open Supabase dashboard.
2. Choose the organization you want to use.
3. Create a new project or choose an existing project.
4. Save these values for later:
   - Project URL
   - anon/publishable key

## Step 2 - Create Storage bucket for product images

Recommended bucket:

```text
novalyte-digital-products
```

For catalog images that clients should see publicly, a public bucket is simplest.

Folder convention:

```text
digital-products/netflix.png
digital-products/chatgpt.png
digital-products/canva-pro.png
```

## Step 3 - Create tables

Suggested tables:

### novalyte_services

Stores boosting services.

Suggested columns:

```text
id text primary key
provider_id text
platform text
category text
name text
provider_rate numeric
client_rate numeric
rate_unit numeric
min_order numeric
max_order numeric
avg_time text
tag text
visible boolean default true
archived boolean default false
created_at timestamptz default now()
updated_at timestamptz default now()
```

### novalyte_digital_products

Stores subscription/account products.

Suggested columns:

```text
id text primary key
name text
category text
price numeric
duration text
image text
image_url text
visible boolean default true
disabled boolean default false
description text
created_at timestamptz default now()
updated_at timestamptz default now()
```

### novalyte_orders

Stores admin-created boosting orders.

Suggested columns:

```text
id text primary key
service_id text
service_name text
client_name text
contact text
link text
quantity numeric
provider_total numeric
client_total numeric
revenue numeric
status text
payment_status text
created_at timestamptz default now()
updated_at timestamptz default now()
```

### novalyte_investments

Stores reload/cash-in records.

Suggested columns:

```text
id text primary key
amount numeric
note text
created_at timestamptz default now()
```

### novalyte_admin_profiles

Stores which authenticated Supabase users are admins.

Suggested columns:

```text
user_id uuid primary key references auth.users(id) on delete cascade
role text default 'admin'
created_at timestamptz default now()
```

## Step 4 - Enable Row Level Security

Enable RLS on every Novalyte table.

Client-facing read policies should allow public select only for visible records.

Admin write policies should allow insert/update/delete only when the logged-in user's id exists in `novalyte_admin_profiles`.

## Step 5 - Admin login plan

For admin, use Supabase Auth.

Recommended setup:

1. Create an admin user through Supabase Auth.
2. Add that user's UUID into `novalyte_admin_profiles`.
3. Admin page checks login session.
4. If the user is an admin, allow editing services, digital products, orders, and investments.

## Step 6 - Frontend integration plan

Next code patch should add:

```text
assets/js/supabaseClient.js
assets/js/remoteStore.js
```

Then replace localStorage-only flows with a hybrid flow:

1. Try Supabase first.
2. If Supabase is not configured, fall back to localStorage.
3. Keep export/import backup for emergencies.

## Step 7 - Migration plan

Use the existing admin backup export as the migration source.

1. Export backup from current admin.
2. Import backup into Supabase through a migration script or admin import button.
3. Verify services, digital products, and orders.
4. Then enable Supabase mode in Novalyte.

## Recommended next development patch

After Supabase project details are ready, build:

- Supabase config file with placeholders
- Remote data loader
- Admin login using Supabase Auth
- Database table sync for services and digital products
- Storage upload for digital product images
- LocalStorage fallback
