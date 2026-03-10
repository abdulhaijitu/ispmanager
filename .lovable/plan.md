

## Plan: Convert All Bengali Text to English

### Scope

55 files contain Bengali (Bangla) text across the entire application. All user-facing strings — labels, placeholders, toasts, descriptions, button text, status labels, tooltips, and edge function messages — must be translated to English.

### Affected Areas

**Pages (13 files):**
`Dashboard.tsx`, `Customers.tsx`, `Packages.tsx`, `Payments.tsx`, `Billing.tsx`, `Reports.tsx`, `Resellers.tsx`, `ResellerDetail.tsx`, `CustomerDetail.tsx`, `Notifications.tsx`, `NetworkPage.tsx`, `Settings.tsx`, `Index.tsx`

**Admin Pages (10+ files):**
`AdminDashboard.tsx`, `AdminTenants.tsx`, `AdminRevenue.tsx`, `AdminPricing.tsx`, `AdminSubscriptions.tsx`, `AdminUsersRoles.tsx`, `AdminSettings.tsx`, etc.

**Reseller Pages (4 files):**
`ResellerDashboardPage.tsx`, `ResellerCustomersPage.tsx`, `ResellerPaymentsPage.tsx`, `ResellerWalletPage.tsx`

**Portal & Mobile Pages (8+ files):**
`PortalDashboard.tsx`, `PortalBills.tsx`, `PortalPayments.tsx`, `PortalProfile.tsx`, `MobileHome.tsx`, `MobileBills.tsx`, `MobilePayments.tsx`, `MobileProfile.tsx`

**Components (~25 files):**
All components under `customers/`, `billing/`, `payments/`, `packages/`, `resellers/`, `network/`, `notifications/`, `reports/`, `settings/`, `onboarding/`, `dashboard/`, `layout/`, `shared/`

**Hooks (5+ files):**
Toast messages in `useCustomers.ts`, `usePackages.ts`, `usePayments.ts`, `useBills.ts`, `useResellers.ts`, etc.

**Edge Functions (2 files):**
`billing-reminders/index.ts`, `send-notification/index.ts`

### Approach

- Systematically go through each file and replace all Bengali strings with their English equivalents
- Maintain exact same UI structure and component logic — only text changes
- Keep currency symbol ৳ (BDT) as-is since it's the correct currency symbol
- No structural or logic changes

### Example Translations

| Bengali | English |
|---------|---------|
| মোট গ্রাহক | Total Customers |
| বিল জেনারেট | Generate Bill |
| পেমেন্ট রেকর্ড | Record Payment |
| সফলভাবে পাঠানো | Successfully Sent |
| খুঁজুন | Search |
| বাতিল | Cancel |
| ডিলিট করুন | Delete |
| স্ট্যাটাস | Status |

