

# HR & Payroll > Employee List পেইজ — রেফারেন্স ইমেজ অনুযায়ী

## রেফারেন্স বিশ্লেষণ
ছবিতে: "Employee List" হেডার + "View All Employees" সাবটাইটেল + breadcrumb (HR & PAYROLL > Employee List)। STATUS ফিল্টার (Active সিলেক্ট)। SHOW entries + SEARCH। টেবিল কলাম: Name, ID, Mobile No., Office No., Comment, Department, Designation, Position Name, Action (View/Edit/Delete/Calendar আইকন)। ডার্ক নীল হেডার। ডেমো ডাটা ৬+ এন্ট্রি।

## পরিবর্তন

### `src/pages/hr/EmployeeListPage.tsx` — নতুন পেইজ
1. **হেডার**: আইকন + "Employee List" টাইটেল + "View All Employees" সাবটাইটেল + breadcrumb
2. **STATUS ফিল্টার**: Active/Inactive/All সিলেক্ট
3. **SHOW entries + SEARCH বার**
4. **টেবিল**: Name, ID (E0184 ফরম্যাট), Mobile No., Office No., Comment, Department, Designation, Position Name, Action (View/Edit/Delete/Attendance আইকন) — ডার্ক হেডার
5. **Pagination ফুটার**
6. **ডাটা**: Static demo data (ছবির ৬টি এন্ট্রি)

### `src/App.tsx` — রাউট আপডেট
`/dashboard/hr/employees` → `EmployeeListPage` (placeholder রিপ্লেস)

| ফাইল | কাজ |
|------|-----|
| `src/pages/hr/EmployeeListPage.tsx` | নতুন |
| `src/App.tsx` | রাউট আপডেট |

