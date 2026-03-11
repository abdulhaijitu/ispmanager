

# System > Payment Processing Fee পেইজ

## রেফারেন্স বিশ্লেষণ
ছবিতে দেখা যাচ্ছে:
- বাম পাশে ৪টি ট্যাব/লিস্ট: For Admin Customer, For POP, For Bandwidth POP, For POP Customer
- ডান পাশে সিলেক্টেড ট্যাবের সেটিংস — "Payment Processing Fee settings"
- একটি bordered সেকশনে Payment Gateways dropdown + info text
- "Save or Update" বাটন

## পরিবর্তন

### `src/pages/system/PaymentProcessingFeePage.tsx` — নতুন

1. **হেডার**: DollarSign আইকন + "Payment Processing Fee" + breadcrumb + subtitle "Setting Up Payment Processing Fee"
2. **লেআউট**: বাম পাশে customer type লিস্ট (Card, vertical list — Admin Customer, POP, Bandwidth POP, POP Customer), ডান পাশে settings
3. **Settings প্যানেল**:
   - Info header bar: "Payment Processing Fee settings"
   - Bordered section: Set "Payment Fee Settings" for [selected type]
   - Payment Gateways Select dropdown (SSLCommerz, bKash, Nagad, etc.)
   - গেটওয়ে সিলেক্ট করলে fee percentage/fixed amount input দেখাবে
   - Info tooltip text
4. **"Save or Update" বাটন**
5. Local state management

### `src/App.tsx` — রাউট আপডেট
`processing-fee` placeholder → `PaymentProcessingFeePage`

| ফাইল | কাজ |
|---|---|
| `src/pages/system/PaymentProcessingFeePage.tsx` | নতুন |
| `src/App.tsx` | রাউট আপডেট |

