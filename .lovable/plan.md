

## সমস্যা বিশ্লেষণ

১. **আইকন কাটা যাচ্ছে**: সাইডবার collapsed অবস্থায় `60px` চওড়া, কিন্তু `px-4` (16px দুই পাশে = 32px) + `px-3` (link padding 12px দুই পাশে = 24px) = 56px শুধু padding-এ খরচ হচ্ছে। 18px আইকনের জন্য জায়গা থাকছে না, তাই ডান পাশে কাটা যাচ্ছে।

২. **সিলেক্টেড আইটেমে বাম দিকে দাগ**: `SidebarLink`-এ `active` হলে একটা `absolute left-0` bar রেন্ডার হচ্ছে (line 170-172)।

## পরিবর্তন

**`src/components/ui/animated-sidebar.tsx`** — ২টি ফিক্স:

1. **আইকন clipping ঠিক করা**: 
   - `DesktopSidebar`-এ `px-4` → `px-2` করা (collapsed অবস্থায় আইকন center হবে)
   - `SidebarLink`-এ `px-3` → `px-2` এবং `gap-3` → `gap-2` করা
   - `overflow-hidden` যোগ করা DesktopSidebar-এ

2. **Active indicator bar সরানো**: 
   - Line 170-172 এর active bar span মুছে দেওয়া

