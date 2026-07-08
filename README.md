# Novalyte Boosting Menu + Admin Tracker

Static GitHub Pages prototype for a client-facing service menu and an internal admin tracker.

## Live pages

- Client page: `index.html`
- Admin page: `admin.html`

## v1.1 cleanup features

- Responsive client-facing service menu
- Admin login with password/PIN eye viewer
- Presentable modals for service editing, order creation, void confirmation, and order details
- Provider price stays inside admin only
- Client visible price controls public pricing
- Create order button per service
- Order price snapshot per order
- Automatic provider charge, client charge, and revenue calculation
- Investment log with notes
- Dashboard totals for invest, provider charges, client sales, revenue, available fund, paid sales, receivables, and order counts
- Order status: Active, Pending, Processing, Completed, Cancelled, Voided
- Payment status: Paid, Partial, Unpaid
- Void and undo void workflow
- Archive/restore services without deleting records
- Export/import JSON backup
- Export orders CSV

## Important security note

This is still a static GitHub Pages prototype. The admin login is only a front-end gate. Do not store real sensitive provider pricing, private client data, or production financial records here until a real backend is connected.

Recommended next upgrade:

- Supabase Auth for real login
- Supabase database for shared services, orders, investment logs, and admin access
- Row-level security rules

## Terminal workflow

Work in:

```powershell
cd "C:\Users\Ralph John\OneDrive\Desktop\ME FILES\Novalyte"
```

Normal update flow:

```powershell
git status
git add .
git commit -m "Update v1.1 cleanup"
git push origin v1.1-cleanup
```

When v1.1 is approved:

```powershell
git checkout main
git merge v1.1-cleanup
git push origin main
```

GitHub Pages will redeploy from `main` automatically.

## v1.2 Cleanup Notes

Added after internal review:

- Admin dashboard now behaves like navigation panels instead of showing everything in one long screen.
- Admin services table and order table now have pagination controls.
- Password/PIN fields keep one custom eye viewer button only.
- Client calculator now has a Proceed / Order via Messenger button.
- Proceed copies the generated order text, then opens the Messenger chat page.
- Public services now use hardcoded platform icons/badges for Facebook, TikTok, Instagram, YouTube, and Telegram.
- Seed services were expanded from the draft provider screenshots. Provider rates remain internal/admin-only; client rates remain editable from the admin side.

Messenger chat target:

```text
https://www.facebook.com/messages/t/1240324299157071
```

Important: Messenger does not reliably support auto-sending a prefilled message from a static GitHub Pages site. The safe flow is: copy generated order text automatically, open Messenger, then paste/send.

## v1.4 local social icons workflow

Use your local PNG icons from `Resources/icons` and copy them into the website asset folder before committing:

```powershell
cd "C:\Users\Ralph John\OneDrive\Desktop\ME FILES\Novalyte"
New-Item -ItemType Directory -Force ".\assets\icons\social"
Copy-Item ".\Resources\icons\facebook.png" ".\assets\icons\social\facebook.png" -Force
Copy-Item ".\Resources\icons\instagram.png" ".\assets\icons\social\instagram.png" -Force
Copy-Item ".\Resources\icons\telegram.png" ".\assets\icons\social\telegram.png" -Force
Copy-Item ".\Resources\icons\tiktok.png" ".\assets\icons\social\tiktok.png" -Force
Copy-Item ".\Resources\icons\twitter.png" ".\assets\icons\social\twitter.png" -Force
Copy-Item ".\Resources\icons\youtube.png" ".\assets\icons\social\youtube.png" -Force
```

`Resources/` remains ignored for drafts, but `assets/icons/social/` is part of the public website and will be pushed.

## v1.5 Provider-style Calculator Update

This update changes the public client page into a service-provider style order panel:

- Search bar at the top of the order form.
- Category dropdown similar to the provider panel format.
- Service dropdown with service ID, name, and visible client rate.
- Service Dashboard block with status, ID, min, and max.
- Service Dashboard block with status, service ID, min/max, and average time.
- Average time field.
- Link/username field.
- Quantity field.
- Charge field showing the exact client total.
- New Order button that copies order details and opens Messenger.
- Copy Details Only secondary button.

Social media PNG icons should be copied from the local ignored folder:

