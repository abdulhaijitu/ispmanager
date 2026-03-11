

# /login পেইজে "Client Registration" বাটন যোগ

## পরিবর্তন

`src/pages/auth/StaffLogin.tsx` ফাইলে, line 111-এ `<div className="min-h-screen...">` এর ভিতরে, Card-এর আগে টপ-লেফটে একটি fixed-position "Client Registration" বাটন যোগ করা হবে।

বাটনটি `/portal/signup` রাউটে নিয়ে যাবে (যেখানে ইতোমধ্যে কাস্টমার সাইনআপ ফর্ম আছে)।

### কোড পরিবর্তন:
- `StaffLogin.tsx`-এর মূল `div`-এ `relative` class যোগ
- টপ-লেফট কর্নারে একটি `Link` বাটন যোগ: **"Client Registration"** → `/portal/signup`
- `UserPlus` আইকন ব্যবহার

