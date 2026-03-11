

# Billing Status কনফিগারেশন পেইজ

## রেফারেন্স
ছবিতে CRUD টেবিল — Serial, Customer Billing Status, Details, Action। Demo data: Left, Free, Personal, Inactive, Active।

## ডিজাইন
ClientTypePage/ProtocolTypePage-এর একই প্যাটার্ন অনুসরণ — CRUD টেবিল, Status toggle, Search, Pagination, Add/Edit/Delete dialogs।

### কলাম:
- # (Serial)
- Billing Status নাম
- Details
- Status (Active/Inactive toggle)
- Action (Edit/Delete)

### Demo Data:
Left, Free, Personal, Inactive, Active, Paid, Due, Partial

## ফাইল পরিবর্তন

| ফাইল | কাজ |
|------|-----|
| `src/pages/config/BillingStatusPage.tsx` | নতুন — Billing Status CRUD পেইজ |
| `src/App.tsx` | রাউট আপডেট — placeholder → `BillingStatusPage` |

