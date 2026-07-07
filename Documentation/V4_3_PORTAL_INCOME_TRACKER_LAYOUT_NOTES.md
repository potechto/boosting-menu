# Novalyte v4.3 Portal + Income Tracker Layout Notes

## Client side

- Added direct navigation anchors for `What We Do` and `About`.
- Kept the Home, Digital Products, Services, and Messenger flow.
- What We Do and About remain part of the Home landing page but can now be reached from the top nav.
- Client cards keep consistent CTA alignment.

## Admin layout

- Added a stronger final override layer for admin table stability.
- Services table action buttons now use a controlled two-line layout:
  - Create Order + Edit on the first row.
  - Disable/Enable centered below.
- Digital product actions now stack cleanly inside the Actions column.
- Table columns are compressed but still readable.
- Removed the visible Digital Product `Show to clients` checkbox from the modal workflow.
- Removed the visible Digital Product `Image File Name or URL` field from the modal workflow.
- Digital Product image editing now uses the upload picker while preserving existing image data if no new file is selected.
- Added Service Provider Price for digital products so client price and internal cost can be compared.

## Income + Investment Tracker

- Investment Tracker has been upgraded into a finance tracker for future Novalyte operations.
- Added Finance Entry types:
  - Add Funds / Reload
  - Owner Payout
  - Team Payroll Payout
  - Other Expense
- Added finance logs/history with date, type, person/payee, amount, note, and remove action.
- Added future team payroll rules:
  - Person name
  - Peso amount or percentage
  - Weekly or monthly frequency
  - Estimated share based on current revenue when percentage is used
- Added analytics for:
  - Total capital
  - Provider order spend
  - Available capital
  - Gross revenue
  - Owner payouts
  - Team payroll paid
  - Net retained
  - Cash wallet estimate
  - Paid sales
  - Receivables

## Storage note

- Data is still localStorage-based for this prototype.
- This patch prepares the structure for Supabase/Firebase migration later.
