

# Support History পেইজ — রেফারেন্স ইমেজ অনুযায়ী

## রেফারেন্স বিশ্লেষণ
ছবিতে: ৩টি ট্যাব (Client's, POP's, Bandwidth POP's) + Generate PDF/CSV বাটন। ৪টি স্ট্যাট কার্ড: Total Tickets (নীল), From Client Portal (সবুজ), From Admin Portal (লাল/কমলা), Ticket's Priority (ডার্ক, H:0 M:0 L:0)। ফিল্টার: FROM DATE, TO DATE, SOLVED BY, PROBLEM CATEGORY, ZONE। SHOW entries + SEARCH। টেবিল কলাম: Sr.No., Date, TicketNo., ClientCode, Username, MobileNo., Zone, Category, Solve Time, Solved By, Duration, Ticketing Info। Pagination footer।

## পরিবর্তন

### `src/pages/support/SupportHistoryPage.tsx` — নতুন পেইজ
1. **হেডার**: breadcrumb + আইকন + "Support & Ticketing" টাইটেল + "Support History" সাবটাইটেল
2. **ট্যাব বার**: Client's, POP's, Bandwidth POP's + Generate PDF / Generate CSV বাটন (ডানে)
3. **৪টি গ্র্যাডিয়েন্ট স্ট্যাট কার্ড**: Total Tickets (নীল), From Client Portal (সবুজ), From Admin Portal (কমলা-লাল), Ticket's Priority (ডার্ক — H:0 M:0 L:0 দেখাবে)
4. **ফিল্টার সেকশন**: From Date, To Date (date input), Solved By (select), Problem Category (select), Zone (select)
5. **SHOW entries + SEARCH বার**
6. **টেবিল**: Sr.No., Date, TicketNo., ClientCode, Username, MobileNo., Zone, Category, Solve Time, Solved By, Duration, Ticketing Info — ডার্ক হেডার
7. **Pagination ফুটার**: Showing X to Y of Z entries + First/Previous/Next/Last
8. **ডাটা**: Static demo data

### `src/App.tsx` — রাউট আপডেট
`/dashboard/support/history` → `SupportHistoryPage` (placeholder রিপ্লেস)

| ফাইল | কাজ |
|------|-----|
| `src/pages/support/SupportHistoryPage.tsx` | নতুন |
| `src/App.tsx` | রাউট আপডেট |

