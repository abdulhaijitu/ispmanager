

# HR & Payroll > Salary Sheet পেইজ — রেফারেন্স ইমেজ অনুযায়ী

## রেফারেন্স বিশ্লেষণ
ছবিতে: "Salary" হেডার + "View Salary List" সাবটাইটেল + breadcrumb। ৩টি ট্যাব: Salary Payment History, Payroll wise salary sheet, Employee wise salary sheet। ফিল্টার: Payroll Type, Periods, Employee, Paid By + From Date, To Date। Generate PDF / Generate Excel বাটন। SHOW entries + SEARCH। টেবিল: Date, Employee Id, Employee Name, Salary Period, Net Salary, Paid Salary, Remarks, Paid By। Total ফুটার রো। Pagination।

## পরিবর্তন

### `src/pages/hr/SalarySheetPage.tsx` — নতুন পেইজ
EmployeeListPage প্যাটার্ন অনুসরণ করে:
1. **হেডার**: আইকন + "Salary" টাইটেল + "View Salary List" সাবটাইটেল + breadcrumb
2. **৩টি ট্যাব** (Tabs কম্পোনেন্ট): Salary Payment History, Payroll wise salary sheet, Employee wise salary sheet
3. **ফিল্টার সেকশন**: Payroll Type, Periods, Employee, Paid By (Select) + From Date, To Date (Input date)
4. **Generate PDF / Generate Excel বাটন**
5. **SHOW entries + SEARCH**
6. **টেবিল**: Date, Employee Id, Employee Name, Salary Period, Net Salary, Paid Salary, Remarks, Paid By — ডার্ক হেডার
7. **Total ফুটার রো** (Net Salary + Paid Salary যোগফল)
8. **Pagination ফুটার**
9. **ডেমো ডাটা**: ৪-৫টি এন্ট্রি

### `src/App.tsx` — রাউট আপডেট
`/dashboard/hr/salary` → `SalarySheetPage`

| ফাইল | কাজ |
|------|-----|
| `src/pages/hr/SalarySheetPage.tsx` | নতুন |
| `src/App.tsx` | রাউট আপডেট |

