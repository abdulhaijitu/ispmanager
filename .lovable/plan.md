

# Billing List পেইজ রিডিজাইন (রেফারেন্স ইমেজ অনুসারে)

## পরিবর্তন

### `src/pages/Billing.tsx`

**১. অ্যাকশন বাটন সারি (হেডারের নিচে):**
- Generate Excel, Generate PDF, Sync Clients & Servers, Disable Selected Clients, Bulk Status Change, Bulk Zone Change ইত্যাদি বাটন গ্রিডে যোগ (রেফারেন্স ইমেজ অনুসারে ৩ সারি)
- `bg-primary text-primary-foreground` স্টাইল, ছোট সাইজের বাটন

**২. সামারি কার্ড রিডিজাইন:**
- বর্তমান ৪টি সাদা কার্ড → ৭টি গ্র্যাডিয়েন্ট কালার কার্ড (PortalManagePage-এর StatCard প্যাটার্ন)
- ১ম সারি (৪টি): Paid Client, Unpaid Client, Received Bill, Due Amount
- ২য় সারি (৩টি): Generated Bill, Advance Amount, Monthly Bill
- প্রতিটিতে আইকন, সংখ্যা এবং সাবটাইটেল

**৩. কলাপসিবল ফিল্টার প্যানেল (Show/Hide):**
- "Show ▼" / "Hide ▲" টগল বাটন (কার্ডের নিচে, সেন্টারে)
- ফিল্টার গ্রিড (৪ সারি, ৬ কলাম): Server, Protocol Type, Profiles, Zone, Sub Zone, Box, Package, Billing Status, Payment Status, Mikrotik Status, Connection Type, Client Type, From Ex.Date, To Ex.Date, From EffectiveTo, To EffectiveTo ইত্যাদি
- সব Select ড্রপডাউন

**৪. SHOW entries + SEARCH বার:**
- বর্তমান ফিল্টার কার্ড সরিয়ে EntriesSearchBar প্যাটার্ন ব্যবহার

**৫. টেবিল হেডার রিডিজাইন:**
- `bg-primary text-primary-foreground` হেডার
- কলাম: C.Code (checkbox), ID/IP, Cus. Name, MobileNumber, Zone, Cus. Type, Conn. Type, Package, Speed, Ex.Date, M.Bill, Received
- Tabs সরিয়ে একটি একক টেবিল ভিউ (ইমেজ অনুসারে)

**৬. ডেমো ডাটা:**
- `demoBillingList` অ্যারে তৈরি (ইমেজের মতো ৬-৮টি এন্ট্রি)
- PaginationInfo যোগ

## বিদ্যমান ফাংশনালিটি
- Invoice Detail Dialog, Record Payment Dialog, Generate Bills Dialog — সব অক্ষত থাকবে
- শুধু UI/লেআউট পরিবর্তন হবে

