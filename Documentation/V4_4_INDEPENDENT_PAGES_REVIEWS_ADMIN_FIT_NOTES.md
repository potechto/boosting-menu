# Novalyte v4.4 Independent Pages, Reviews, and Admin Fit Patch

## Client view
- What We Do and About are now independent page states instead of scroll anchors inside Home.
- Home only acts as the landing screen and does not contain the What We Do or About sections underneath.
- What We Do keeps the permanent portal direction and simple process content.
- About now contains the About Novalyte section plus a client reviews area.

## Client reviews
- Added a horizontal scrollable review card area under About.
- Added a public review form with optional display name and 1000-character maximum review text.
- No account is required.
- Each browser can submit one review only.
- A review receives an automatic ID using Pnovalyte001, Pnovalyte002, Pnovalyte003, and onward.
- The client can edit their review only within 30 minutes after submitting.
- After 30 minutes, the form locks for that browser and the review becomes view-only.

## Admin layout
- Reduced admin sidebar width, section padding, table font sizes, and table spacing.
- Removed large table minimum widths so Actions columns remain visible at normal browser zoom.
- Services and Digital Products tables now fit inside the admin panel more cleanly.
- Action buttons remain compact: services keep Create Order + Edit on the first row and Disable/Enable centered below.
- Digital Product actions remain stacked as Edit, Disable/Enable, and Delete.

## Digital product manager
- Product visibility is controlled through Disable/Enable from the table instead of a visible checkbox in the modal.
- Product image path input stays hidden; the admin uses the upload field for cover image changes.
- Client price and provider cost remain separated so profit can be checked before saving.
