

# Zone / Sub Zone কনফিগারেশন পেইজ ডিজাইন

## রেফারেন্স বিশ্লেষণ
ছবিতে দুটি ট্যাব-ভিত্তিক পেইজ দেখা যাচ্ছে:
- **Zone**: Serial, Zone Name, Details, Action (Edit/Delete)
- **Sub Zone**: Serial, Sub Zone, Zone (parent), Details, Action

প্রতিটি পেইজে: `+ Zone` / `+ Sub Zone` বাটন, SHOW entries ড্রপডাউন, SEARCH ইনপুট, ডার্ক নেভি হেডার টেবিল।

## প্রস্তাবিত ডিজাইন (আরও সুন্দর — Shadcn UI স্টাইলে)

### লেআউট:
```text
┌─ Page Header ──────────────────────────────────────┐
│ 📍 Zone / Sub Zone    Configure zones   [Breadcrumb]│
├─ Tabs ─────────────────────────────────────────────┤
│ [Zone] [Sub Zone] [Box]                             │
├─ Toolbar ──────────────────────────────────────────┤
│ Show [10▼] entries          🔍 Search...  [+ Zone] │
├─ Table ────────────────────────────────────────────┤
│ # │ Name │ Details │ Actions (Edit/Delete)          │
└────────────────────────────────────────────────────┘
```

### ফিচার:
- **Tabs**: Zone, Sub Zone, Box — তিনটি ট্যাব
- **Zone Tab**: CRUD টেবিল — নাম, বিস্তারিত, Edit/Delete
- **Sub Zone Tab**: CRUD টেবিল — নাম, প্যারেন্ট Zone, বিস্তারিত, Edit/Delete
- **Box Tab**: CRUD টেবিল — নাম, Sub Zone, বিস্তারিত, Edit/Delete
- **Add/Edit Dialog**: Form dialog প্রতিটি entity-র জন্য
- **Delete Confirmation**: ConfirmationDialog ব্যবহার
- **Local state** (demo data) — ডাটাবেস টেবিল পরে যোগ হবে

## ফাইল পরিবর্তন

| ফাইল | কাজ |
|------|-----|
| `src/pages/config/ZonesPage.tsx` | নতুন — Zone/Sub Zone/Box ট্যাব পেইজ, CRUD টেবিল, সার্চ, পেজিনেশন |
| `src/App.tsx` | রাউট আপডেট — `/dashboard/config/zones` → `ZonesPage` |

