# Novalyte Final Local Testing Checklist

Use this before pushing a reviewed patch live.

## Client Digital Products

1. Open `index.html`.
2. Go to Digital Products.
3. Clear filters and confirm the grid is four per row on desktop.
4. Filter to one product and confirm it is centered.
5. Filter to two or three products and confirm they are centered.
6. Open Description modal and close using X and Escape.
7. Click outside the modal and confirm it does not close.
8. Click Checkout and confirm the order message is copied and Messenger opens.
9. Disable one product in admin, refresh client, and confirm it is gray/unavailable.
10. Re-enable it in admin and confirm Checkout works again.

## Client Services

1. Open Services.
2. Search by service ID, platform, and keyword.
3. Confirm disabled services stay visible but gray and cannot be ordered.
4. Click Order Now/Create Order from a service row and confirm it fills the order panel.
5. Enter quantity and confirm Charge updates correctly.
6. Click Proceed Order and confirm the message is copied and Messenger opens.

## Admin Services

1. Open `admin.html`.
2. Login.
3. Go to Services.
4. Disable a service and confirm it remains in the list with an Enable button.
5. Use Disabled only filter and confirm the disabled service appears.
6. Enable it and confirm the button returns to Disable.
7. Edit provider/client rate and confirm revenue/unit updates.
8. Create a test order from a service row.

## Admin Digital Products

1. Go to Digital Products.
2. Search and filter by category.
3. Edit product price and description.
4. Replace image using filename/URL or upload.
5. Disable a product and confirm it remains in the list with an Enable button.
6. Use Disabled only filter.
7. Re-enable the product.
8. Delete only a test product, not a real product, unless intentionally removing it.

## Admin Orders and Investment

1. Add an investment entry.
2. Create a test order.
3. Mark status/payment changes.
4. Void/cancel and restore if needed.
5. Export backup JSON.
6. Export orders CSV.

## Browser Checks

1. Hard refresh with Ctrl + F5.
2. Test desktop width.
3. Test tablet width.
4. Test small mobile width.
5. Refresh while on Digital Products and Services; confirm the page stays on the same section.