```powershell
New-Item -ItemType Directory -Force ".\assets\icons\social"
Copy-Item ".\Resources\icons\facebook.png" ".\assets\icons\social\facebook.png" -Force
Copy-Item ".\Resources\icons\instagram.png" ".\assets\icons\social\instagram.png" -Force
Copy-Item ".\Resources\icons\telegram.png" ".\assets\icons\social\telegram.png" -Force
Copy-Item ".\Resources\icons\tiktok.png" ".\assets\icons\social\tiktok.png" -Force
Copy-Item ".\Resources\icons\twitter.png" ".\assets\icons\social\twitter.png" -Force
Copy-Item ".\Resources\icons\youtube.png" ".\assets\icons\social\youtube.png" -Force
```


## v1.6 Cleanup

- Removed public Service Analytics block from the client order panel.
- Service Dashboard now uses a full-width dark panel that matches the site theme.
- Added auto-hiding scrollbar behavior for visible scroll areas. Scrollbars appear while scrolling and fade after.
- Kept provider-style Category → Service → Link → Quantity → Charge → New Order flow.


## v1.7 Notes

- Removed the public `Visible Services` mini-stat card from the hero/order section.
- Kept the site focused on the provider-style order calculator.
- Added safe JavaScript guards so removed stat elements do not break the client page.
- Full provider service import is still a separate data pass; current seed services are not yet the complete provider catalog from all screenshots.

## v1.8 Novalyte Messenger CTA Update

- Updated the public Messenger destination to the Novalyte page Messenger link.
- Changed the main CTA from New Order to Proceed Order.
- Changed public service table action buttons from Use to Order Now.
- Client landing now starts on the Order Panel, while Services opens as a separate view from the navigation.
- When viewing Services, the same navigation button changes to Order Panel so clients can return cleanly.

Messenger chat target:

```text
https://www.facebook.com/messages/t/1240324299157071
```


## v1.9 Compact Responsive UI Update

- Reduced oversized public page spacing, card padding, button height, form height, and hero title scale.
- Added stronger mobile overrides so small screens show more of the order form without excessive scrolling.
- Kept the Novalyte Messenger CTA and Proceed Order flow from v1.8.
- Admin/login spacing was also tightened for smaller screens.


## v2.0 ID Autocomplete and Telegram Visibility

- Order panel search now shows a dropdown of matching service suggestions while typing.
- Typing in the search bar no longer rebuilds or shrinks the main Services dropdown.
- Service suggestions prioritize exact and partial provider ID matches before broader keyword matches.
- Selecting a suggestion automatically sets the correct platform/category and service in the order panel.
- Pressing Enter while suggestions are open selects the first match; Escape closes the suggestions.
- Telegram is now visible in the public platform/service options using the existing seed placeholder service until exact provider details are added.

## v2.1 Compact Order Panel Flow

- Removed the large public Service Dashboard block from the order panel.
- Removed the separate Average Time field to reduce height on mobile screens.
- Added a compact selected-service summary directly under the Services dropdown.
- The compact summary shows only the useful client details: platform/category, service name, ID, rate, min-max, and ETA.
- Kept the same ID autocomplete, Telegram visibility, Proceed Order, and Messenger flow.
- This keeps the client order panel focused on: search/select service, paste link, enter quantity, see charge, proceed to Messenger.


### v2.2 - Telegram visibility migration
- Added automatic seed-service merge for browsers that already have saved Novalyte service data in localStorage.
- Telegram now appears even if the user previously loaded an older version before Telegram was added.
- Preserves existing saved services/orders while adding missing seed services.

### v2.3 - Full Telegram services import
- Replaced the single Telegram placeholder service with the full Telegram service batch from the provider-panel screenshots.
- Added Telegram members, cheapest members, recommended members, post views, reactions, votes, and comments.
- Added migration cleanup so old saved browser data removes the temporary `TG-5001` placeholder and merges the new Telegram seed services without wiping saved orders.
- Telegram service IDs, provider rates, min/max values, and average time values were encoded from the screenshots. Reaction emoji labels can still be polished later if needed.


### v2.4 Icon background cleanup

- Removed decorative colored backplates from platform/social icons.
- Kept the original transparent PNG icons from `Resources/Icons` synced into `assets/icons/social`.
- Changed icon images to `object-fit: contain` so transparent icon edges remain clean.
- Kept v2.3 full Telegram import and migration behavior intact.


### v2.5 YouTube Service Import
- Removed the old single YouTube placeholder service.
- Added 43 YouTube services from provider-panel screenshots.
- Added migration cleanup so older browser data removes `YT-4001` and merges the full YouTube list without wiping saved orders/services.


## v2.6 Disable Services and Digital Products

