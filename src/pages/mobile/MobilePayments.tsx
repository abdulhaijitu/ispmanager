import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CreditCard, CheckCircle, FileText, Download } from "lucide-react";
import { usePortalPayments } from "@/hooks/usePortalData";
import { cn } from "@/lib/utils";

export default function MobilePayments() {
  const { data: payments, isLoading } = usePortalPayments();

  const formatCurrency = (amount: number) => `৳${amount.toLocaleString()}`;
  const totalPaid = payments?.reduce((sum, payment) => sum + Number(payment.amount), 0) || 0;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Payments</h1>
        <p className="text-muted-foreground text-sm">Your payment history</p>
      </div>

      {/* Summary Card */}
      <Card className="overflow-hidden border-0 shadow-lg animate-slide-up">
        <CardContent className="p-0">
          <div className="bg-gradient-to-br from-success to-success/80 text-white p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <CheckCircle className="w-5 h-5" />
              </div>
              <span className="text-white/80">Total Paid</span>
            </div>
            <p className="text-3xl font-bold tabular-nums">{formatCurrency(totalPaid)}</p>
            <p className="text-sm text-white/70 mt-1">
              {payments?.length || 0} transactions
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Payments List */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
          Recent Transactions
        </h3>

        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))
        ) : payments && payments.length > 0 ? (
          payments.map((payment, index) => (
            <Card 
              key={payment.id} 
              className="touch-manipulation active:scale-[0.98] transition-all duration-200 hover:shadow-soft animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-success" />
                    </div>
                    <div>
                      <p className="font-semibold tabular-nums">{formatCurrency(Number(payment.amount))}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(payment.created_at).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="default" className="gap-1 mb-1 bg-success/10 text-success hover:bg-success/20 border-0">
                      <CheckCircle className="w-3 h-3" />
                      Paid
                    </Badge>
                    <p className="text-xs text-muted-foreground capitalize">
                      {payment.method || "Cash"}
                    </p>
                  </div>
                </div>
                {payment.bills?.invoice_number && (
                  <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FileText className="w-4 h-4" />
                      For: {payment.bills.invoice_number}
                    </div>
                    <button className="text-primary text-sm flex items-center gap-1 hover:underline">
                      <Download className="w-4 h-4" />
                      Receipt
                    </button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <CreditCard className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold">No Payments Yet</h3>
            <p className="text-sm text-muted-foreground">Your payments will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}
