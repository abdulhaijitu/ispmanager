

# SMS Service > SMS Gateway Setup পেইজ

## রেফারেন্স বিশ্লেষণ
ছবিতে: "SMS Service - SMS Gateway Setup" হেডার + breadcrumb। ৪টি কালারফুল স্ট্যাট কার্ড (SMS Balance=green, Todays Send=teal, This Month Send=orange, This Month Failed=red)। "SMS Settings" সেকশন (dark header bar) — 2x2 grid: SMS Provider (select), SMS User Name, SMS Sender, SMS Password। "Update Company Information" বাটন।

## পরিবর্তন

### `src/pages/sms/SmsGatewayPage.tsx` — নতুন তৈরি
1. **হেডার**: Settings আইকন + "SMS Gateway Setup" + breadcrumb (SMS Service > SMS Gateway Setup)
2. **৪টি স্ট্যাট কার্ড** (colorful solid backgrounds):
   - SMS Balance (green) — Mail icon, count, "Total SMS Remaining Balance"
   - Todays Send (teal) — CheckCircle icon, count, "Total SMS Send Today"
   - This Month Send (orange) — count, "Total SMS Send in This Month"
   - This Month Failed (red/coral) — X icon, count, "Total SMS Sending Failed in This Month"
3. **SMS Settings সেকশন** (dark header bar "SMS Settings"):
   - 2-column form: SMS Provider (Select dropdown), SMS User Name (Input), SMS Sender (Input), SMS Password (password Input)
   - "Update Company Information" বাটন (teal/primary)
4. সব ডেমো ডাটা, toast on save

### `src/App.tsx` — রাউট আপডেট
`/dashboard/sms/gateway` → `SmsGatewayPage` (placeholder রিপ্লেস)

| ফাইল | কাজ |
|------|-----|
| `src/pages/sms/SmsGatewayPage.tsx` | নতুন |
| `src/App.tsx` | রাউট আপডেট |

