

## Plan: Convert Packages, Reports & Notifications Pages to English

### Files to Update (11 files)

**Packages (3 files):**

1. **`src/pages/Packages.tsx`** — All Bengali strings:
   - Page header: "প্যাকেজসমূহ" → "Packages", description → "Manage your internet service packages"
   - Stats cards: "সক্রিয় প্যাকেজ" → "Active Packages", "মোট সাবস্ক্রিপশন" → "Total Subscriptions", "মাসিক আয়" → "Monthly Revenue", "গড় আয়/গ্রাহক" → "Avg. Revenue/Customer"
   - Sub-labels: "মোট X প্যাকেজের মধ্যে" → "Out of X total packages", "সক্রিয় গ্রাহক সংখ্যা" → "Active customer count", "/মাস" → "/month", etc.
   - Buttons/menus: "নতুন প্যাকেজ" → "New Package", "সম্পাদনা" → "Edit", "নিষ্ক্রিয় করুন" → "Deactivate", "ডিলিট করুন" → "Delete", "সক্রিয় করুন" → "Activate", "পুনরায় সক্রিয় করুন" → "Reactivate"
   - Badges: "সবচেয়ে জনপ্রিয়" → "Most Popular", "সক্রিয়" → "Active", "নিষ্ক্রিয়" → "Inactive", "জনপ্রিয়" → "Popular"
   - Table headers: "প্যাকেজ/স্পিড/মাসিক মূল্য/গ্রাহক/মাসিক আয়/স্ট্যাটাস" → English equivalents
   - Empty state: "কোনো প্যাকেজ নেই" → "No packages found"
   - Toast messages: "প্যাকেজ আপডেট হয়েছে" → "Package updated successfully", etc.
   - Card labels: "সক্রিয় গ্রাহক" → "Active Customers", "আয়ের অংশ" → "Revenue Share"

2. **`src/components/packages/PackageFormDialog.tsx`** — All form labels:
   - Dialog title/desc, form labels (নাম/স্পিড/মূল্য/মেয়াদ), placeholders, buttons (বাতিল/আপডেট/তৈরি)

3. **`src/components/packages/DeletePackageDialog.tsx`** — Dialog text:
   - Title, description (both has-customers and no-customers variants), Cancel/Delete buttons

**Reports (5 files):**

4. **`src/components/reports/RevenueReport.tsx`** — Remove `bn` locale import, use English date format. Titles/labels: "রাজস্ব রিপোর্ট" → "Revenue Report", "বিল/আদায়" → "Billed/Collected", "আদায় হার" → "Collection Rate"

5. **`src/components/reports/DueOverdueReport.tsx`** — All labels: "বকেয়া রিপোর্ট" → "Due & Overdue Report", "মোট বকেয়া/অগ্রিম" → "Total Due/Advance", "বিল আদায় হার" → "Collection Rate", "পেইড/ডিউ/ওভারডিউ" → "Paid/Due/Overdue", "শীর্ষ বকেয়াদার" → "Top Defaulters", "জন কাস্টমার" → "customers"

6. **`src/components/reports/CustomerGrowthReport.tsx`** — Remove `bn` locale. Titles: "কাস্টমার গ্রোথ" → "Customer Growth", "সক্রিয়" → "Active", tooltip labels "মোট/নতুন" → "Total/New"

7. **`src/components/reports/CollectionReport.tsx`** — Method labels: "নগদ/অনলাইন/ব্যাংক ট্রান্সফার" → "Cash/Online/Bank Transfer". Titles: "আদায় পদ্ধতি" → "Collection Method", tooltip "আদায়" → "Collected"

8. **`src/components/reports/PackageDistribution.tsx`** — Titles: "প্যাকেজ বিতরণ" → "Package Distribution", "অনির্ধারিত" → "Unassigned", "জন" → "customers"

**Notifications (3 files):**

9. **`src/components/notifications/NotificationStatsCards.tsx`** — Labels: "মোট নোটিফিকেশন" → "Total Notifications", "সফলভাবে পাঠানো" → "Successfully Sent", "ব্যর্থ" → "Failed", "সাফল্যের হার" → "Success Rate"

10. **`src/components/notifications/NotificationLogTable.tsx`** — Remove `bn` locale. Status labels: "পাঠানো হয়েছে/ব্যর্থ/অপেক্ষমাণ" → "Sent/Failed/Pending". Type labels all to English. Table heads, empty state, resend tooltip all to English.

11. **`src/components/notifications/NotificationFilters.tsx`** — Placeholder, filter labels, select items all to English.

### Approach
- Direct string replacement only, no logic changes
- Remove `bn` locale imports from date-fns where used
- Keep ৳ currency symbol