- Admin Archive action is now Disable/Enable. Disabled services stay visible on the client side in a gray state and cannot be ordered.
- Added client Digital Products navigation before Services.
- Added subscription/tool cards for streaming, AI, editing, writing, music, and student tools.
- Product checkout copies product details and opens the official Novalyte Messenger CTA.
- Ebooks and online templates are intentionally excluded for LinkTech alignment.

## v2.7 Digital Products UX Fix
- Fixed Digital Products grid so one filtered result no longer stretches across the full screen.
- Added compact product cards with fixed responsive sizing.
- Added Description modal for each digital product.
- Checkout now copies a formatted product message and redirects to Novalyte Messenger.
- Client view/filter/order state now persists across refreshes using URL hash plus local storage.


## v2.8 Modal and product image polish
- Removed visible Close/Cancel-only modal buttons so modals close only through the X button or Escape.
- Disabled outside-overlay click closing for client and admin modals.
- Cleaned digital product image backgrounds/outer whitespace for tighter product cards.

## v2.9 Digital Product Admin and Image Restore

- Rebuilt digital product artwork using non-distorted square tiles so logos keep their proportions while avoiding large white canvas areas.
- Added a dedicated Digital Product Manager in admin, separate from boosting service management.
- Digital product name, category, price, duration, description, visibility, image filename/URL, and uploaded image data can now be edited from admin.
- Digital products now save under their own localStorage key and are included in backup export/import.
- Client Digital Products page now reads from the editable digital product store while boosting services remain under the separate services store.

## v3.2 Digital Product Image Asset Restore

- Restored the original tight digital product image assets instead of the dark padded rebuilt tiles.
- Removed the unnecessary top capture strip from Canva Pro and Quillbot only.
- Lightly trimmed capture-border edges on HBO Max, VivaOne, and iWantTFC.
- Kept natural white-background product artwork such as ChatGPT, YouTube Premium, Grammarly, and CapCut.
- Digital Products remain editable in the dedicated admin Digital Products panel.

## v3.3 Digital Product Compact Centered Grid

- Shrunk Digital Product cards, artwork, text, and buttons for a cleaner compact catalog view.
- Changed the Digital Products grid to center filtered results, so one or two products stay centered instead of aligning to the far left.
- Limited the catalog row width so rows naturally fill around four to five products before wrapping on desktop.
- Kept restored v3.2 digital product images, description modal, checkout-to-Messenger flow, and separate admin Digital Products editing intact.

## v3.4 Four-Per-Row Centered Digital Grid

- Locked the desktop Digital Products catalog to a centered four-card row layout.
- Incomplete rows now stay centered automatically, including when only one, two, or three products are visible after filtering.
- Newly added digital products also flow into the same centered layout without stretching the row width.
- Kept the compact card sizing, restored image behavior, description modal, checkout-to-Messenger flow, and separate admin Digital Products management intact.


## v3.5 Digital Product Admin Control Polish

- Added Disable/Enable controls to the dedicated Digital Products admin table.
- Disabled digital products stay visible on the client page but appear gray and cannot be checked out.
- Added Delete control for digital products while keeping seed-product deletions persistent through local storage.
- Kept Edit for digital product name, category, price, duration, visibility, description, image filename/URL, and uploaded image.
- Digital Products remain separate from boosting provider services and do not affect service pricing or service order data.


## v3.6 Admin Disable Visibility and Digital Product Controls

- Service Disable/Enable now keeps disabled services in the default admin list instead of making them disappear under the active filter.
- Renamed the default service filter to Shown services so visible disabled rows remain reachable and immediately switch from Disable to Enable.
- Added a Digital Products status filter for Shown, All, Disabled only, and Hidden only products.
- Cleaned Digital Product action buttons so Edit, Disable/Enable, and Delete follow the same visible action flow as boosting services.
- Fixed the Digital Products CSS brace issue from the previous polish pass and improved mobile action wrapping.
- Added `Documentation/SUPABASE_SETUP_GUIDE.md` with the recommended Supabase table, storage, auth, RLS, and migration plan for the next backend/storage phase.

## v3.7 Near-Final Presentation Polish

- Applied a cleaner near-final visual pass to the client and admin interfaces.
- Improved admin spacing, sidebar balance, section cards, table readability, action button wrapping, disabled-row visibility, and mobile behavior.
- Polished Digital Products catalog cards, filter controls, hover states, disabled states, modal styling, and compact centered layout without changing the restored image assets.
- Improved Services and Digital Products admin tables so disabled items remain visually reachable and easier to enable again.
- Added a final manual testing checklist document for local review before the next backend/Supabase phase.

