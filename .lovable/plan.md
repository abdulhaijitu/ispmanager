

# Leave Setup পেজ তৈরি — রেফারেন্স ইমেজ অনুসারে

## পরিবর্তন

### `src/pages/hr/LeaveSetupPage.tsx` — সম্পূর্ণ পুনর্লিখন

ইমেজ অনুযায়ী এটি একটি **Position-ভিত্তিক Leave Setup** পেজ — প্রতিটি পজিশনের জন্য "Setup Leave" বাটন থাকবে।

**ডেটা মডেল:**
```typescript
interface Position {
  id: string;
  name: string;
  status: "Active" | "Inactive";
}
```

**ডিফল্ট ডেটা:** HR, App Admin, Accountant, Call Center Executive, Bill Collector, Service Man, Test, Field Executive, card counter, Extra

**টেবিল কলাম:** Position Name, Status, Action ("Setup Leave" বাটন)

**ফিচারসমূহ:**
1. PageContainer হেডার — "Leave Setup" টাইটেল
2. টুলবার — Show entries সিলেক্ট + সার্চ ইনপুট
3. ডার্ক-হেডার টেবিল (bg-primary) — `DepartmentPage` প্যাটার্ন অনুসরণ
4. "Setup Leave" বাটন ক্লিক করলে ডায়ালগ ওপেন হবে — সেই পজিশনের জন্য leave category অনুযায়ী দিনের সংখ্যা সেট করা যাবে
5. পেজিনেশন — Previous/Next সহ পেজ নম্বর

