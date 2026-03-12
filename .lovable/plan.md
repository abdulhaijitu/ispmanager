

# Portal Manage — "Add Media Server" মোডাল তৈরি

## পরিবর্তন

### `src/pages/portal-manage/PortalManagePage.tsx`

**MediaServersTab-এর "servers" সাব-ট্যাবে Dialog যোগ:**
- `serverDialogOpen`, `serverCategory`, `serverName`, `serverLink`, `serverDetails` স্টেট যোগ
- "+ Add Media Server" বাটনে `onClick` দিয়ে মোডাল ওপেন
- মোডাল ডিজাইন (রেফারেন্স ইমেজ অনুসারে):
  - হেডার: "Add Media Server" — `bg-primary text-primary-foreground`
  - ফর্ম ফিল্ড:
    - **MEDIA CATEGORY** (required, Select dropdown — "Select a category")
    - **MEDIA NAME** (required, Input)
    - **MEDIA LOGO** (required, file input)
    - **MEDIA LINK** (required, Input)
    - **DETAILS(OPTIONAL)** (Textarea)
  - লেবেল: bold uppercase + লাল asterisk
  - ফুটার: "Cancel" (লাল আউটলাইন, X আইকন) বামে + "Submit" (আউটলাইন, Check আইকন) ডানে
- আগের মোডালগুলোর একই প্যাটার্ন অনুসরণ

