# Novalyte v4.9 Public Copy + Scroll Stability Notes

Date: 2026-07-08

## Changes

1. Customer Feedback seed copy was changed to more natural Tagalog/Taglish lines using the existing `phnova-00A#` ID sequence.
2. Public-facing seed labels now display as client feedback instead of preview feedback.
3. Client-side process step 04 no longer exposes admin-only/internal details such as income, provider cost, or investment usage.
4. The fourth public feature card was rewritten into a client-safe service-flow message.
5. Scroll stability CSS was added to reduce page wiggle/jitter during vertical scrolling.

## Preserved Behavior

- One feedback submission per browser remains active.
- Feedback form still disappears after successful submission.
- Admin enable/disable controls remain outside edit mode.
- v4.8 compact sizing remains active.

## Manual Test

Client:
- Open About / Customer Feedback.
- Confirm the four seed cards use Tagalog/Taglish copy and `phnova-00A1` to `phnova-00A4` IDs.
- Submit one test feedback and confirm the form disappears after submit.
- Scroll the page up/down and check that the screen no longer horizontally wiggles.
- Open What We Do and confirm step 04 says Confirm, not Track/admin records.

Admin:
- Open Edit Service and Edit Digital Product.
- Confirm visibility checkboxes are not visible inside edit modals.
- Confirm enable/disable actions are still available from the main admin list controls.
