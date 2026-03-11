

# Daily Expense Sheet পেইজ — রেফারেন্স ইমেজ অনুযায়ী

ছবিতে **Daily Expense Sheet** পেইজ দেখা যাচ্ছে — "All Daily Expenses" সাবটাইটেল। বর্তমানে `/dashboard/finance/expense` রাউটে placeholder আছে। এটি DailyIncomePage-এর মতো প্যাটার্নে তৈরি হবে।

## পরিবর্তন

### `src/pages/finance/DailyExpensePage.tsx` — নতুন পেইজ

রেফারেন্স ইমেজ অনুযায়ী:

1. **হেডার**: "Daily Expense Sheet" + "All Daily Expenses" সাবটাইটেল + breadcrumb (Expense > Daily Expense Sheet)
2. **অ্যাকশন বাটন**: "+ Expense" (primary), Generate PDF, Generate CSV
3. **ফিল্টার বার**: From Date, To Date, Category dropdown, Responsible dropdown
4. **SHOW entries (10/25/50/100) + SEARCH বার**
5. **টেবিল কলাম**: Date, Category, Amount, Details, Responsible, Created By, Action (Edit/Delete)
6. **TOTAL row**: Amount কলামে টোটাল
7. **Pagination**: "Showing X to Y of Z entries" + Previous/Next
8. **"+ Expense" Dialog**: Category, Amount, Responsible, Details ফিল্ডসহ

ডাটা সোর্স: Demo data fallback (expense-specific categories: Office Rent, Salary, Internet Bill, Electricity, Transport, Maintenance ইত্যাদি)।

### `src/App.tsx` — রাউট আপডেট
`/dashboard/finance/expense` → `DailyExpensePage`

| ফাইল | কাজ |
|------|-----|
| `src/pages/finance/DailyExpensePage.tsx` | নতুন — Daily Expense Sheet পেইজ |
| `src/App.tsx` | রাউট আপডেট — placeholder → DailyExpensePage |

