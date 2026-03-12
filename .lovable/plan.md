

# Leave Management কে Purchase থেকে HR সেকশনে সরানো

## পরিবর্তন

### `src/components/layout/DashboardSidebar.tsx`

**HR সেকশনে** (লাইন 545 এর পরে) `{renderGroup(operationGroups[3])}` যুক্ত করা হবে — এটি Leave Management গ্রুপ।

**Purchase সেকশন** থেকে (লাইন 565) `{renderGroup(operationGroups[3])}` সরিয়ে দেওয়া হবে।

**আগে:**
```
HR → HR & Payroll
Purchase → Purchase & Vendors, Leave Management
```

**পরে:**
```
HR → HR & Payroll, Leave Management
Purchase → Purchase & Vendors
```

