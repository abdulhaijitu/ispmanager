

# Accounting Dashboard পেইজ — রেফারেন্স ইমেজ অনুযায়ী

## রেফারেন্স বিশ্লেষণ
ছবিতে **Accounting Dashboard** পেইজ: breadcrumb (Accounts > Accounting Dashboard), date range picker + "Filter by date" বাটন, তিন কলামে কালারফুল গ্র্যাডিয়েন্ট কার্ড গ্রিড — Row 1: Total Income (cyan), Total Expense (cyan), Total Profit (purple gradient); Row 2: Expected Payments from Customers, Expected payments to vendors, Total Upcoming; Row 3+: Cash on Hand, payment method cards (aamarPay, Nagad, bKash, Cash, SSL Commerz etc.)। নিচে Income by Category ও Expense by Category হরাইজন্টাল বার চার্ট, এবং Latest Incomes / Latest Expenses সেকশন।

## পরিবর্তন

### `src/pages/finance/AccountingDashboardPage.tsx` — নতুন পেইজ

1. **হেডার**: "Accounting Dashboard" + breadcrumb (Accounts > Accounting Dashboard)
2. **ফিল্টার**: Date range picker (From–To) + "Filter by date" বাটন
3. **সামারি কার্ড গ্রিড (৩ কলাম, ৬+ সারি)**:
   - Row 1: Total Income (cyan-to-teal gradient), Total Expense (cyan), Total Profit (purple gradient)
   - Row 2: Expected Payments from Customers, Expected payments to vendors, Total Upcoming
   - Row 3: Cash on Hand, payment method summaries (bKash, Nagad, Cash, etc.)
   - প্রতিটি কার্ডে: Title, Amount (৳), Month label, "Filtered Transactions" amount
4. **চার্ট সেকশন**: Income by Category (horizontal bar) + Expense by Category (horizontal bar) — recharts BarChart layout="vertical"
5. **Latest Incomes / Latest Expenses**: দুটি পাশাপাশি সেকশন
6. **ডাটা**: `usePayments` + `useBills` hooks, demo data fallback

### `src/App.tsx` — রাউট আপডেট
`/dashboard/accounting` → `AccountingDashboardPage` (placeholder রিপ্লেস)

| ফাইল | কাজ |
|------|-----|
| `src/pages/finance/AccountingDashboardPage.tsx` | নতুন — Accounting Dashboard |
| `src/App.tsx` | রাউট আপডেট |

