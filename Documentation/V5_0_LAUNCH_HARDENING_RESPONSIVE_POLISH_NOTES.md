# Novalyte v5.0 Launch Hardening + Responsive Polish Notes

Date: 2026-07-08

## Main goal

This patch settles the current launch polish pass before adding bigger production features. It focuses on public presentation, mobile usability, spacing consistency, scroll stability, and safer client-facing wording.

## Public client updates

- Reworked the client-facing copy to sound cleaner, shorter, and less internal.
- Removed public wording that could hint at provider/admin/team/investment details.
- Simplified the Home, What We Do, About, Digital Products, Services, and Process copy.
- Kept the client message flow focused on browse, prepare, message, and confirm.
- Kept v4.7 feedback behavior and v4.9 Tagalog/Taglish sample feedback style.

## Mobile and layout updates

- Added a mobile hamburger button for the client navigation.
- Moved the client navigation into a clean dropdown menu on small screens.
- Reduced mobile squeezing around the Novalyte brand/header.
- Added mobile-friendly service cards from the public services table.
- Improved mobile spacing, paddings, card radius, button width, and readable font sizing.
- Added stronger modal sizing rules for smaller screens.

## Logo setup

- Added `Resources/Icons/logo.png` generated from the original Novalyte brand artwork.
- Updated client and admin brand marks to use `Resources/Icons/logo.png` when available.
- Added JS fallback behavior so the N mark stays visible if a replacement logo file is missing or fails to load.
- Future custom logo replacement can be done by replacing `Resources/Icons/logo.png`.

## Scroll stability

- Disabled the previous auto-hide scrollbar behavior that could cause scroll wiggle/layout shift.
- Set stable scrollbars and stable scroll gutter behavior.
- Kept horizontal overflow protection for client/admin shells, cards, tables, and modals.

## What to test

Client view:

- Header logo appears clean.
- Desktop nav still works.
- On mobile width, hamburger appears and opens/closes the menu.
- Each hamburger menu item opens the correct page and closes the menu.
- Home, What We Do, About, Digital Products, Services, and Order views load properly.
- Customer Feedback remains textarea-only and one submission per browser.
- Services table becomes mobile card layout on small screens.
- Scroll up/down without visible horizontal wiggle.

Admin view:

- Admin logo appears clean.
- Admin dashboard loads normally.
- Service and Digital Product edit modals remain compact.
- Hidden visibility/disabled fields do not reappear inside edit modals.
- No JavaScript syntax errors.

## Still intentionally not included

- Real database storage.
- Real admin authentication.
- Multi-device review/order sync.

Those remain for the Supabase/Auth phase.
