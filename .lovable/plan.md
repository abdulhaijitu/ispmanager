

# Leave Category পেজ তৈরি — রেফারেন্স ইমেজ অনুসারে

## পরিবর্তন

### `src/pages/hr/LeaveCategoryPage.tsx` — সম্পূর্ণ পুনর্লিখন

বর্তমান PlaceholderPage রিপ্লেস করে `ClientTypePage` প্যাটার্ন অনুসরণ করে পূর্ণ CRUD পেজ তৈরি:

**ডেটা মডেল:**
```typescript
interface LeaveCategory {
  id: string;
  name: string;
  details: string;
  isActive: boolean;
}
```

**ডিফল্ট ডেটা:** Full Day, Half Day, Casual, Sick, Unpaid Leave, New, Test

**ফিচারসমূহ:**
1. PageContainer হেডার — "Leave Category" টাইটেল, "Configure Leave Category" সাবটাইটেল, "+ Leave Category" বাটন
2. টুলবার — Show entries সিলেক্ট + সার্চ ইনপুট
3. ডার্ক-হেডার টেবিল — Serial, Leave Category, Details, Action (Edit/Delete) কলাম
4. পেজিনেশন — "Showing X to Y of Z entries" + পেজ নম্বর
5. Add/Edit ডায়ালগ — Name ও Details ফিল্ড
6. Delete কনফার্মেশন ডায়ালগ

রেফারেন্স ইমেজের সাথে মিল রেখে সিম্পল ক্লিন ডিজাইন — `ClientTypePage` এর প্রমাণিত প্যাটার্ন ব্যবহার করা হবে।

