

# SMS Service > Send SMS পেইজ

## রেফারেন্স বিশ্লেষণ
**ছবি ১ (Individual SMS):** "Send To" ফিল্ড (কমা-সেপারেটেড নম্বর), "Select Template" ড্রপডাউন, Length ও Cost ফিল্ড (readonly), ডান পাশে "SMS Description" টেক্সটএরিয়া, নিচে "Send" বাটন।

**ছবি ২-৩ (Group SMS / Send SMS):** "Template" সিলেক্ট, "Message" টেক্সটএরিয়া, বামে "Groups" টেবিল (checkbox + name — All Client, Paid Client, Due Client, etc.), ডানে "Users" টেবিল (checkbox, Name, Mobile), নিচে "Transfer" বাটন, "Total Client" ও "Selected Client" কাউন্টার, "Send Message" বাটন।

## পরিকল্পনা
`/dashboard/sms/send` placeholder-কে দুই ট্যাবের পেইজে রূপান্তর: **"Individual SMS"** ও **"Group SMS"**।

## পরিবর্তন

### `src/pages/sms/SendSmsPage.tsx` — নতুন
1. **হেডার**: MessageSquare আইকন + "Send SMS" + breadcrumb
2. **দুই ট্যাব**: "Individual SMS" ও "Group SMS"

3. **Individual SMS ট্যাব** (2-column layout):
   - বাম: Send To input (placeholder: comma-separated numbers), Select Template dropdown, Length (readonly), Cost (readonly)
   - ডান: SMS Description textarea (tall)
   - নিচে: Send বাটন

4. **Group SMS ট্যাব** (2-column layout):
   - উপরে: Template select + Message textarea
   - বাম: Groups টেবিল (dark header, checkbox + group name) — demo groups: All Client, Paid Client, Due Client, Collected Client, Unpaid Client, Active Client, Inactive Client, Reseller, etc.
   - ডান: Users টেবিল (dark header, checkbox + Name + Mobile) — selected group-এর users দেখাবে
   - নিচে বামে: "Transfer" বাটন
   - নিচে ডানে: Total Client ও Selected Client কাউন্টার + "Send Message" বাটন

### `src/App.tsx` — রাউট আপডেট
`/dashboard/sms/send` → `SendSmsPage`

| ফাইল | কাজ |
|------|-----|
| `src/pages/sms/SendSmsPage.tsx` | নতুন |
| `src/App.tsx` | রাউট আপডেট |

