

# New Request (Client Request) পেইজ

## রেফারেন্স
ছবিতে Client Request পেইজ — ফিল্টার বার (From Date, To Date, Setup Status, Setup By/Assign To, Created By) এবং একটি বড় টেবিল: SN, Cus.Name, Mobile, Address, Zone, Subzone, Cus.Type, Conn.Type, Package, M.Bill, B.Date, OTC, Phy.Connectivity, Created By, Created On, Status, SetUp By, SetUp Time। Status badges (Pending, Processing, Paid, Due), Assign/Re Assign বাটন।

## ডিজাইন

ClientTypePage-এর প্যাটার্ন অনুসরণ করবো কিন্তু অনেক বেশি কলামসহ। ফিচার:

- **ফিল্টার বার**: Date range (From/To), Setup Status dropdown, Assign To dropdown, Created By dropdown
- **টেবিল কলাম**: SN, Customer Name, Mobile, Address, Zone, Subzone, Customer Type, Connection Type, Package, Monthly Bill, Billing Date, OTC, Physical Connectivity, Created By, Created On, Status, Setup By, Setup Time
- **Status Badges**: Pending (orange), Processing (blue), Completed (green), Paid/Due badges
- **Actions**: Edit, Delete, Assign/Re Assign বাটন
- **Demo Data**: 5-6 sample new requests
- Search, SHOW entries, Pagination
- `+ Client Request` বাটন দিয়ে নতুন রিকোয়েস্ট অ্যাড ডায়ালগ

## ফাইল পরিবর্তন

| ফাইল | কাজ |
|------|-----|
| `src/pages/clients/NewRequestPage.tsx` | নতুন — New Client Request পেইজ |
| `src/App.tsx` | রাউট আপডেট — placeholder → `NewRequestPage` |

