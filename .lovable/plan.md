

# Leave Approval পেজ তৈরি — রেফারেন্স ইমেজ অনুসারে

## পরিবর্তন

### `src/pages/hr/LeaveApprovalPage.tsx` — সম্পূর্ণ পুনর্লিখন

ইমেজ অনুযায়ী এটি একটি **Leave Approval** পেজ যেখানে সমস্ত leave আবেদন দেখা এবং approve/decline করা যাবে।

**ফিচারসমূহ:**

1. **৪টি গ্র্যাডিয়েন্ট স্ট্যাট কার্ড** — Approved Requests (সবুজ), Pending Requests (নীল), Declined Requests (লাল), Total Requests (বেগুনি)
2. **টুলবার** — Show entries সিলেক্ট + সার্চ ইনপুট
3. **ডার্ক-হেডার টেবিল** (bg-primary) — কলামসমূহ: Employee Name, Leave Category, Subject, Start Date, End Date, Apply Date, Reason, Status, Attachment, Action
4. **Status Badge** — Approved (সবুজ), Pending (হলুদ), Rejected (লাল)
5. **Action কলাম** — Approve/Reject বাটন (Pending আবেদনের জন্য), View বাটন
6. **পেজিনেশন** — Previous/Next সহ পেজ নম্বর

`LeaveApplyPage`-এর ডেটা মডেল (`LeaveApplication`) পুনরায় ব্যবহার করা হবে। `LeaveCategoryPage` প্যাটার্ন অনুসরণ।

