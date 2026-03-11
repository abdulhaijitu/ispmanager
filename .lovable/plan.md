

# MAC Reseller > Package / Tariff পেইজ

## রেফারেন্স বিশ্লেষণ
**ছবি ১ (Package Configuration):** হেডারে "Package Configuration" + breadcrumb। "+ Package" বাটন। Show entries + Search। টেবিল কলাম: Serial No, Package Name, Bandwidth_Allocation MB, Package Details, Action (Edit/Delete)। ডার্ক নেভি হেডার।

**ছবি ২ (POP Tariffs):** হেডারে "POP Tariffs" + breadcrumb। "+ Add Tariff" বাটন। Show entries + Search। টেবিল: S/N, Tariff Name, Assigned POPs, Packages, Servers, Profiles, CreatedOn, CreatedBy, DeletedPackageInfo, Action (multiple icon buttons)।

## পরিকল্পনা
বর্তমানে `/dashboard/resellers/tariff` একটি placeholder। এটিকে দুইটি ট্যাব দিয়ে তৈরি করা হবে — **"Packages"** ও **"Tariff Config"** — উভয় রেফারেন্স ছবির ডিজাইন একই পেইজে।

## পরিবর্তন

### `src/pages/reseller/ResellerPackageTariffPage.tsx` — নতুন
1. **হেডার**: Package আইকন + "Package / Tariff" টাইটেল + breadcrumb (MACReseller > Package / Tariff)
2. **Tabs**: "Packages" ও "Tariff Config"
3. **Packages ট্যাব**:
   - "+ Package" বাটন
   - Show entries + Search
   - ডার্ক হেডার টেবিল: Serial, Package Name, Bandwidth (MB), Package Details, Action (Edit/Delete icons)
   - Demo data সহ
   - Pagination footer
4. **Tariff Config ট্যাব**:
   - "+ Add Tariff" বাটন
   - Show entries + Search
   - ডার্ক হেডার টেবিল: S/N, Tariff Name, Assigned POPs, Packages, Servers, Profiles, Created On, Created By, Action (multiple icons)
   - Demo data সহ
   - Pagination footer

### `src/App.tsx` — রাউট আপডেট
`/dashboard/resellers/tariff` → `ResellerPackageTariffPage` (placeholder রিপ্লেস)

| ফাইল | কাজ |
|------|-----|
| `src/pages/reseller/ResellerPackageTariffPage.tsx` | নতুন |
| `src/App.tsx` | রাউট আপডেট |

