

# Dashboard পেইজ রিডিজাইন — রেফারেন্স ইমেজ অনুযায়ী

## লক্ষ্য
বর্তমান Dashboard-এর মেট্রিক কার্ড সেকশনকে রেফারেন্স ছবির মতো **4-কলাম কালারফুল গ্রিড লেআউট**-এ রূপান্তর করা, যেখানে ISP-এর সব গুরুত্বপূর্ণ ক্লায়েন্ট ও বিলিং স্ট্যাটিস্টিক্স এক নজরে দেখা যাবে।

## ডিজাইন পরিবর্তন

### নতুন কম্পোনেন্ট: `DashboardStatGrid`

প্রতিটি কার্ডে থাকবে:
- বামে আইকন (বৃত্তাকার, সাদা)
- ডানে: টাইটেল, বড় সংখ্যা, এবং সাবটাইটেল
- ব্যাকগ্রাউন্ড কালার variant অনুযায়ী (teal, green, navy, orange, red, purple)

### মেট্রিক্স গ্রিড (4×5 = ২০টি কার্ড)

```text
Row 1: Total Client | Active/Running | Inactive | Suspended
Row 2: New Client   | Renewed        | Deactivated | Expired
Row 3: Billed       | Paid           | Partially Paid | Unpaid
Row 4: Online       | Blocked        | Bill Expired | Due Clients
Row 5: Collection Rate | Monthly Revenue | Outstanding Due | Bills Generated
```

### কালার স্কিম (theme-aware, CSS variables ব্যবহার)
- **Teal/Primary**: Total, New, Billed, Online — সাধারণ তথ্য
- **Green/Success**: Running, Renewed, Paid — ভালো অবস্থা
- **Navy/Info**: Inactive, Deactivated, Partially Paid — সতর্কতা
- **Red/Danger**: Suspended, Expired, Unpaid, Blocked — সমস্যা

### MetricCard আপডেট
বর্তমান `MetricCard`-এর variant system-এ নতুন `"info"` variant যোগ ও কার্ডের ব্যাকগ্রাউন্ডে সরাসরি কালার ব্যবহার (ছবির মতো solid color background + white text)।

## ফাইল পরিবর্তন

| ফাইল | কাজ |
|------|-----|
| `src/components/dashboard/DashboardStatCard.tsx` | নতুন — solid-color stat card কম্পোনেন্ট (ছবির স্টাইল) |
| `src/pages/Dashboard.tsx` | মেট্রিক সেকশন রিপ্লেস — 4-col grid-এ ২০টি DashboardStatCard |

## ডাটা সোর্স
সব মেট্রিক বর্তমান `customers`, `payments`, `bills` ডাটা থেকে ক্যালকুলেট হবে। নতুন কোনো DB query লাগবে না। কিছু মেট্রিক (Online, Blocked, Renewed, Expired) এখনও ডাটাবেসে নেই — সেগুলো `0` দেখাবে বা কাছাকাছি ফিল্ড ব্যবহার করবে।

