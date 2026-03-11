

# সাইডবারে Menu Search যুক্ত করা

## পরিবর্তন

### `src/components/layout/DashboardSidebar.tsx`

Logo সেকশনের পরে এবং Dashboard লিঙ্কের আগে একটি সার্চ ইনপুট যুক্ত হবে:

1. `Search` আইকন import যোগ
2. `useState` দিয়ে `menuSearch` state তৈরি
3. সাইডবার open থাকলে একটি compact সার্চ ইনপুট দেখাবে (placeholder: "Search menu...")। collapsed অবস্থায় শুধু সার্চ আইকন বাটন দেখাবে যা ক্লিক করলে সাইডবার open হবে
4. সার্চ টার্ম অনুযায়ী nav items ও groups ফিল্টার হবে — ম্যাচিং আইটেমগুলো ফ্ল্যাট লিস্টে দেখাবে, সার্চ খালি থাকলে স্বাভাবিক গ্রুপড নেভিগেশন দেখাবে

| ফাইল | কাজ |
|---|---|
| `src/components/layout/DashboardSidebar.tsx` | সার্চ ইনপুট ও ফিল্টার লজিক যোগ |

