

# OLT Users পেইজ — রেফারেন্স ইমেজ অনুযায়ী

## রেফারেন্স বিশ্লেষণ
ছবিতে: "OLT — OLT Users" হেডার + breadcrumb (OLT > OLT Users)। ৪টি স্ট্যাটিস্টিক কার্ড (গ্র্যাডিয়েন্ট ব্যাকগ্রাউন্ড): Online (0, সবুজ-নীল), Offline (0, সায়ান), dBm 24+ (0, বেগুনি), Total OLT (6, ডার্ক)। "Show" বাটন। SHOW entries + SEARCH বক্স। টেবিল কলাম: #, Client Code, UserName, Client Name, MacAddress, IpAddress, OLTName, OpticalPower, OnuMacaddress, OLTPort, OnuStatus, Description, LastDeregisterTime, Distance, DeregisterReason, Last Synced Time, Previous Snapshot, Action। Empty state: "No data available in table"। Pagination footer।

## পরিবর্তন

### `src/pages/OltUsersPage.tsx` — নতুন পেইজ
1. **হেডার**: আইকন + "OLT" টাইটেল + "OLT Users" সাবটাইটেল + breadcrumb
2. **৪টি স্ট্যাট কার্ড**: Online Clients (সবুজ-সায়ান গ্র্যাডিয়েন্ট), Offline Clients (সায়ান), dBm 24+ / Very weak signal (বেগুনি), Total OLT (ডার্ক) — `useAllCustomerOnus` ও `useOltDevices` থেকে ডাটা
3. **"Show" টগল বাটন**: কার্ড সেকশন collapse/expand
4. **ফিল্টার বার**: SHOW entries সিলেক্ট + SEARCH ইনপুট
5. **টেবিল**: #, Client Code, UserName, Client Name, MacAddress, IpAddress, OLTName, OpticalPower, OnuMacaddress, OLTPort, OnuStatus, Description, LastDeregisterTime, Distance, DeregisterReason, Last Synced Time, Previous Snapshot, Action — horizontal scroll
6. **ফুটার**: Showing X to Y of Z entries + First/Previous/Next/Last pagination
7. **ডাটা**: `useAllCustomerOnus` + `useOltDevices` hooks থেকে real data

### `src/App.tsx` — রাউট আপডেট
`/dashboard/olt/users` → `OltUsersPage` (placeholder রিপ্লেস)

| ফাইল | কাজ |
|------|-----|
| `src/pages/OltUsersPage.tsx` | নতুন |
| `src/App.tsx` | রাউট আপডেট |

