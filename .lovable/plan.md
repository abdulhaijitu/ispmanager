

# Daily Bill Collection পেইজ — রেফারেন্স ইমেজ অনুযায়ী

## রেফারেন্স বিশ্লেষণ
ছবিতে Daily Bill Collection পেইজ দেখা যাচ্ছে:
- **৩টি ট্যাব**: Collected Bills, Webhook Payments, Paybill Payments
- **৩টি স্ট্যাট কার্ড**: Receive (সবুজ-নীল), Discount (টিল), Due (বেগুনি)
- **অ্যাকশন বাটন**: Generate CSV, Generate PDF, + Receive Bill, Approve Selected Transaction, Delete Selected Transaction
- **ফিল্টার**: Username, From Date, To Date, Received By, Approved By, Created By, Trans. Status, Payment Method
- **SHOW entries + SEARCH**
- **টেবিল কলাম**: Date, C.Code, UserName, Cus.Name, MobileNo, Note/Remarks, M.Bill, Received, VAT, Discount, BalanceDue, PaymentMethod, ReceivedBy, ApprovedBy, CreatedBy, Action, Checkbox

## ডিজাইন
existing প্যাটার্ন অনুসরণ — LeftClientsPage/ChangeRequestPage-এর মতো ফিল্টার বার + টেবিল + Pagination। Real data থেকে payments hook ব্যবহার করে daily collected bills দেখাবো।

### ফাইল পরিবর্তন

| ফাইল | কাজ |
|------|-----|
| `src/pages/billing/DailyCollectionPage.tsx` | নতুন — Daily Bill Collection পেইজ |
| `src/App.tsx` | রাউট আপডেট — placeholder → `DailyCollectionPage` |

### পেইজ স্ট্রাকচার:
1. **হেডার**: "Daily Bill Collection" + breadcrumb
2. **ট্যাব বার**: Collected Bills (active), Webhook Payments, Paybill Payments
3. **৩টি স্ট্যাট কার্ড**: Receive total, Discount total, Due total — gradient backgrounds
4. **অ্যাকশন বাটন**: Generate CSV, Generate PDF, + Receive Bill, Approve Selected, Delete Selected
5. **ফিল্টার ২ সারি**: Username dropdown, From/To Date pickers, Received By, Approved By, Created By, Trans Status, Payment Method
6. **SHOW entries + SEARCH**
7. **টেবিল**: Date, C.Code, UserName, Cus.Name, MobileNo, Note/Remarks, M.Bill, Received, VAT, Discount, BalanceDue, PaymentMethod, ReceivedBy, ApprovedBy, CreatedBy, Action (checkbox)
8. **Pagination**: Showing X to Y of Z + First/Prev/Next/Last

### ডাটা সোর্স:
- `usePayments` hook থেকে real payment data
- Stats calculated from payments (total received, discount placeholder, due from bills)
- Demo data fallback for fields not in DB (VAT, Discount, ReceivedBy, ApprovedBy)

