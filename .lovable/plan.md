

# সাইডবার ফিক্সড পজিশন ফিক্স

## সমস্যা
বর্তমানে outer container `min-h-screen` ব্যবহার করছে, তাই পেজ কন্টেন্ট বড় হলে পুরো পেজ স্ক্রল হয় এবং সাইডবারও উপরে চলে যায়। `sticky` কাজ করছে না কারণ parent নিজেই স্ক্রল করছে।

## সমাধান

### `src/components/layout/DashboardLayout.tsx`
- Outer div: `min-h-screen` → `h-screen overflow-hidden` (পুরো পেজ স্ক্রল বন্ধ)
- Right side container: `overflow-hidden` যুক্ত করা যাতে শুধু main content area স্ক্রল করে

এতে সাইডবার সবসময় ফিক্সড থাকবে, শুধু ডান পাশের main content স্ক্রল হবে।

| ফাইল | কাজ |
|---|---|
| `src/components/layout/DashboardLayout.tsx` | `h-screen overflow-hidden` layout fix |

