

# Portal Manage পেজ তৈরি — রেফারেন্স ইমেজ অনুসারে

## সারাংশ
রেফারেন্স ইমেজ অনুযায়ী একটি নতুন **Portal Management** পেজ তৈরি হবে যেখানে ৫টি ট্যাব থাকবে: Notices, Media Servers, News & Events, Speed Test Server, এবং Registered Clients। বামে ভার্টিক্যাল ট্যাব মেনু এবং ডানে কন্টেন্ট এরিয়া।

## পরিবর্তন সমূহ

### 1. `src/pages/portal-manage/PortalManagePage.tsx` — নতুন পেজ তৈরি
- **হেডার**: ডার্ক ব্যাকগ্রাউন্ড (`bg-primary`) — আইকন + "Client" + "Portal Management" সাবটাইটেল, ডানে ব্রেডক্রাম্ব (Client > Portal Manage)
- **লেআউট**: বামে ভার্টিক্যাল ট্যাব সাইডবার (Notices, Media Servers, News & Events, Speed Test Server, Registered Clients) + ডানে কন্টেন্ট এরিয়া
- **৫টি ট্যাব কন্টেন্ট:**

**Notices ট্যাব:**
- "Generate PDF" ও "Generate CSV" বাটন (বামে) + "+ New Notice" বাটন (ডানে)
- SHOW __ ENTRIES + SEARCH বার
- ডার্ক হেডার টেবিল: Sr., Title, Details, CreatedOn, CreatedBy, Action (Edit/Delete)
- ডেমো ডাটা সহ, পেজিনেশন

**Media Servers ট্যাব:**
- সাব-ট্যাব: "Server Categories" ও "Media Servers"
- "+ Add Server Category" বাটন
- টেবিল: Sr., Media Category, Description, Action (Edit/Delete)

**News & Events ট্যাব:**
- "Generate PDF" ও "Generate CSV" বাটন + "+ News & Events" বাটন
- টেবিল: Sr., Photo, Title, Details, CreatedOn, CreatedBy, Action

**Speed Test Server ট্যাব:**
- "SET DEMO/CUSTOM SPEED TEST?" লেবেল সহ রেডিও গ্রুপ (Demo Speed Test / Custom Speed Test)
- "Save or Update" বাটন

**Registered Clients ট্যাব:**
- ৩টি গ্র্যাডিয়েন্ট স্ট্যাট কার্ড (Total Registered, App Users, Non-App Users)
- USER TYPE ফিল্টার ড্রপডাউন
- SHOW __ ENTRIES + SEARCH বার
- ডার্ক হেডার টেবিল: Sr., DateTime, C.Code, ID/IP, Name, MobileNo., Zone, C.Type, Package/Speed, Server, B.Status, L.Status (Switch), RegisteredOn, Is App User, Action

### 2. `src/App.tsx` — রুট যোগ
- `import PortalManagePage`
- `/dashboard/portal-manage` রুট যোগ

### 3. `src/components/layout/DashboardSidebar.tsx` — নেভিগেশন যোগ
- Clients গ্রুপের নিচে "Portal Manage" আইটেম যোগ (`/dashboard/portal-manage`, `Globe` আইকন)

