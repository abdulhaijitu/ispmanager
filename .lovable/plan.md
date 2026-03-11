

# Connection Type কনফিগারেশন পেইজ

## রেফারেন্স বিশ্লেষণ
ছবিতে একটি সিম্পল CRUD টেবিল দেখা যাচ্ছে:
- Serial, Connection Type, Details, Action (Edit, Delete, Toggle) কলাম
- `+ Connection Type` বাটন, SHOW entries, SEARCH
- প্রতিটি রো-তে Edit/Delete আইকন + Active/Inactive toggle switch

## প্রস্তাবিত ডিজাইন

ZonesPage-এর মতো একই প্যাটার্ন অনুসরণ করবো, তবে ট্যাব ছাড়া (একটি মাত্র entity):

```text
┌─ Page Header ─────────────────────────────────────────┐
│ 🔗 Connection Type   Configure connection types       │
├─ Toolbar ─────────────────────────────────────────────┤
│ Show [10▼] entries       🔍 Search...  [+ Connection] │
├─ Table ───────────────────────────────────────────────┤
│ # │ Connection Type │ Details │ Status │ Action       │
└───────────────────────────────────────────────────────┘
```

### ফিচার:
- CRUD টেবিল — নাম, বিস্তারিত, active/inactive toggle
- Add/Edit Dialog — নাম + details ফর্ম
- Delete Confirmation — ConfirmationDialog
- Toggle switch দিয়ে active/inactive
- Search + pagination
- Demo data সহ local state

## ফাইল পরিবর্তন

| ফাইল | কাজ |
|------|-----|
| `src/pages/config/ConnectionTypePage.tsx` | নতুন — Connection Type CRUD পেইজ |
| `src/App.tsx` | রাউট আপডেট — placeholder থেকে নতুন পেইজে |

