

# সাইডবার ও টপবার ওভারল্যাপ ফিক্স

## সমস্যা
- সাইডবারের toggle বাটন (`translate-x-1/2`, `z-50`) হেডারের উপর ওভারল্যাপ করছে
- সাইডবার `h-full` ব্যবহার করছে, `sticky top-0 h-screen` হওয়া উচিত যাতে স্ক্রলেও ঠিক থাকে
- হেডার `z-30`, সাইডবার toggle `z-50` — z-index কনফ্লিক্ট

## সমাধান

### ১. `animated-sidebar.tsx` — DesktopSidebar
- `h-full` → `h-screen sticky top-0` করা (সাইডবার স্ক্রীনে ফিক্সড থাকবে)
- Toggle বাটনের z-index কমানো (`z-50` → `z-40`)
- Toggle বাটন হেডারের নিচে রাখা (`top-14` বা `top-16`)

### ২. `DashboardHeader.tsx`
- হেডারের `z-30` → `z-40` করা যাতে সাইডবার toggle-এর সাথে সামঞ্জস্য থাকে

### ৩. `DashboardLayout.tsx`
- Content area-তে `overflow-hidden` থেকে সঠিক overflow নিশ্চিত করা

## ফাইল পরিবর্তন

| ফাইল | কাজ |
|------|-----|
| `src/components/ui/animated-sidebar.tsx` | DesktopSidebar: sticky + h-screen, toggle position fix |
| `src/components/layout/DashboardHeader.tsx` | z-index adjustment |

