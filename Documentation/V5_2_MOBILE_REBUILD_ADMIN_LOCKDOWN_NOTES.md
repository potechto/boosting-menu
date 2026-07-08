# Novalyte v5.2 Mobile Rebuild + Admin Lockdown Notes

## Purpose
Responds to the mobile screen-record review by isolating mobile CSS and fixing the most visible mobile layout issues before the next deployment test.

## Client updates
- Added `assets/css/mobile.css` and linked it after the main stylesheet.
- Strengthened logo rendering on mobile using `Resources/Icons/logo.png`.
- Removed unnecessary About/Feedback helper text.
- Rebuilt mobile dropdown behavior with custom scrollable dropdown lists, so filters open downward instead of relying on the phone browser picker.
- Re-centered single-item digital product categories while preserving two-column product cards when there are multiple products.
- Re-centered and tightened the digital product modal.
- Hid empty service table shells when no services match.
- Improved service cards and pagination alignment on mobile.

## Admin updates
- Admin login now starts from login view on page load instead of restoring an old session automatically.
- Replaced the emoji eye button with a CSS-drawn eye icon.
- Added mobile hamburger navigation for admin after login.
- Improved admin mobile cards, tables, action buttons, pagination, and empty states.
- Added logo image to the admin login mark and sidebar brand.

## Verification
- `node --check` passed for `data.js`, `store.js`, `app.js`, and `admin.js`.
- Patch keeps desktop styles in `styles.css` and mobile overrides in `mobile.css` for cleaner future development.