## v3.8 Home Landing + Investment Analytics + Layout Stabilization

- Added a client Home landing page introducing Novalyte, with About and Contact sections prepared for future owner/founder/team details.
- Added Home navigation while keeping Digital Products, Services, Messenger, and the existing order panel flow.
- Added investment analytics cards for capital, used provider budget, available fund, ROI, paid sales, receivables, and latest reload insight.
- Stabilized admin layout width, sidebar behavior, toolbar wrapping, table overflow, and action button groups.
- Improved Digital Products and Services admin layouts so disabled rows stay visible and Enable/Disable actions remain findable.
- Kept ZIP cleanup workflow as the expected local apply process after successful verification.

## v3.9 Admin Layout Stabilization

- Locked admin pages into a stable centered content width to prevent tables and toolbars from spilling outside the viewport.
- Reworked admin toolbar behavior so search fields, filters, and notes no longer overlap.
- Made Services, Digital Products, and Orders action columns sticky on desktop so Edit, Disable/Enable, Delete, and Create Order stay visible even when a table scrolls horizontally.
- Standardized action button sizing and grouping across Services, Digital Products, and Orders.
- Improved Digital Product Manager table widths and product cells so descriptions no longer push the buttons off-screen.
- Improved Investment Tracker layout stability while keeping analytics cards and investment form intact.
- Kept all existing logic, pricing, disable/enable behavior, Digital Products separation, client Home page, and Supabase guide intact.


## v4.0 Admin Compact Data Mode

- Reworked the admin tables into compact data mode so service, digital product, order, and investment data fit without overlapping.
- Removed desktop sticky action columns because they were covering status/payment columns and making buttons look missing.
- Reduced admin data font sizes, row padding, button sizes, badges, and product thumbnails for a more stable management layout.
- Kept all current logic intact: disable/enable stays visible, digital product management remains separate, investment analytics remain active, and client pages are unchanged.

## v4.1 Layout Alignment + Permanent Site Direction
- Added a more complete client home direction for Novalyte as a future permanent domain-ready site.
- Equalized the three client home CTA cards and aligned their buttons.
- Compressed the client services directory table columns for cleaner browsing.
- Reworked admin action button alignment: paired top actions, centered solo destructive/status action below.
- Added compact explainer cards so Investment Tracker and Order History are easier to understand.
- Tightened admin table spacing while keeping all buttons visible and clickable.

## v4.2 Admin hard layout correction
- Admin is now forced into compact readable data mode.
- Removed awkward header splitting by forcing table headers to stay on one line.
- Widened admin content area while shrinking sidebar and rows.
- Services actions now render as Create Order + Edit on top, with Disable/Enable centered below.
- Digital Product actions now render as Edit + Disable/Enable on top, with Delete centered below.
- Client home CTA cards are equal height and their buttons align at the bottom.
- Investment cards/forms are compacted so the page is easier to test.

## v4.3 Portal + Income Tracker Patch

- Added `What We Do` and `About` as client navigation anchors.
- Improved admin table layout stability for Services, Digital Products, Investments, and Orders.
- Digital Products now use Disable/Enable outside the edit modal for availability control.
- Digital Product edit modal now focuses on uploaded cover image, client price, provider price, category, duration, and description.
- Investment Tracker is now an Income + Investment Tracker with capital logs, owner payouts, team payroll payouts, expenses, payroll rules, and finance history.
- Added `Documentation/V4_3_PORTAL_INCOME_TRACKER_LAYOUT_NOTES.md`.

## v4.4 Independent Pages + Reviews + Admin Fit

- What We Do and About are now independent client screens, not scroll-only Home sections.
- About includes scrollable client review cards and a one-review-per-browser form with a 30-minute edit window.
- Review IDs auto-generate as Pnovalyte001, Pnovalyte002, and onward.
- Admin tables were compressed so Actions columns stay visible at normal browser zoom.
- Digital product modal keeps upload-based image replacement and provider/client price separation.


## v4.6 Layout + Feedback Polish

This version polishes the Digital Product admin modal and the public review area before launch. Provider and client price fields were reordered, image preview was converted into a cleaner View Image flow, section labels were simplified, and the Customer Feedback area now uses stacked review rows inspired by the provided sample.

See `Documentation/V4_6_LAYOUT_FEEDBACK_POLISH_NOTES.md` for the exact change list and testing checklist.

## v4.5 Launch-Ready Wrapup

