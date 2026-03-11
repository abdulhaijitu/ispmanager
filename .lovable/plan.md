

# Purchase & Vendors > Vendors পেইজ

## রেফারেন্স বিশ্লেষণ
ছবিতে: "Vendor List" হেডার + "All Vendors for Purchase" সাবটাইটেল + breadcrumb (Purchase > Vendor List)। "+ Vendor" বাটন। Show entries + Search বার। টেবিল ৮ কলাম: Logo, Company, Contact Person, Email, Mobile Number, Balance Due, Action (View/Edit/Delete)। ডার্ক হেডার। Pagination।

## পরিবর্তন

### `src/pages/purchase/VendorsPage.tsx` — নতুন
1. **হেডার**: Store আইকন + "Vendor List" টাইটেল + "All Vendors for Purchase" সাবটাইটেল + breadcrumb
2. **"+ Vendor" বাটন** — Dialog দিয়ে নতুন vendor যোগ (Company, Contact Person, Email, Mobile, Address ফিল্ড)
3. **Show entries + Search বার**
4. **টেবিল**: Logo (avatar placeholder), Company, Contact Person, Email, Mobile Number, Balance Due, Action (Eye/Edit/Trash আইকন) — ডার্ক প্রাইমারি হেডার
5. **ডেমো ডাটা**: ৮+ ISP vendor entries (Shadhin Wi Fi, E G Tach Wi Fi, Arifa Network ইত্যাদি রেফারেন্স অনুযায়ী)
6. **Pagination ফুটার**

### `src/App.tsx` — রাউট আপডেট
`/dashboard/purchase/vendors` → `VendorsPage` (placeholder রিপ্লেস)

| ফাইল | কাজ |
|------|-----|
| `src/pages/purchase/VendorsPage.tsx` | নতুন |
| `src/App.tsx` | রাউট আপডেট |

