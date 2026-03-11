

# Client Support পেইজ — রেফারেন্স ইমেজ অনুযায়ী ডিজাইন

## রেফারেন্স বিশ্লেষণ
ছবিতে: "Support & Ticketing — Daily Support Ticket" হেডার + breadcrumb। ৪টি ট্যাব: Accepted (Client's), Pending (Client's) [2], MAC Reseller's [0], Bandwidth POP's [0]। "+ Open New Ticket" বাটন। ৪টি কালার স্ট্যাট কার্ড: Total Tickets (সবুজ-সায়ান), Pending (গোলাপি), Processing (কমলা-লাল), Solved (নীল-সায়ান)। ফিল্টার সেকশন: Support Category, Zone, Solved By/Assign To, Created By, Status, Priority, From/To Date, Complained No। SHOW entries + SEARCH। টেবিল: TicketNo, ClientCode, ID/IP, CustomerName, Mobile, ComplainNo, Zone, Subzone, Box, Problem, Priority (badge), Complain Time, CreatedBy, Status (badge), Assign To, Solved Time। ডাটা static demo।

## পরিবর্তন

### `src/pages/support/ClientSupportPage.tsx` — নতুন পেইজ তৈরি
1. **হেডার**: আইকন + "Support & Ticketing" টাইটেল + "Daily Support Ticket" সাবটাইটেল + breadcrumb
2. **ট্যাব বার**: Accepted (Client's), Pending (Client's) [badge], MAC Reseller's [badge], Bandwidth POP's [badge] + "+ Open New Ticket" বাটন
3. **৪টি গ্র্যাডিয়েন্ট স্ট্যাট কার্ড**: Total Tickets (টিল), Pending Tickets (গোলাপি), Processing Tickets (কমলা), Solved Tickets (সায়ান)
4. **ফিল্টার সেকশন** (collapsible): Support Category, Zone, Solved By/Assign To, Created By সিলেক্ট + Status, Priority সিলেক্ট + From/To Date ইনপুট + Complained No টেক্সট ইনপুট
5. **SHOW entries + SEARCH বার**
6. **টেবিল**: TicketNo, ClientCode, ID/IP, CustomerName, Mobile, ComplainNo, Zone, Subzone, Box, Problem, Priority (High=লাল, Medium=কমলা badge), Complain Time, CreatedBy, Status (Processing=সায়ান badge), Assign To, Solved Time — horizontal scroll
7. **Pagination ফুটার**
8. **New Ticket ডায়ালগ**: ফর্ম — Customer, Problem, Priority, Description
9. **ডাটা**: Static demo data (ছবির মত ৩-৪টি এন্ট্রি)

### `src/App.tsx` — রাউট আপডেট
`/dashboard/support` → `ClientSupportPage` (placeholder রিপ্লেস)

| ফাইল | কাজ |
|------|-----|
| `src/pages/support/ClientSupportPage.tsx` | নতুন তৈরি |
| `src/App.tsx` | রাউট আপডেট |

