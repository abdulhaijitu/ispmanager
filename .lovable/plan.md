

# MikroTik Server Backup পেইজ

## পরিবর্তন

### `src/pages/network/MikrotikBackupPage.tsx` — নতুন পেইজ
রেফারেন্স ইমেজ অনুযায়ী:
1. **হেডার**: HardDrive আইকন + "Mikrotik Backups" টাইটেল + "Backup Mikrotik Server" সাবটাইটেল + breadcrumb (Mikrotik Server > Server Backup) + "+ Create Backup" বাটন
2. **ফিল্টার বার**: "SHOW [10] ENTRIES" সিলেক্ট (বামে) + "SEARCH" ইনপুট (ডানে)
3. **টেবিল**: তিনটি কলাম — **Time**, **Backup File Name**, **Download** (ডার্ক হেডার)
4. **ফুটার**: "Showing X to Y of Z entries" + Previous/Next pagination
5. **ডাটা**: Static demo data (empty state — "No data available in table")

### `src/App.tsx` — রাউট আপডেট
`/dashboard/mikrotik/backup` → `MikrotikBackupPage` (placeholder রিপ্লেস)

| ফাইল | কাজ |
|------|-----|
| `src/pages/network/MikrotikBackupPage.tsx` | নতুন |
| `src/App.tsx` | রাউট আপডেট |

