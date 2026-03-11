

# Financial Transactions (History) পেইজ — রেফারেন্স ইমেজ অনুযায়ী

## রেফারেন্স বিশ্লেষণ
ছবিতে **Financial Transactions** পেইজ: "Get Financial Transactions" সাবটাইটেল, breadcrumb, Generate PDF/CSV বাটন, ফিল্টার বার (Transaction For, Payment Method, Created By, Received By, Created/Received For dropdowns + Generated From/To, Receive From/To date fields), SHOW entries + SEARCH, টেবিল (Transaction For, Transaction Type, To Whom, Generated Amount, Received/Paid Amount, Discount, Payment Method, Created By, Creation Date, Received By, Received Date), Pagination।

## পরিবর্তন

### `src/pages/finance/FinancialHistoryPage.tsx` — নতুন পেইজ

DailyIncomePage প্যাটার্ন অনুসরণ করে:

1. **হেডার**: "Financial Transactions" + "Get Financial Transactions" সাবটাইটেল + breadcrumb + Generate PDF / Generate CSV বাটন
2. **ফিল্টার বার (২ সারি)**:
   - Row 1: Transaction For, Payment Method, Created By, Received By, Created/Received For (dropdowns)
   - Row 2: Generated From, Generated To, Receive From, Receive To (date pickers)
3. **SHOW entries + SEARCH বার**
4. **টেবিল কলাম**: Transaction For, Transaction Type, To Whom, Generated Amount, Received/Paid Amount, Discount, Payment Method, Created By, Creation Date, Received By, Received Date
5. **Pagination**: "Showing X to Y of Z entries" + Previous/Next

ডাটা সোর্স: `usePayments` hook থেকে transaction হিসেবে ম্যাপ + demo data fallback।

### `src/App.tsx` — রাউট আপডেট
`/dashboard/finance/history` → `FinancialHistoryPage` (placeholder রিপ্লেস)

| ফাইল | কাজ |
|------|-----|
| `src/pages/finance/FinancialHistoryPage.tsx` | নতুন — Financial Transactions পেইজ |
| `src/App.tsx` | রাউট আপডেট |

