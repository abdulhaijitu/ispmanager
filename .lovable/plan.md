

# Protocol Type কনফিগারেশন পেইজ

## রেফারেন্স
ছবিতে CRUD টেবিল — Serial, Protocol Type, Details, Action (Edit/Delete/Toggle)। `+ Protocol Type` বাটন, SHOW entries, SEARCH।

## ডিজাইন
ClientTypePage/ConnectionTypePage-এর একই প্যাটার্ন — CRUD টেবিল, Status toggle, Search, Pagination, Add/Edit/Delete dialogs। Demo data: Static, Hotspot, PPPOE।

## ফাইল পরিবর্তন

| ফাইল | কাজ |
|------|-----|
| `src/pages/config/ProtocolTypePage.tsx` | নতুন — Protocol Type CRUD পেইজ |
| `src/App.tsx` | রাউট আপডেট — `/dashboard/config/protocol-type` → `ProtocolTypePage` |

