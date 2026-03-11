

# Trial Balance পেইজ — রেফারেন্স ইমেজ অনুযায়ী

## রেফারেন্স বিশ্লেষণ
ছবিতে **Trial Balance** পেইজ: breadcrumb (Accounting Report > Trial Balance), "Till Date" ডেট পিকার, "Update Report" ও "Clear Filters" বাটন, Generate PDF/CSV। তিনটি কলামের টেবিল: **ACCOUNT**, **DEBIT**, **CREDIT**। ক্যাটাগরি ব্যানার (Asset, Expense, Income, Liabilities, Owner's Equity) — প্রতিটির নিচে অ্যাকাউন্ট রো (নাম লিংক স্টাইলে, ডেবিট ও ক্রেডিট আলাদা কলামে)। প্রতিটি ক্যাটাগরির শেষে Total রো। সবার নিচে "Total for all accounts" রো (ডেবিট ও ক্রেডিট সমান)।

## পরিবর্তন

### `src/pages/finance/TrialBalancePage.tsx` — নতুন পেইজ
1. **হেডার**: "Trial Balance" + "Accounting Report" সাবটাইটেল + breadcrumb + Generate PDF/CSV
2. **ফিল্টার**: "Till Date" ডেট পিকার + "Update Report" + "Clear Filters"
3. **টেবিল হেডার**: ACCOUNT | DEBIT | CREDIT (ডার্ক ব্যাকগ্রাউন্ড)
4. **ক্যাটাগরি সেকশন** (৫টি): Asset, Expense, Income, Liabilities, Owner's Equity — প্রতিটিতে ডার্ক ব্যানার, অ্যাকাউন্ট রো (name link-styled, debit, credit), Total রো
5. **গ্র্যান্ড টোটাল**: "Total for all accounts" রো (ডেবিট ও ক্রেডিট যোগফল)
6. **ডাটা**: Static demo data — Balance Sheet/P&L-এর সাথে সামঞ্জস্যপূর্ণ

### `src/App.tsx` — রাউট আপডেট
`/dashboard/accounting/trial-balance` → `TrialBalancePage` (placeholder রিপ্লেস)

| ফাইল | কাজ |
|------|-----|
| `src/pages/finance/TrialBalancePage.tsx` | নতুন |
| `src/App.tsx` | রাউট আপডেট |

