
# Package পেইজ রিডিজাইন — রেফারেন্স ইমেজ অনুযায়ী

## রেফারেন্স বিশ্লেষণ
ছবিতে একটি সিম্পল টেবিল-ভিউ দেখা যাচ্ছে: Serial, Package Name, Package Type (Personal/Business badge), B. Allocated MB, Price, VAS, Description, Action (Edit/Delete icons)। উপরে SHOW entries dropdown + SEARCH বার। নিচে pagination। "+ Package" বাটন উপরে ডানে।

## পরিবর্তন

### `src/pages/Packages.tsx` — সম্পূর্ণ রিডিজাইন

রেফারেন্সের মতো টেবিল-ফোকাসড লেআউট:

1. **হেডার**: "Package — Configure Package" টাইটেল + breadcrumb + "+ Package" বাটন
2. **SHOW entries + SEARCH বার** (টেবিলের উপরে)
3. **টেবিল কলাম**: Serial, Package Name, Package Type (Personal/Business badge — green/orange), B. Allocated MB (speed থেকে), Price, VAS, Description, Action (Edit/Delete আইকন)
4. **Pagination**: "Showing 1 to X of Y entries" + First/Previous/1/2/3/Next/Last
5. Stats cards রিমুভ, card view রিমুভ — শুধু টেবিল ভিউ
6. সব existing CRUD logic (create/edit/delete/sync) অপরিবর্তিত রাখা হবে

### নতুন ফিল্ড ম্যাপিং
- Package Type → নতুন ফিল্ড নেই DB-তে, demo হিসেবে alternate Personal/Business দেখাবো
- B. Allocated MB → validity_days ব্যবহার অথবা speed parse
- VAS → mikrotik_address_pool বা empty
- Description → mikrotik_rate_limit + profile info combined

### ফাইল পরিবর্তন

| ফাইল | কাজ |
|------|-----|
| `src/pages/Packages.tsx` | টেবিল-ফোকাসড রিডিজাইন, SHOW/SEARCH/Pagination যোগ |
