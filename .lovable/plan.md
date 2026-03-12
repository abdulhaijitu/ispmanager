

# Portal Manage — "Add New Notice" মোডাল তৈরি

## পরিবর্তন

### `src/pages/portal-manage/PortalManagePage.tsx`

**NoticesTab-এ Dialog যোগ:**
- `Dialog` কম্পোনেন্ট ইমপোর্ট করে "New Notice" বাটনে যুক্ত করা
- মোডালের ডিজাইন রেফারেন্স ইমেজ অনুসারে:
  - হেডার: "Add New Notice" টাইটেল + X ক্লোজ বাটন, `bg-primary text-primary-foreground` স্টাইল
  - ফর্ম ফিল্ড: **NOTICE TITLE** (required, Input) + **NOTICE DETAILS** (required, Textarea)
  - লেবেল uppercase bold + লাল asterisk (*)
  - ফুটার: "Cancel" বাটন (লাল আউটলাইন, X আইকন সহ) বামে + "Submit" বাটন (ডার্ক আউটলাইন, চেক আইকন সহ) ডানে
- `noticeDialogOpen` স্টেট যোগ + ফর্ম স্টেট (`noticeTitle`, `noticeDetails`)

