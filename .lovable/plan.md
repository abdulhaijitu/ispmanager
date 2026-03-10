

## সম্পূর্ণ বাংলা → ইংরেজি অডিট ও ফিক্স

প্রজেক্টের ১৫+ ফাইলে এখনও বাংলা টেক্সট আছে। সব ইংরেজিতে কনভার্ট করতে হবে। `date-fns` locale `bn` → সরিয়ে ইংরেজি ফরম্যাট ব্যবহার করতে হবে। `bn-BD` locale-ও `en-US`/`en-GB` এ পরিবর্তন।

### ফাইল-ভিত্তিক পরিবর্তন তালিকা

**1. `src/pages/auth/StaffLogin.tsx`**
- "আপনার ড্যাশবোর্ডে প্রবেশ করুন" → "Sign in to your dashboard"
- "লগইন" / "সাইনআপ" tabs → "Login" / "Sign Up"
- Labels: ইমেইল → Email, পাসওয়ার্ড → Password, পুরো নাম → Full Name
- "পাসওয়ার্ড ভুলে গেছেন?" → "Forgot password?"
- "লগইন করুন" → "Sign In", "অ্যাকাউন্ট তৈরি করুন" → "Create Account"
- Error/success messages → English
- Footer links → English

**2. `src/components/customers/CustomerFormDialog.tsx`**
- All labels, errors, placeholders, buttons → English
- "নতুন কাস্টমার যোগ করুন" → "Add New Customer"
- Validation messages → English
- Connection status options → "Active", "Suspended", "Pending"
- "৳{price}/মাস" → "৳{price}/mo"

**3. `src/components/customers/CustomerPagination.tsx`**
- "দেখানো হচ্ছে মোট X এর মধ্যে" → "Showing X-Y of Z"
- "প্রতি পেজে:" → "Per page:"

**4. `src/pages/Billing.tsx`**
- Toast messages → English
- Generate bills dialog Bengali text → English
- "বাতিল" → "Cancel", "বিল তৈরি করুন" → "Generate Bills"

**5. `src/pages/admin/AdminPricing.tsx`** (full page)
- Page title, tab labels, table headers, form labels → all English
- billingCycleLabels: মাসিক/ত্রৈমাসিক/বার্ষিক → Monthly/Quarterly/Yearly
- pricingTypeLabels → Fixed Price, Tiered, Usage Based
- All 3 dialog forms (Plan, Addon, Tier) → English
- Plan card labels → English

**6. `src/pages/admin/AdminSubscriptions.tsx`** (full page)
- Page title, stats cards, table headers → English
- statusConfig labels → Active, Trial, Suspended
- formatDate locale `bn-BD` → `en-US`
- Filter labels → English

**7. `src/components/layout/TenantSwitcher.tsx`**
- "লোড হচ্ছে..." → "Loading..."
- Status labels → Active, Trial, Suspended
- Menu labels → English

**8. `src/components/network/SyncLogTable.tsx`**
- actionLabels → Enable, Disable, Speed Update, Create, Delete, Test Connection
- statusConfig labels → Success, Failed, Pending, In Progress, Retrying
- Table headers → English
- `locale: bn` → remove (use default English)

**9. `src/components/network/SyncQueueCard.tsx`**
- actionLabels, card title, descriptions → English
- `locale: bn` → remove

**10. `src/components/network/IntegrationCard.tsx`**
- syncModeLabels → Manual, Scheduled, Event-driven
- statusStyles labels → Connected, Failed, Pending, In Progress, Retrying
- "শেষ সিঙ্ক:" → "Last sync:"
- `locale: bn` → remove

**11. `src/components/settings/NetworkIntegrationSettings.tsx`** (big file)
- syncModeLabels, statusConfig labels → English
- All form labels, dialog titles, descriptions → English
- Tab labels → "Integrations", "Sync Logs"
- Table headers → English
- Security warning → English
- Delete confirmation → English
- `locale: bn` → remove

**12. `src/components/admin/NetworkHealthOverview.tsx`**
- statusConfig, providerLabels, syncModeLabels, actionLabels → English
- Card title, stats labels → English
- `locale: bn` → remove
- All inline Bengali text → English

**13. `src/components/settings/ResellerBrandingSettings.tsx`**
- Toast messages → English
- "লোড হচ্ছে..." → "Loading..."
- Description texts → English

**14. `src/hooks/usePlatformPricing.ts`**
- All toast titles → English: "Plan created", "Plan updated", "Add-on created", etc.
- "ত্রুটি" → "Error"

**15. `src/hooks/useNetworkIntegration.ts`**
- All toast messages → English

**16. `src/hooks/useTenantSettings.ts`**
- Toast messages → English

**17. `supabase/functions/billing-reminders/index.ts`**
- Notification body text → English

### Technical Details
- Replace all `import { bn } from "date-fns/locale"` with removal or switch to English locale
- Replace `locale: bn` in `formatDistanceToNow`/`format` calls with no locale (defaults to English)
- Replace `'bn-BD'` in `toLocaleDateString` with `'en-US'`
- ৳ currency symbol preserved (BDT)

