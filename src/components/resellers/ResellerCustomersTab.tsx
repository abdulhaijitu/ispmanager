import { useState } from "react";
import { Users, User, UserPlus, UserMinus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Skeleton } from "@/components/ui/skeleton";
import { useUnassignCustomer } from "@/hooks/useResellerAssignment";
import { AssignCustomerDialog } from "./AssignCustomerDialog";

const statusConfig: Record<string, { label: string; variant: "default" | "destructive" | "secondary" }> = {
  active: { label: "সক্রিয়", variant: "default" },
  suspended: { label: "সাসপেন্ড", variant: "destructive" },
  pending: { label: "পেন্ডিং", variant: "secondary" },
};

interface Props {
  customers: any[];
  isLoading: boolean;
  resellerId: string;
  tenantId: string;
}

export function ResellerCustomersTab({ customers, isLoading, resellerId, tenantId }: Props) {
  const [assignOpen, setAssignOpen] = useState(false);
  const [unassignTarget, setUnassignTarget] = useState<{ id: string; name: string } | null>(null);
  const unassignMutation = useUnassignCustomer();

  if (isLoading) {
    return <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-14 w-full" />)}</div>;
  }

  return (
    <>
      <Card className="border-border/50 mt-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">গ্রাহক তালিকা ({customers.length})</CardTitle>
          <Button size="sm" onClick={() => setAssignOpen(true)}>
            <UserPlus className="h-4 w-4 mr-1.5" /> গ্রাহক যোগ করুন
          </Button>
        </CardHeader>
        <CardContent>
          {customers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="h-10 w-10 mx-auto mb-2 opacity-30" />
              <p className="text-sm">এই রিসেলারের কোনো গ্রাহক নেই</p>
              <Button variant="outline" size="sm" className="mt-3" onClick={() => setAssignOpen(true)}>
                <UserPlus className="h-4 w-4 mr-1.5" /> গ্রাহক অ্যাসাইন করুন
              </Button>
            </div>
          ) : (
            <div className="overflow-auto rounded-lg border border-border/50">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead>নাম</TableHead>
                    <TableHead>ফোন</TableHead>
                    <TableHead>প্যাকেজ</TableHead>
                    <TableHead className="text-right">বকেয়া</TableHead>
                    <TableHead>স্ট্যাটাস</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((c: any) => {
                    const st = statusConfig[c.connection_status] || statusConfig.pending;
                    return (
                      <TableRow key={c.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium text-sm">{c.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{c.phone}</TableCell>
                        <TableCell className="text-sm">{c.packages?.name || "—"}</TableCell>
                        <TableCell className="text-right text-sm font-medium">
                          ৳{Number(c.due_balance || 0).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant={st.variant} className="text-[10px]">{st.label}</Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            title="রিসেলার থেকে সরান"
                            onClick={() => setUnassignTarget({ id: c.id, name: c.name })}
                          >
                            <UserMinus className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <AssignCustomerDialog
        open={assignOpen}
        onOpenChange={setAssignOpen}
        resellerId={resellerId}
        tenantId={tenantId}
      />

      <AlertDialog open={!!unassignTarget} onOpenChange={() => setUnassignTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>গ্রাহক সরান?</AlertDialogTitle>
            <AlertDialogDescription>
              <strong>{unassignTarget?.name}</strong> কে এই রিসেলার থেকে সরাতে চান? গ্রাহক ISP-এর সরাসরি অধীনে চলে যাবে।
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>বাতিল</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (unassignTarget) {
                  unassignMutation.mutate(unassignTarget.id);
                  setUnassignTarget(null);
                }
              }}
            >
              সরিয়ে দিন
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
