

# সাইডবার ডিজাইন ফিক্সড

## সমস্যা
সাইডবারের ফুটার (user info) এর নিচে ফাঁকা জায়গা দেখাচ্ছে। নেভিগেশন কন্টেন্ট ও ফুটারের মধ্যে সঠিক flex layout নেই।

## পরিবর্তন

### `src/components/layout/DashboardSidebar.tsx`
- `SidebarBody`-তে `overflow-hidden` রেখে ভেতরের কাঠামো ঠিক করা:
  - উপরের nav সেকশন: `flex-1 overflow-y-auto` (স্ক্রলেবল)
  - ফুটার সেকশন: `mt-auto shrink-0` (সবসময় নিচে পিন থাকবে)
- ফুটারের `border-t` ও spacing ঠিক রাখা

### `src/components/ui/animated-sidebar.tsx`
- `DesktopSidebar`-তে `overflow-hidden` নিশ্চিত করে children-কে সঠিক flex column এ রাখা
- `MobileSidebar`-তেও একই কাঠামো

মোট ১টি ছোট structural fix — ফুটার সবসময় সাইডবারের নিচে থাকবে, মাঝখানে কোনো ফাঁকা জায়গা থাকবে না।

| ফাইল | কাজ |
|---|---|
| `src/components/layout/DashboardSidebar.tsx` | flex layout ফিক্স — footer pinned to bottom |

