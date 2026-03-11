

# Balance Sheet পেইজ — রেফারেন্স ইমেজ অনুযায়ী

## রেফারেন্স বিশ্লেষণ
ছবিতে **Balance Sheet** পেইজ: breadcrumb (Accounting Report > Balance Sheet), "Till Date" ডেট পিকার + "Update Report" ও "Clear Filters" বাটন, Generate PDF/CSV। মূল কন্টেন্ট হলো হায়ারার্কিক্যাল অ্যাকাউন্ট ভিউ — তিনটি প্রধান সেকশন: **Asset**, **Liabilities**, **Owner's Equity**। প্রতিটি সেকশনে ডার্ক ব্যানার হেডার, তার নিচে সাব-ক্যাটাগরি (light gray ব্যাকগ্রাউন্ড), অ্যাকাউন্ট রো (Name — Amount), সাব-টোটাল রো, এবং সেকশন টোটাল রো। নিচে একটি info নোট: "Income and expenses are not shown on the balance sheet. Go to Profit Loss to view."

## পরিবর্তন

### `src/pages/finance/BalanceSheetPage.tsx` — নতুন পেইজ

1. **হেডার**: "Balance Sheet" + "Accounting Report" সাবটাইটেল + breadcrumb + Generate PDF/CSV বাটন
2. **ফিল্টার**: "Till Date" ডেট পিকার + "Update Report" (primary) + "Clear Filters" বাটন
3. **হায়ারার্কিক্যাল সেকশন** (Chart of Accounts ডাটা থেকে):
   - **Asset** (ডার্ক ব্যানার): Cash & Bank, Depreciation & Amortization, Expected Payments from Customers, Inventory, Fixed Assets → প্রতিটিতে সাব-ক্যাটাগরি হেডার, অ্যাকাউন্ট রো (Name | Amount), সাব-টোটাল, সেকশন Total Asset
   - **Liabilities** (ডার্ক ব্যানার): Customer Prepayments, Due For Payroll, Expected Payments to Vendors → সাব-টোটাল, Total Liabilities
   - **Owner's Equity** (ডার্ক ব্যানার): Business Owner Contribution & Drawing, Retained Earnings → সাব-টোটাল, Total Owner's Equity
4. **ফুটার নোট**: "Income and expenses are not shown on the balance sheet. Go to Profit Loss to view."
5. **ডাটা**: Static demo data (Chart of Accounts-এর সাথে সামঞ্জস্যপূর্ণ)

### `src/App.tsx` — রাউট আপডেট
`/dashboard/accounting/balance-sheet` → `BalanceSheetPage` (placeholder রিপ্লেস)

| ফাইল | কাজ |
|------|-----|
| `src/pages/finance/BalanceSheetPage.tsx` | নতুন — Balance Sheet পেইজ |
| `src/App.tsx` | রাউট আপডেট |

