

# Client List পেইজ রিডিজাইন — রেফারেন্স ইমেজ অনুসারে

## পরিবর্তন সমূহ

### 1. `src/components/customers/CustomerFilters.tsx` — সম্পূর্ণ পুনর্লিখন
রেফারেন্স ইমেজ অনুযায়ী ফিল্টার সেকশনটি একটি **কলাপসিবল মাল্টি-রো গ্রিড** ফরম্যাটে তৈরি হবে:

- **৩ সারি ফিল্টার ড্রপডাউন** (৬-কলাম গ্রিড):
  - Row 1: Server, Protocol Type, Profile, Zone, Sub Zone, Box
  - Row 2: Package, Client Type, Connection Type, B.Status, M.Status
  - Row 3: Asgn.Cus.For, Custom Status, From Date, To Date
- **Hide/Show টগল বাটন** — ফিল্টার প্যানেল কলাপসিবল
- নিচে **SHOW ___ ENTRIES** সিলেক্ট (বামে) + **SEARCH** ইনপুট (ডানে)

### 2. `src/components/customers/CustomerTable.tsx` — ডার্ক হেডার ও কলাম আপডেট
- টেবিল হেডার `bg-primary text-primary-foreground` (ডার্ক থিম)
- চেকবক্স কলাম যোগ (বামে)
- কলামসমূহ ইমেজ অনুযায়ী: C.Code, ID/IP, Password (masked), Cus. Name, Mobile, Zone, Conn. Type, Cus. Type, Package/Speed, M.Bill, MAC Addrs, Server, B.Status, M.Status
- Password কলামে masked dots + eye icon
- M.Status কলামে Switch + Active/Inactive label

### 3. `src/pages/Customers.tsx` — ফিল্টার ইন্টিগ্রেশন আপডেট
- নতুন ফিল্টার স্টেটে অতিরিক্ত ফিল্ড যোগ (server, protocolType, zone, subZone, connectionType ইত্যাদি)
- `pageSize` ও `search` আলাদাভাবে ফিল্টার বারে পাস করা
- অ্যাকশন বাটন বারে "Unbind All PPOE MAC Address" ও "Bind All PPOE MAC Address" যোগ

