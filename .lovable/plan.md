

# Sidebar: Settings → System গ্রুপ পরিবর্তন

## পরিবর্তন

### `src/components/layout/DashboardSidebar.tsx`

**Settings** standalone item সরিয়ে একটি নতুন **System** collapsible group তৈরি হবে নিচের সাবমেনু সহ:

| মেনু আইটেম | রাউট | আইকন |
|---|---|---|
| App Users | `/dashboard/system/app-users` | Users |
| Company Setup | `/dashboard/system/company-setup` | Building2 |
| Invoice Setup | `/dashboard/system/invoice-setup` | FileText |
| Periods Setup | `/dashboard/system/periods-setup` | CalendarDays |
| Payment Gateways | `/dashboard/system/payment-gateways` | CreditCard |
| Email Setup | `/dashboard/system/email-setup` | Mail |
| System Setup | `/dashboard/system/system-setup` | Cog |
| P. Processing Fee | `/dashboard/system/processing-fee` | DollarSign |
| VAT Setup | `/dashboard/system/vat-setup` | Receipt |
| Activity Loggers | `/dashboard/system/activity-loggers` | ClipboardList |
| Automatic Process | `/dashboard/system/automatic-process` | Wrench |

- `systemStandaloneItems` থেকে Settings সরিয়ে দেওয়া হবে
- নতুন `systemGroup` NavGroup তৈরি হবে (Settings আইকন সহ)
- সাইডবারে SMS Service-এর পরে System group রেন্ডার হবে
- সব রাউট placeholder পেইজে পয়েন্ট করবে (পরে ডিজাইন দেওয়া হলে আপডেট হবে)

### `src/App.tsx`
- ১১টি নতুন রাউট যোগ হবে `/dashboard/system/*` পাথে, সব PlaceholderPage-এ পয়েন্ট করবে

| ফাইল | কাজ |
|---|---|
| `src/components/layout/DashboardSidebar.tsx` | Settings → System group |
| `src/App.tsx` | ১১টি নতুন রাউট |

