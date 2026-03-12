

# HR সেকশনে Leave Management গ্রুপ যুক্ত করা

## পরিবর্তন

### 1. নতুন পেজ তৈরি (4টি)
- `src/pages/hr/LeaveCategoryPage.tsx` — Leave Category ম্যানেজমেন্ট
- `src/pages/hr/LeaveSetupPage.tsx` — Leave Setup/কনফিগারেশন
- `src/pages/hr/LeaveApplyPage.tsx` — Leave আবেদন
- `src/pages/hr/LeaveApprovalPage.tsx` — Leave অনুমোদন

প্রতিটি পেজে CRUD টেবিল/ফর্ম থাকবে PlaceholderPage প্যাটার্ন অনুসরণ করে।

### 2. সাইডবারে Leave Management গ্রুপ (`DashboardSidebar.tsx`)
`operationGroups` এ নতুন গ্রুপ যুক্ত:
```
Leave Management (CalendarDays icon)
  ├── Category  → /dashboard/hr/leave/category
  ├── Setup     → /dashboard/hr/leave/setup
  ├── Apply     → /dashboard/hr/leave/apply
  └── Approval  → /dashboard/hr/leave/approval
```
HR সেকশনে `HR & Payroll` এর পরে রেন্ডার হবে।

### 3. রাউট যুক্ত (`App.tsx`)
4টি নতুন রাউট `/dashboard/hr/leave/*` পাথে।

