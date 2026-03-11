

# System > Automatic Process পেইজ

## রেফারেন্স বিশ্লেষণ
ছবিতে দেখা যাচ্ছে:
- হেডার: "Automatic Process" আইকনসহ + "Application Auto Process and Scheduling" subtitle + breadcrumb
- ৫টি ট্যাব: System, Admin Customer, POP, POP Customer, Bandwidth POP
- Show entries dropdown + Search input
- ডার্ক হেডার টেবিল কলাম: Branch, Process Name, Execute At, Interval, Execution Day, Action
- Mock data: Fund Credit of MAC Resellers (00:15, Daily), Sync All Customer By Servers (Default, Hourly), Generate Monthly Bill (06:00, Daily), Disable Unpaid Customers (12:00, Daily)
- Action কলামে info, view, edit আইকন
- পেজিনেশন

## পরিবর্তন

### `src/pages/system/AutomaticProcessPage.tsx` — নতুন

1. **হেডার**: Wrench আইকন + "Automatic Process" + breadcrumb + subtitle "Application Auto Process and Scheduling"
2. **ট্যাব বার**: System, Admin Customer, POP, POP Customer, Bandwidth POP
3. **টেবিল কার্ড**:
   - Show entries select + Search input
   - ডার্ক হেডার টেবিল: Branch, Process Name, Execute At, Interval, Execution Day, Action
   - প্রতিটি ট্যাবে আলাদা mock data
   - Action কলামে Info (tooltip), View, Edit আইকন বাটন
   - পেজিনেশন footer
4. Local state management

### `src/App.tsx` — রাউট আপডেট
`automatic-process` placeholder → `AutomaticProcessPage`

| ফাইল | কাজ |
|---|---|
| `src/pages/system/AutomaticProcessPage.tsx` | নতুন |
| `src/App.tsx` | রাউট আপডেট |

