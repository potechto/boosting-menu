# v4.1 Layout Alignment Notes

## Goal
This patch focuses on layout stability and a cleaner permanent-site direction.

## Client side
- Made the three home CTA cards equal height.
- Pushed CTA buttons to the same baseline.
- Added a more complete Novalyte home direction with What We Do and Simple Process sections.
- Compressed the client Services directory table so platform/service columns no longer feel too wide.

## Admin side
- Kept disabled services and products visible in admin.
- Aligned action buttons into predictable rows.
- Services actions: Create Order + Edit are aligned together, Disable/Enable is centered below.
- Digital product actions: Edit + Disable/Enable are aligned together, Delete is centered below.
- Removed sticky action-column behavior from admin tables to prevent overlapping.
- Added compact explainer cards for Services, Digital Products, Investments, and Orders.
- Tightened table padding, column widths, and helper text to make admin screens easier to test.

## Notes
Investment Tracker is an estimate tool:
- Total capital = cash-in/reload entries.
- Used for orders = provider-side charges from saved orders.
- Available fund = total capital minus provider charges.

Order History is the internal ledger:
- Paid/partial/unpaid affect sales and receivables.
- Voided records remain visible but are excluded from totals.
