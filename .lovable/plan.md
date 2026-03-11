

# Client Type কনফিগারেশন পেইজ

## রেফারেন্স
ছবিতে একটি CRUD টেবিল — Serial, Featured Image, Client Type, Details, Action (Edit/Delete)। `+ Client Type` বাটন, SHOW entries, SEARCH।

## ডিজাইন
ConnectionTypePage-এর প্যাটার্ন অনুসরণ করবো। Featured Image কলামের বদলে একটি Avatar/Icon ব্যবহার করবো (আরও সুন্দর)। Status toggle যুক্ত করবো।

### কলাম:
- # (Serial)
- Client Type নাম
- Details
- Status (Active/Inactive toggle)
- Action (Edit/Delete)

### ফিচার:
- Add/Edit Dialog — নাম + details ফর্ম
- Delete Confirmation
- Search + pagination
- Demo data (ISP Version, PPPOE, Reseller, Corporate Office, Hostel, Home User, etc.)

## ফাইল পরিবর্তন

| ফাইল | কাজ |
|------|-----|
| `src/pages/config/ClientTypePage.tsx` | নতুন — Client Type CRUD পেইজ |
| `src/App.tsx` | রাউট আপডেট — placeholder থেকে নতুন পেইজে |

