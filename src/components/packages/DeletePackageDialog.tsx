import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";

interface DeletePackageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  packageName: string;
  customerCount: number;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function DeletePackageDialog({
  open,
  onOpenChange,
  packageName,
  customerCount,
  onConfirm,
  isLoading,
}: DeletePackageDialogProps) {
  const hasCustomers = customerCount > 0;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {hasCustomers ? "প্যাকেজ ডিলিট করা যাচ্ছে না" : "প্যাকেজ ডিলিট করুন"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {hasCustomers ? (
              <>
                <strong>"{packageName}"</strong> প্যাকেজে বর্তমানে{" "}
                <strong>{customerCount}</strong> জন গ্রাহক আছে। ডিলিট করতে হলে
                প্রথমে গ্রাহকদের অন্য প্যাকেজে সরান।
              </>
            ) : (
              <>
                আপনি কি নিশ্চিত যে <strong>"{packageName}"</strong> প্যাকেজটি
                ডিলিট করতে চান? এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>বাতিল</AlertDialogCancel>
          {!hasCustomers && (
            <AlertDialogAction
              onClick={onConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              ডিলিট করুন
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
