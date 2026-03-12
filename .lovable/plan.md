

# Portal Manage — "Add Media Server Category" মোডাল তৈরি

## পরিবর্তন

### `src/pages/portal-manage/PortalManagePage.tsx`

**MediaServersTab-এ Dialog যোগ:**
- `categoryDialogOpen` স্টেট + `categoryName`, `categoryDetails` ফর্ম স্টেট যোগ
- "+ Add Server Category" বাটনে `onClick` দিয়ে মোডাল ওপেন
- মোডাল ডিজাইন (রেফারেন্স ইমেজ অনুসারে):
  - হেডার: "Add Media Server Category" — `bg-primary text-primary-foreground` স্টাইল
  - ফর্ম: **MEDIA SERVER CATEGORY** (required, Input) + **DETAILS(OPTIONAL)** (Textarea) — bold uppercase লেবেল, লাল asterisk
  - ফুটার: "Cancel" বাটন (লাল আউটলাইন, X আইকন) বামে + "Submit" বাটন (আউটলাইন, Check আইকন) ডানে
- Notice মোডালের একই প্যাটার্ন অনুসরণ

