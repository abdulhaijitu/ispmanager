

# Box মোডালে Zone সিলেক্টর যুক্ত করা

## পরিবর্তন

### `src/pages/config/ZonesPage.tsx`

Box এর Add/Edit মোডালে Zone সিলেক্টর যুক্ত করা হবে। Zone সিলেক্ট করলে Sub Zone ড্রপডাউন সেই Zone এর Sub Zone গুলো ফিল্টার করে দেখাবে।

1. নতুন state: `formZoneId` যুক্ত করা
2. `resetForm` এ `formZoneId` রিসেট করা
3. `openEdit` এ Box এডিট করলে সংশ্লিষ্ট Zone ID সেট করা (Sub Zone থেকে বের করে)
4. Box মোডালে Zone সিলেক্টর যুক্ত করা (Sub Zone এর আগে)
5. Zone পরিবর্তন করলে Sub Zone রিসেট হবে
6. Sub Zone লিস্ট সিলেক্টেড Zone অনুযায়ী ফিল্টার হবে