- Refined the public-facing Novalyte copy from a temporary boosting-menu tone into a cleaner Digital Growth Solutions portal direction.
- Updated the page title, meta description, header subtitle, Home copy, About copy, and order-panel helper text for launch-readiness.
- Removed stale client-side JavaScript references to old stat IDs that no longer exist in the current HTML.
- Added compact Order Summary cards above the Admin Order History table for filtered records, completed orders, processing/pending records, cancelled/voided records, client sales, provider cost, revenue, and receivables.
- Kept existing v4.4 locked behavior: independent What We Do/About pages, client reviews, Digital Products separation, Disable/Enable visibility, X/Esc-only modals, and localStorage storage until Supabase is connected.
- Added `Documentation/V4_5_LAUNCH_READY_WRAPUP_NOTES.md` for this launch handoff.
- Added `Documentation/LOCAL_APPLY_COMMANDS_v4_5_20260708.md` with the one-ZIP apply, verify, and delete workflow.

## v4.7 Feedback Single Submission + Clean Edit Mode

- Reworked Customer Feedback so visitors submit only one feedback entry per browser.
- Removed the Display Name field; the form now uses only a 1000-character textarea.
- After submission, the feedback form disappears and the submitted feedback remains visible in the list.
- Review IDs now use the `phnova-00A#` format.
- Added clean preview feedback cards so the section is not visually empty before real feedback grows.
- Removed visible Show to clients / Disabled controls from Service edit mode because Enable/Disable already exists in the table actions.
- Kept hidden internal fields to preserve existing service save behavior.
- Added `Documentation/V4_7_FEEDBACK_SINGLE_SUBMISSION_CLEAN_EDIT_NOTES.md` and `Documentation/LOCAL_APPLY_COMMANDS_v4_7_20260708.md`.

## v4.8 Compact Detail Scale

- Compressed large detail areas by about half for a cleaner launch-ready feel.
- Reduced Customer Feedback heading, helper copy, review cards, star row, textarea height, and submit button sizing.
- Reduced About / What We Do detail copy and section spacing.
- Reduced Service and Digital Product detail modal rows, text, image, and price scale.
- Reduced Admin Service and Digital Product edit modal labels, inputs, hints, textareas, upload row, and image preview.
- Kept v4.7 behavior intact: one feedback per browser, textarea only, `phnova-00A#` IDs, and no visible Show to clients / Disabled controls inside edit mode.
- Added `Documentation/V4_8_COMPACT_DETAIL_SCALE_NOTES.md` and `Documentation/LOCAL_APPLY_COMMANDS_v4_8_20260708.md`.


## v4.9 Public Copy + Scroll Stability Patch - 2026-07-08

- Replaced public seed feedback copy with more natural Tagalog/Taglish feedback text while keeping `phnova-00A#` review IDs.
- Removed the internal/admin wording from the client process step 04 and changed it to a client-safe confirmation step.
- Replaced the public-facing future provider/team wording with a cleaner client service-flow message.
- Added scroll stability CSS to reduce horizontal page wiggle/jitter while scrolling.
- Kept one-submission feedback behavior from v4.7 and compact sizing from v4.8.

## v5.0 Launch Hardening + Responsive Polish - 2026-07-08

- Added mobile hamburger navigation for the client view to prevent squeezed header/nav layout on phones.
- Added `Resources/Icons/logo.png` from the original Novalyte brand artwork and wired the client/admin brand mark to use it with fallback handling.
- Refined public-facing copy so clients only see helpful order, service, and confirmation details.
- Removed remaining client-facing language that sounded internal, provider/admin-based, or unnecessary for customers.
- Hardened scroll stability by keeping scrollbars stable and disabling the previous auto-hide scrollbar behavior that could cause page wiggle.
- Improved mobile spacing, card sizing, paddings, table-to-card behavior for services, modal sizing, and button layout.
- Kept v4.7-v4.9 behavior: one feedback submission per browser, textarea-only feedback, `phnova-00A#` IDs, Tagalog/Taglish seed feedback, hidden edit visibility controls, and compact admin modals.
- Added `Documentation/V5_0_LAUNCH_HARDENING_RESPONSIVE_POLISH_NOTES.md` and `Documentation/LOCAL_APPLY_COMMANDS_v5_0_20260708.md`.
## v5.1 Mobile Rescue + Stability

This patch fixes the mobile layout issues observed in screen recordings after v5.0. It hardens overflow handling, stops dynamic scrollbar wiggle, converts mobile client/admin tables into card layouts, shortens the order service dropdown labels, and tightens mobile spacing for the hamburger layout, service cards, digital products, feedback, and admin pages.

