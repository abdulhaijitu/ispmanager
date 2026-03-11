

# MAC Reseller > Reseller List পেইজ রিডিজাইন

## রেফারেন্স বিশ্লেষণ
ছবিতে: ৩টি কালারফুল স্ট্যাট কার্ড (Total POPs/টোটাল রিসেলার, Total POP Client/টোটাল কাস্টমার, Online Clients)। ৭টি ফিল্টার ফিল্ড (Fund Start, POP Type, Login Status, Client Enabled, POP Status, Creation From, Creation To)। Show entries + Search। বিস্তারিত টেবিল: Code, POP Name, POP Type (Badge), ContactPerson, Server Name, Mobile, Company Name, Level, TariffName, Clients(Running), Clients(Enabled), Clients(Disabled), Clients(Left), RemainingFund, ClientEnabled (toggle), FundStart (toggle), IsLocked? (toggle), Action।

## পরিবর্তন

### `src/pages/Resellers.tsx` — রিডিজাইন
1. **স্ট্যাট কার্ড**: ৩টি গ্র্যাডিয়েন্ট কালারফুল কার্ড (teal/cyan/purple) — Total Resellers, Total Customers, Active Resellers — আইকন সহ
2. **ফিল্টার সেকশন**: ২ সারিতে ৭টি ফিল্টার — Commission Type, Status, Fund Status, Level, Creation From, Creation To + existing search
3. **Show entries + Search বার**
4. **টেবিল হেডার**: `bg-primary text-primary-foreground` ডার্ক হেডার
5. **টেবিল কলাম বাড়ানো**: Code (#), Name, Commission Type (Badge), Contact (Phone), Email, Customers (Running), Wallet Balance, Commission Earned, Status (Badge), Fund Enabled (Switch-style), Action
6. **"+ POP" স্টাইল বাটন** → "+ Reseller"
7. **Pagination ফুটার**

| ফাইল | কাজ |
|------|-----|
| `src/pages/Resellers.tsx` | রিডিজাইন |

