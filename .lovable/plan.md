

# System > Payment Gateways পেইজ

## রেফারেন্স বিশ্লেষণ
ছবিতে দেখা যাচ্ছে — বাম পাশে গেটওয়ে লিস্ট (SSLCommerz, bKash, Nagad, aamarPay, shurjoPay, etc.) এবং ডান পাশে সিলেক্টেড গেটওয়ের সেটিংস। সেটিংসে ৪টি সেকশন:

1. **Payment Gateway Information** — Sandbox/Live radio, Store ID/Username, Store Password/API Key
2. **Payment Status & Validation** — Payment Enabled/Disabled toggle
3. **Activation & Expiry Date** — দুটি date input
4. **Payment Gateway applicable for** — checkboxes (Admin, POP Portal, Bandwidth POP, POP Client)

## পরিবর্তন

### `src/pages/system/PaymentGatewaysPage.tsx` — নতুন

1. **হেডার**: CreditCard আইকন + "Payment Gateways" + breadcrumb + subtitle "Setting Up Payment Gateways"
2. **লেআউট**: বাম পাশে গেটওয়ে লিস্ট (Card, vertical list with active highlight), ডান পাশে সিলেক্টেড গেটওয়ের settings
3. **গেটওয়ে লিস্ট**: SSLCommerz, bKash, Nagad, aamarPay, shurjoPay, FosterPayments, Walletmix, PhonePe, Razorpay, Rocket, Stripe, Webhook, Paybill — ক্লিক করলে ডান পাশে সেটিংস দেখাবে
4. **Settings প্যানেল** (4 সেকশন bordered cards):
   - **Gateway Information**: Sandbox/Live (RadioGroup), Store ID (Input), Store Password (Input type=password)
   - **Payment Status**: Payment Enabled / Disabled (Switch toggles)
   - **Activation & Expiry Date**: দুটি date input
   - **Applicable for**: Checkboxes — Admin Customer (Portal), POP (Portal), Bandwidth POP (Portal), POP Client (Portal)
5. **"Save or Update" বাটন**
6. Local state management — selected gateway, form fields

### `src/App.tsx` — রাউট আপডেট
`payment-gateways` placeholder → `PaymentGatewaysPage`

| ফাইল | কাজ |
|---|---|
| `src/pages/system/PaymentGatewaysPage.tsx` | নতুন |
| `src/App.tsx` | রাউট আপডেট |

