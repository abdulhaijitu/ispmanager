

# MAC Reseller > PGW Settlement পেইজ

## রেফারেন্স বিশ্লেষণ
ছবিতে: "POPs All POPs" হেডার + breadcrumb। তিনটি ট্যাব: "POP PGW Transactions", "Transaction Settlement History", "POP Transactions"। দুইটি ফিল্টার: POP Status ও POP Type (Select)। Show entries + Search। ডার্ক নেভি/টিল হেডার টেবিল কলাম: Code, POP Name, POP Type (Postpaid/Prepaid badge), Mobile, Total Received Amount, Settled Amount, Remaining Amount, Payment Status (Settled/Cash/Fund/No transaction Available badges)।

## পরিবর্তন

### `src/pages/reseller/ResellerPgwSettlementPage.tsx` — নতুন তৈরি
1. **হেডার**: Wallet আইকন + "PGW Transaction Settlement" + breadcrumb (MAC Reseller > PGW Settlement)
2. **৩টি ট্যাব**: "PGW Transactions" (active), "Settlement History", "Reseller Transactions"
3. **PGW Transactions ট্যাব**:
   - ২টি ফিল্টার: Reseller Status (Select) ও Reseller Type (Select)
   - Show entries + Search
   - ডার্ক হেডার টেবিল: Code, Reseller Name, Type (Postpaid/Prepaid badge), Mobile, Total Received, Settled Amount, Remaining, Payment Status (Settled=green, Cash/Fund=teal buttons, No transaction=gray badge)
   - ১২+ demo entries
   - Pagination
4. **Settlement History ট্যাব**: Date, Reseller, Amount, Method, Reference, Status টেবিল
5. **Reseller Transactions ট্যাব**: S/N, Reseller, Transaction ID, Amount, Date, Type, Status টেবিল

### `src/App.tsx` — রাউট আপডেট
`/dashboard/resellers/pgw` → `ResellerPgwSettlementPage` (placeholder রিপ্লেস)

| ফাইল | কাজ |
|------|-----|
| `src/pages/reseller/ResellerPgwSettlementPage.tsx` | নতুন |
| `src/App.tsx` | রাউট আপডেট |

