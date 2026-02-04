import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Receipt, Calendar, ChevronRight, FileText } from "lucide-react";
import { usePortalBills, usePortalCustomer } from "@/hooks/usePortalData";
import { useState } from "react";
import MobileBillDetail from "@/components/mobile/MobileBillDetail";
import type { Bill } from "@/hooks/usePortalData";

const billStatusConfig = {
  paid: { label: "Paid", variant: "default" as const, color: "text-green-600" },
  due: { label: "Due", variant: "secondary" as const, color: "text-amber-600" },
  partial: { label: "Partial", variant: "outline" as const, color: "text-blue-600" },
  overdue: { label: "Overdue", variant: "destructive" as const, color: "text-red-600" },
};

export default function MobileBills() {
  const { data: customer } = usePortalCustomer();
  const { data: bills, isLoading } = usePortalBills();
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);

  const formatCurrency = (amount: number) => `৳${amount.toLocaleString()}`;

  // Calculate totals
  const totalDue = bills?.reduce((sum, bill) => {
    if (bill.status === "due" || bill.status === "overdue" || bill.status === "partial") {
      return sum + Number(bill.amount);
    }
    return sum;
  }, 0) || 0;

  if (selectedBill) {
    return <MobileBillDetail bill={selectedBill} onBack={() => setSelectedBill(null)} />;
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Bills</h1>
        <p className="text-muted-foreground">Your billing history</p>
      </div>

      {/* Summary Card */}
      {totalDue > 0 && (
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80">Total Due</p>
                <p className="text-3xl font-bold">{formatCurrency(totalDue)}</p>
              </div>
              <Button variant="secondary" size="sm" className="font-semibold">
                Pay All
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bills List */}
      <div className="space-y-3">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))
        ) : bills && bills.length > 0 ? (
          bills.map((bill) => {
            const status = bill.status || "due";
            return (
              <Card 
                key={bill.id} 
                className="touch-manipulation active:scale-[0.98] transition-transform cursor-pointer"
                onClick={() => setSelectedBill(bill)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        status === "paid" ? "bg-green-500/10" : 
                        status === "overdue" ? "bg-red-500/10" : 
                        "bg-amber-500/10"
                      }`}>
                        <Receipt className={`w-6 h-6 ${billStatusConfig[status].color}`} />
                      </div>
                      <div>
                        <p className="font-semibold">{bill.invoice_number}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {new Date(bill.billing_period_start).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short'
                          })} - {new Date(bill.billing_period_end).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-2">
                      <div>
                        <p className="font-bold text-lg">{formatCurrency(Number(bill.amount))}</p>
                        <Badge variant={billStatusConfig[status].variant} className="text-xs">
                          {billStatusConfig[status].label}
                        </Badge>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold">No Bills Yet</h3>
            <p className="text-sm text-muted-foreground">Your bills will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}
