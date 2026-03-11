

# সাইডবার আচরণ পরিবর্তন — ফিক্সড ওপেন + ম্যানুয়াল কোলাপ্স + একক সাবমেনু

## বর্তমান সমস্যা
- সাইডবার হোভারে expand/collapse হয় — ইউজার কন্ট্রোল নেই
- একাধিক SidebarGroup একসাথে expand থাকতে পারে
- কোনো toggle বাটন নেই

## পরিবর্তন

### ১. `animated-sidebar.tsx` — সাইডবার কন্টেক্সট ও DesktopSidebar
- Context-এ `collapsed` ও `setCollapsed` যোগ (ইউজার টগল করবে)
- `onMouseEnter/onMouseLeave` সরিয়ে দেওয়া — সাইডবার ফিক্সড থাকবে
- DesktopSidebar-এ collapsed হলে 60px, না হলে 240px
- একটি collapse toggle বাটন যোগ (ChevronLeft/ChevronRight আইকন)

### ২. `animated-sidebar.tsx` — SidebarGroup-এ "accordion" আচরণ
- SidebarGroup-এ `expandedGroup` ও `setExpandedGroup` context যোগ
- একটি গ্রুপ ওপেন করলে বাকি সব auto-collapse হবে
- প্রতিটি গ্রুপের একটি ইউনিক আইডি (label) দিয়ে ট্র্যাক

### ৩. `DashboardSidebar.tsx`
- `open` এর বদলে `collapsed` state ব্যবহার
- সাইডবার ডিফল্টে expanded (240px) থাকবে

### ৪. `DashboardLayout.tsx`
- `SidebarProvider`-এ ডিফল্ট `open={true}` পাস

## ফাইল পরিবর্তন

| ফাইল | কাজ |
|------|-----|
| `src/components/ui/animated-sidebar.tsx` | hover সরানো, toggle বাটন, accordion group context |
| `src/components/layout/DashboardSidebar.tsx` | নতুন collapse আচরণ ব্যবহার |
| `src/components/layout/DashboardLayout.tsx` | ডিফল্ট open state |

