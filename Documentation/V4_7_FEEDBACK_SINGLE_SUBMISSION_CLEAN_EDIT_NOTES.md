# Novalyte v4.7 Feedback Single Submission + Clean Edit Notes

Date: 2026-07-08

## Summary

This patch focuses on the public Customer Feedback behavior and the admin edit modal cleanup requested after the v4.6 layout review.

## Client Feedback Updates

- Removed the Display Name input from the public feedback form.
- Feedback submission now uses only one textarea with a 1000-character limit.
- Each browser can submit one feedback entry only.
- After a browser submits feedback, the textarea and submit button are hidden.
- The submitted feedback remains visible in the feedback list together with the existing public feedback cards.
- Review IDs now use the `phnova-00A#` format.
- The public list includes preview feedback cards with IDs such as `phnova-00A1`, `phnova-00A2`, and onward so the layout is not empty before real feedback exists.
- Preview cards are labelled as preview feedback in the layout and should be replaced naturally as real client feedback grows.

## Admin Edit Modal Updates

- Removed visible `Show to clients` and `Disabled` controls from the Service edit modal.
- Kept hidden internal fields so existing save behavior does not break.
- Digital Product edit modal remains clean and still uses the external Enable/Disable action button for availability.
- Enable/Disable control remains outside edit mode in the Services and Digital Products tables.

## Files Updated

- `index.html`
- `admin.html`
- `assets/js/app.js`
- `assets/js/store.js`
- `assets/css/styles.css`
- `README.md`

## Testing Checklist

### Client View

1. Open `index.html`.
2. Go to About / Customer Feedback.
3. Confirm the review list shows stacked feedback cards with `phnova-00A#` IDs.
4. Confirm there is no Display Name field.
5. Confirm there is only one feedback textarea and a Submit Feedback button.
6. Type up to 1000 characters and verify the character counter updates.
7. Submit feedback.
8. Confirm the form disappears after submission.
9. Confirm the submitted feedback appears in the feedback list.
10. Refresh the browser and confirm the form stays hidden on that browser.

### Admin View

1. Open `admin.html`.
2. Edit a service.
3. Confirm `Show to clients` and `Disabled` are no longer visible inside edit mode.
4. Confirm service details can still be saved.
5. Confirm Enable/Disable buttons remain available from the Services table.
6. Edit a digital product and confirm the modal remains clean.
7. Confirm Digital Product Enable/Disable still works from the Digital Products table.

## Notes

The project remains a static/localStorage prototype until the Supabase/Auth phase is connected. Do not use it for sensitive production data yet.
