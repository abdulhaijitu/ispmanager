

# Add New Client পেইজ — রেফারেন্স ইমেজ অনুযায়ী ফুল-পেইজ ফর্ম

## রেফারেন্স বিশ্লেষণ
ছবিতে একটি ফুল-পেইজ মাল্টি-সেকশন ফর্ম দেখা যাচ্ছে (ডায়ালগ নয়), চারটি সেকশনে ভাগ করা:

```text
┌─ Page Header ──────────────────────────────────────────┐
│ 👤 Client  Add New Client          Breadcrumb          │
├─ Section 1: Personal Information (dark header) ────────┤
│ Profile Picture | Customer Name* | Remarks/Special Note│
│                 | Occupation     |                      │
│ NID/Birth Cert No* | NID Picture | Reg Form No | Reg Pic│
│ Gender | Father Name | Date of Birth | Mother Name     │
├─ Section 2: Contact Information (dark header) ─────────┤
│ Map Lat | Mobile* | District | Present Address         │
│ Map Long | Phone  | Upazilla | Permanent Address       │
│ Facebook | Email  | Road No  | [Same as Present ☑]     │
│ LinkedIn | Twitter| House No |                         │
├─ Section 3: Network & Product Info (dark header) ──────┤
│ Server* | Protocol Type* | Zone* [+Zone]               │
│ Sub Zone [+Sub Zone] | Box [+Box] | Connection Type*   │
│ Cable Req | Fiber Code | Num of Core | Core Color      │
│ Device | MAC/Serial | Vendor | Purchase Date           │
├─ Section 4: Service Information (dark header) ─────────┤
│ Client Code* | Package* [+Pkg] | Profile* | Client Type*│
│ Billing Status* | Username/IP* | Password* | Join Date* │
│ Monthly Bill* | Billing Start* | Expire Date* | Ref By │
│ VIP Client? ☑ | Connected By | Assign To              │
│ Affiliator | Send SMS ☑ | Send Greetings ☑            │
├─ Footer ───────────────────────────────────────────────┤
│ [Go To List]                          [Save & Exit]    │
└────────────────────────────────────────────────────────┘
```

## ডিজাইন পদ্ধতি
- ফুল-পেইজ ফর্ম (dialog-based না), `/dashboard/clients/add` রাউটে
- প্রতিটি সেকশনের জন্য dark-themed হেডার (primary bg, white text)
- 4-কলাম grid layout, responsive (md:2, lg:4)
- Profile picture ও NID/Registration picture এর জন্য avatar placeholder
- ড্রপডাউন: Gender, District, Upazilla, Server, Protocol, Zone, Connection Type, Package, Client Type, Billing Status, Vendor, Device, Profile
- Checkbox: VIP Client, Same as Present Address, Send SMS, Send Greetings
- Footer: "Go To List" (navigate to client list) ও "Save & Exit" বাটন
- Local state দিয়ে demo — toast notification on save

## ফাইল পরিবর্তন

| ফাইল | কাজ |
|------|-----|
| `src/pages/clients/AddNewClientPage.tsx` | নতুন — ফুল-পেইজ মাল্টি-সেকশন ক্লায়েন্ট ফর্ম |
| `src/App.tsx` | রাউট আপডেট — placeholder → `AddNewClientPage` |

