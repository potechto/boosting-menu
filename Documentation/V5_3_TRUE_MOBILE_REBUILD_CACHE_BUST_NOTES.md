# Novalyte v5.3 True Mobile Rebuild + Cache Bust Notes

This patch makes the mobile update visually undeniable and easier to verify on real phones.

## Included
- Added visible `Novalyte v5.3 Mobile Build` badge to client and admin.
- Added cache-busting query strings to CSS and JS assets.
- Added direct mobile service cards instead of relying on responsive table transforms.
- Strengthened mobile digital product grid, single-card centering, and modal centering.
- Added custom dropdown behavior to service/digital product filters.
- Replaced admin mobile `:has()`-dependent layout with body mode classes.
- Strengthened admin login/dashboard isolation and mobile hamburger layout.

## Testing priority
1. Confirm the v5.3 marker appears on phone.
2. Check client Digital Products, Services, and dropdowns.
3. Check Admin Login, Admin hamburger, Services, Digital Products, and Orders.
