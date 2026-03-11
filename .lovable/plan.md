

# Left Clients পেইজ — রেফারেন্স ইমেজ অনুযায়ী

## রেফারেন্স বিশ্লেষণ
ছবিতে Left Clients পেইজ — ফিল্টার বার (Zone, Connection Type, Client Type, Package, Protocol Type, From/To Left Date, Assign Cus For, Recovery Status, Recovered By) এবং একটি বড় টেবিল: Checkbox, C.Code, ID/IP, Client Name, Mobile, Zone, Connection Type, Client Type, Package/Speed, M.Bill, Due, Server, B.Status, Left Date, Action।

## ডিজাইন
NewRequestPage-এর প্যাটার্ন অনুসরণ — ফিল্টার বার + CRUD টেবিল + Search + Pagination। "Assign To Employee", "Generate Excel", "Generate PDF" বাটন উপরে।

### ফিল্টার:
- Zone, Connection Type, Client Type, Package (Row 1)
- Protocol Type, From Left Date, To Left Date, Assign Cus For (Row 2)
- Recovery Status, Recovered By (Row 3)

### টেবিল কলাম:
Checkbox, C.Code, ID/IP, Client Name (with recovery badge), Mobile, Zone, Connection Type, Client Type, Package/Speed, M.Bill, Due, Server, B.Status, Left Date, Action

### Demo Data: 6 left clients with "Recovered" badges

## ফাইল পরিবর্তন

| ফাইল | কাজ |
|------|-----|
| `src/pages/clients/LeftClientsPage.tsx` | নতুন — Left Clients পেইজ |
| `src/App.tsx` | রাউট আপডেট — placeholder → `LeftClientsPage` |

