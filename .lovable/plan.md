

# Task Management > Task History পেইজ — রেফারেন্স ইমেজ অনুযায়ী

## রেফারেন্স বিশ্লেষণ
ছবিতে: "Task History" হেডার + "Monthly Task History" সাবটাইটেল + breadcrumb। Generate PDF / Generate CSV বাটন। ফিল্টার: Task Category, Zone, Solved By, Clients, From Date, To Date। SHOW entries + SEARCH। টেবিল কলাম: Task Id, ToDo Title, Task Category, Zone, Client, Description, Solved By, Start Time, End Time, Remark, Complete Duration (সবুজ টেক্সট)। ডার্ক নীল হেডার। Pagination footer।

## পরিবর্তন

### `src/pages/support/TaskHistoryPage.tsx` — নতুন পেইজ
1. **হেডার**: আইকন + "Task History" টাইটেল + "Monthly Task History" সাবটাইটেল + breadcrumb
2. **Generate PDF / Generate CSV বাটন** (ডানে)
3. **ফিল্টার সেকশন**: Task Category, Zone, Solved By, Clients (select) + From Date, To Date (date input)
4. **SHOW entries + SEARCH বার**
5. **টেবিল**: Task Id, ToDo Title, Task Category, Zone, Client, Description, Solved By, Start Time, End Time, Remark, Complete Duration — ডার্ক হেডার, Duration সবুজ টেক্সট
6. **Pagination ফুটার**
7. **ডাটা**: Static demo data (ছবির ৩টি এন্ট্রি)

### `src/App.tsx` — রাউট আপডেট
`/dashboard/tasks/history` → `TaskHistoryPage` (placeholder রিপ্লেস)

| ফাইল | কাজ |
|------|-----|
| `src/pages/support/TaskHistoryPage.tsx` | নতুন |
| `src/App.tsx` | রাউট আপডেট |

