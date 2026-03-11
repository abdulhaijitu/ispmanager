

# System > VAT Setup পেইজ

## রেফারেন্স বিশ্লেষণ
ছবিতে দেখা যাচ্ছে:
- হেডার: "Payment VAT" আইকনসহ + "Setting Up Payment VAT" subtitle + breadcrumb
- ডার্ক হেডার বার: "VAT settings"
- Bordered সেকশন: "Vat Settings" for all user
- User Type dropdown (Select, AdminCustomer, MACReseller, MACResellerCustomer, BandwidthReseller)
- User Type সিলেক্ট করলে VAT percentage/amount ইনপুট দেখাবে
- Info tooltip: "Select user for individual vat setup"

## পরিবর্তন

### `src/pages/system/VatSetupPage.tsx` — নতুন

1. **হেডার**: Receipt আইকন + "Payment VAT" + breadcrumb + subtitle "Setting Up Payment VAT"
2. **VAT Settings কার্ড** (dark header bar "VAT settings"):
   - Bordered section: "Vat Settings" for all user
   - User Type dropdown: AdminCustomer, MACReseller, MACResellerCustomer, BandwidthReseller
   - User Type সিলেক্ট করলে VAT percentage input + Save বাটন
   - Info tooltip text: "Select user for individual vat setup"
3. Local state management

### `src/App.tsx` — রাউট আপডেট
`vat-setup` placeholder → `VatSetupPage`

| ফাইল | কাজ |
|---|---|
| `src/pages/system/VatSetupPage.tsx` | নতুন |
| `src/App.tsx` | রাউট আপডেট |

