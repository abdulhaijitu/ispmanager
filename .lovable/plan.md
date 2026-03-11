

# সাইডবার লাইট মুড ডিজাইন ও কম্প্যাক্ট বটম সেকশন

## সমস্যা
বর্তমানে সাইডবারের CSS variables ডার্ক ব্যাকগ্রাউন্ড দিচ্ছে (`222 47% 11%`) এবং বটম সেকশনে user info + logout বাটন অনেক জায়গা নিচ্ছে।

## পরিবর্তন

### 1. `src/index.css` — সাইডবার কালার লাইট মুডে পরিবর্তন

| Variable | আগে (Dark) | পরে (Light) |
|---|---|---|
| `--sidebar-background` | `222 47% 11%` | `0 0% 100%` (white) |
| `--sidebar-foreground` | `214 32% 91%` | `222 47% 11%` (dark text) |
| `--sidebar-accent` | `222 47% 18%` | `214 32% 96%` (light gray) |
| `--sidebar-accent-foreground` | `214 32% 91%` | `222 47% 11%` |
| `--sidebar-border` | `222 47% 18%` | `214 32% 91%` (light border) |
| `--sidebar-primary` | unchanged | unchanged |
| `--sidebar-primary-foreground` | `0 0% 100%` | `0 0% 100%` |

### 2. `src/components/layout/DashboardSidebar.tsx` — বটম সেকশন কম্প্যাক্ট

- User avatar, নাম, role ও logout বাটন একটি সিঙ্গেল রো-তে রাখা হবে
- Logout বাটন আলাদা সারিতে না থেকে ডানদিকে আইকন-ওনলি বাটন হিসেবে থাকবে
- প্যাডিং ও মার্জিন কমানো হবে

### 3. `src/components/ui/animated-sidebar.tsx` — টগল বাটন স্টাইল আপডেট

- টগল বাটনের `bg-sidebar` ব্যাকগ্রাউন্ড লাইট মুডের সাথে মানানসই shadow যুক্ত করা হবে

