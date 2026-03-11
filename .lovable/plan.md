

# Monthly Billing Report পেইজ — রেফারেন্স ইমেজ অনুযায়ী

## রেফারেন্স বিশ্লেষণ
ছবিতে Monthly Billing Report পেইজ — "Monthwise advance & due report" সাবটাইটেল। "Click to filter data" কলাপসিবল ফিল্টার বার। SHOW entries + SEARCH। টেবিল কলাম: C.Code, ID/IP, Name, Mobile, Zone, Cus.Type, Conn.Type, Package, Speed, Generated, Received, BalanceDue, Advance, PaymentDate, Server। Checkbox সিলেকশন। Breadcrumb: Billing > Billing List।

## পরিবর্তন

### `src/pages/billing/MonthlyBillingReport.tsx` — নতুন পেইজ

DailyCollectionPage-এর প্যাটার্ন অনুসরণ করে:

1. **হেডার**: "Monthly Billing Report" + "Monthwise advance & due report" সাবটাইটেল + breadcrumb
2. **কলাপসিবল ফিল্টার**: "Click to filter data" বাটন — ভেতরে Month/Year picker, Zone, Package, Connection Type, Customer Type ফিল্টার
3. **SHOW entries (10/25/50/100) + SEARCH বার**
4. **টেবিল কলাম**: Checkbox, C.Code, ID/IP, Name, Mobile, Zone, Cus.Type, Conn.Type, Package, Speed, Generated, Received, BalanceDue, Advance, PaymentDate, Server
5. **Pagination**: Showing X to Y of Z + First/Prev/Next/Last
6. **ডাটা**: `useCustomers` + `useBills` + `usePayments` hooks থেকে real data join, demo fallback সহ
7. **অ্যাকশন**: Generate PDF, Generate CSV বাটন

### `src/App.tsx` — রাউট আপডেট
`/dashboard/billing/monthly` → `MonthlyBillingReport`

### ফাইল পরিবর্তন

| ফাইল | কাজ |
|------|-----|
| `src/pages/billing/MonthlyBillingReport.tsx` | নতুন — Monthly Billing Report পেইজ |
| `src/App.tsx` | রাউট আপডেট — placeholder → MonthlyBillingReport |

