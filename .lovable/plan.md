

# Task Management > Task Category পেইজ — রেফারেন্স ইমেজ অনুযায়ী

## রেফারেন্স বিশ্লেষণ
ছবিতে: "Task Category" হেডার + "Configure Task Category" সাবটাইটেল + breadcrumb। "+ Task Category" বাটন। SHOW entries + SEARCH। টেবিল ৪ কলাম: Serial, Task Category Type, Details, Action (Edit/Delete আইকন)। ডার্ক নীল হেডার। ডাটা: New Line Add, Home shifting, Office Work, bill, Rudra, rbr, SunnyTest, ddd।

## পরিবর্তন

### `src/pages/support/TaskCategoryPage.tsx` — নতুন পেইজ
1. **হেডার**: আইকন + "Task Category" টাইটেল + "Configure Task Category" সাবটাইটেল + breadcrumb
2. **"+ Task Category" বাটন** (ডানে)
3. **SHOW entries + SEARCH বার**
4. **টেবিল**: Serial, Task Category Type, Details, Action (Edit/Delete) — ডার্ক হেডার
5. **Pagination ফুটার**
6. **Add/Edit ডায়ালগ**: Category Name + Details ফর্ম
7. **ডাটা**: Static demo data (ছবির ৮টি এন্ট্রি)

### `src/App.tsx` — রাউট আপডেট
`/dashboard/tasks/category` → `TaskCategoryPage` (placeholder রিপ্লেস)

| ফাইল | কাজ |
|------|-----|
| `src/pages/support/TaskCategoryPage.tsx` | নতুন |
| `src/App.tsx` | রাউট আপডেট |

