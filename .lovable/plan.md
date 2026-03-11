

# Support Category পেইজ — রেফারেন্স ইমেজ অনুযায়ী

## রেফারেন্স বিশ্লেষণ
ছবিতে: "Support Categories — Configure Support Categories" হেডার + breadcrumb (Configuration > Support Categories)। ৩টি ট্যাব বাটন: Client's, POP's, Bandwidth POP's। "+ Support Category" বাটন। SHOW entries + SEARCH বক্স। টেবিল কলাম: Serial, Support Category, Department, Category Type (badge — "Only For Office" কমলা, "For Everyone" সবুজ), Details, Action (Edit/Delete আইকন)। Static demo data।

## পরিবর্তন

### `src/pages/support/SupportCategoryPage.tsx` — নতুন পেইজ
1. **হেডার**: আইকন + "Support Categories" টাইটেল + "Configure Support Categories" সাবটাইটেল + breadcrumb
2. **ট্যাব বার**: Client's (active, primary), POP's, Bandwidth POP's বাটন + "+ Support Category" বাটন (ডানে)
3. **ফিল্টার বার**: SHOW entries সিলেক্ট + SEARCH ইনপুট
4. **টেবিল**: Serial, Support Category, Department, Category Type (badge), Details, Action (Edit/Delete) — ডার্ক হেডার
5. **ফুটার**: Showing X to Y of Z entries + pagination
6. **ডাটা**: Static demo data (ছবির ৮টি এন্ট্রি)
7. **Add/Edit ডায়ালগ**: Support Category তৈরি/সম্পাদনার জন্য ফর্ম ডায়ালগ

### `src/App.tsx` — রাউট আপডেট
`/dashboard/support/category` → `SupportCategoryPage`

| ফাইল | কাজ |
|------|-----|
| `src/pages/support/SupportCategoryPage.tsx` | নতুন |
| `src/App.tsx` | রাউট আপডেট |

