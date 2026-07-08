# Novalyte v4.6 Layout + Feedback Polish Notes

Date: 2026-07-08

## What changed

- Digital Product admin modal layout polished for launch review.
- Service Provider Price and Client Price positions were swapped.
- Digital Product labels were made visually stronger than helper text.
- Product cover image handling was cleaned:
  - Existing image no longer forces a large preview to show immediately.
  - A compact `View image` button appears beside the file chooser when an image is present.
  - New uploaded images show a centered preview.
- Client standalone section labels were simplified:
  - Removed stretched pill look from `About Novalyte`, `What we do`, and review labels.
  - Labels now behave like clean section labels above the main title.
- Client Reviews section was redesigned based on the provided Customer Feedback sample:
  - Clean stacked feedback rows instead of awkward horizontal cards.
  - Five-star visual treatment added.
  - Empty review state is cleaner and ready for real feedback.

## Files updated

- `admin.html`
- `index.html`
- `assets/js/admin.js`
- `assets/js/app.js`
- `assets/css/styles.css`
- `README.md`
- `Documentation/LOCAL_APPLY_COMMANDS_v4_6_20260708.md`

## Verification notes

Run syntax checks:

```powershell
node --check ".\assets\js\data.js"
node --check ".\assets\js\store.js"
node --check ".\assets\js\app.js"
node --check ".\assets\js\admin.js"
```

Manual browser checks:

- Open `index.html` and verify About/What We Do labels no longer stretch across the section.
- Open the About page and verify Customer Feedback appears as clean stacked feedback rows.
- Open `admin.html`, edit a Digital Product, and verify:
  - Provider price is on the left.
  - Client price is on the right.
  - Labels are larger/stronger than helper text.
  - Existing image has a `View image` button beside the file chooser.
  - Clicking `View image` toggles a centered preview.
  - Selecting a new cover image shows the centered preview.
