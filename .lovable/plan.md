

# Inventory & Assets > Assets পেইজ

## রেফারেন্স বিশ্লেষণ
ছবিতে "Assets" হেডার + "Asset Items" সাবটাইটেল + breadcrumb। ফিল্টার: Assigned By (Select), From Date, To Date। Generate PDF / Generate CSV বাটন। Show entries dropdown + Search বার। টেবিল ৬ কলাম: Sr., Item Name, Serial/Quantity, Assigning Date, Assigned By, Remarks। ডার্ক হেডার। Pagination।

## পরিবর্তন

### `src/pages/inventory/AssetsPage.tsx` — নতুন
1. **হেডার**: LayoutGrid আইকন + "Assets" টাইটেল + "Asset Items" সাবটাইটেল + breadcrumb (Inventory > Assets)
2. **Generate PDF / Generate CSV বাটন**
3. **ফিল্টার**: Assigned By (Select), From Date, To Date
4. **Show entries + Search বার**
5. **টেবিল**: Sr., Item Name, Serial/Quantity, Assigning Date, Assigned By, Remarks — ডার্ক প্রাইমারি হেডার (`bg-primary`)
6. **ডেমো ডাটা**: ১০+ ISP-related asset entries (OLT, Router, Splitter, Cable, PC ইত্যাদি)
7. **Pagination ফুটার**

### `src/App.tsx` — রাউট আপডেট
`/dashboard/inventory/assets` → `AssetsPage` (placeholder রিপ্লেস)

| ফাইল | কাজ |
|------|-----|
| `src/pages/inventory/AssetsPage.tsx` | নতুন |
| `src/App.tsx` | রাউট আপডেট |

