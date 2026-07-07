# Novalyte v3.9 Layout Stability Patch Notes

This patch focuses only on layout stability and presentation consistency. It does not change service prices, digital product data, order formulas, or admin logic.

## Fixed Areas

- Admin toolbars no longer allow filters, buttons, and helper notes to overlap.
- Admin tables now use consistent column sizing and sticky action columns on desktop.
- Services actions stay visible: Create Order, Edit, Disable/Enable.
- Digital Products actions stay visible: Edit, Disable/Enable, Delete.
- Orders actions stay visible: View and Void/Undo Void.
- Investment Tracker analytics keep their grid layout while still wrapping properly on smaller screens.
- Mobile and tablet admin layouts switch to card-style responsive table rows.

## Verification Focus

- Check Services on desktop and make sure Actions are visible.
- Check Digital Products on desktop and make sure Actions are visible.
- Check Orders filters and export/reset buttons; they should not overlap.
- Check Investments and confirm analytics cards and input form remain readable.
- Check client Home page and Digital Products to ensure no regressions.
