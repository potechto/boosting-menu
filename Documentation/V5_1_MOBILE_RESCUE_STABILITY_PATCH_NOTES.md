# Novalyte v5.1 Mobile Rescue + Stability Patch Notes

Date: 2026-07-08

## Purpose
This patch addresses the mobile issues observed from the screen recordings after v5.0.

## Fixed / Improved
- Added stronger mobile overflow protection to prevent horizontal wiggle and screen shifting.
- Disabled dynamic scrollbar class toggling in admin view because it can cause layout movement while scrolling on mobile.
- Reworked mobile client service directory into true stacked cards instead of squeezed table columns.
- Reworked mobile admin responsive tables into stacked cards for Services, Digital Products, and Orders.
- Tightened mobile admin sidebar navigation so it no longer consumes excessive vertical space.
- Shortened order service dropdown labels to reduce wrapping and vertical text issues.
- Added stronger mobile rules for select fields, inputs, service summary chips, and order form fields.
- Improved digital product mobile grid into compact two-column cards where screen width allows.
- Simplified mobile spacing, cards, headings, and section sizing for better readability.

## Important Behavior Preserved
- Client hamburger navigation remains active.
- Feedback remains one submission per browser.
- Taglish public feedback remains active.
- Admin edit modal visibility checkboxes remain removed.
- Client-facing public copy remains cleaned of admin/provider/income/internal details.

## Test Focus
- Mobile homepage header and hamburger menu.
- Digital Products mobile grid.
- Services page mobile service cards.
- Order page service dropdown and selected service summary.
- Admin Services/Digital Products/Orders tables on mobile.
- Scroll up/down slowly and quickly to confirm reduced page wiggle.
