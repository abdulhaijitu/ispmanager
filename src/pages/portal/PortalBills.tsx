import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Download, 
  Eye, 
  Search,
  Receipt,
  CheckCircle,
  Clock,
  AlertCircle,
  CreditCard,
  FileX
} from "lucide-react";
import { usePortalBills, usePortalCustomer } from "@/hooks/usePortalData";

const statusConfig = {
  paid: { label: "Paid", variant: "default" as const, icon: CheckCircle },
  due: { label: "Due", variant: "secondary" as const, icon: Clock },
  partial: { label: "Partial", variant: "outline" as const, icon: AlertCircle },
  overdue: { label: "Overdue", variant: "destructive" as const, icon: AlertCircle },
};

export default function PortalBills() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: customer } = usePortalCustomer();
  const { data: bills, isLoading } = usePortalBills();

  const filteredBills = (bills || []).filter(
    (bill) =>
      bill.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.billing_period_start.includes(searchTerm) ||
      bill.billing_period_end.includes(searchTerm)
  );

  const formatCurrency = (amount: number) => `৳${amount.toLocaleString()}`;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatPeriod = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return `${startDate.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}`;
  };

  const totalDue = (bills || [])
    .filter((b) => b.status !== "paid")
    .reduce((sum, b) => sum + Number(b.amount), 0);

  const paidCount = (bills || []).filter((b) => b.status === "paid").length;
  const pendingCount = (bills || []).filter((b) => b.status !== "paid").length;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-48 mt-2" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Bills</h1>
        <p className="text-muted-foreground">
          View and manage your billing history
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Outstanding</CardDescription>
            <CardTitle className="text-3xl">{formatCurrency(totalDue)}</CardTitle>
          </CardHeader>
          <CardContent>
            {totalDue > 0 && (
              <Button className="w-full gap-2">
                <CreditCard className="h-4 w-4" />
                Pay Now
              </Button>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Bills</CardDescription>
            <CardTitle className="text-3xl">{bills?.length || 0}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {paidCount} paid, {pendingCount} pending
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Bills Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Billing History
          </CardTitle>
          <CardDescription>
            View all your past and current bills
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search bills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          {filteredBills.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileX className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-medium">No Bills Found</h3>
              <p className="text-sm text-muted-foreground">
                {searchTerm ? "Try a different search term" : "You don't have any bills yet"}
              </p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBills.map((bill) => {
                    const status = bill.status || "due";
                    const StatusIcon = statusConfig[status].icon;
                    return (
                      <TableRow key={bill.id}>
                        <TableCell className="font-medium font-mono">
                          {bill.invoice_number}
                        </TableCell>
                        <TableCell>
                          {formatPeriod(bill.billing_period_start, bill.billing_period_end)}
                        </TableCell>
                        <TableCell className="font-semibold">
                          {formatCurrency(Number(bill.amount))}
                        </TableCell>
                        <TableCell>{formatDate(bill.due_date)}</TableCell>
                        <TableCell>
                          <Badge variant={statusConfig[status].variant} className="gap-1">
                            <StatusIcon className="h-3 w-3" />
                            {statusConfig[status].label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Invoice {bill.invoice_number}</DialogTitle>
                                  <DialogDescription>
                                    Billing period: {formatPeriod(bill.billing_period_start, bill.billing_period_end)}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="flex justify-between border-b pb-2">
                                    <span className="text-muted-foreground">Package</span>
                                    <span>{customer?.packages?.name || "N/A"}</span>
                                  </div>
                                  <div className="flex justify-between border-b pb-2">
                                    <span className="text-muted-foreground">Monthly Fee</span>
                                    <span>{formatCurrency(Number(bill.amount))}</span>
                                  </div>
                                  <div className="flex justify-between border-b pb-2">
                                    <span className="text-muted-foreground">Billing Period</span>
                                    <span>
                                      {formatDate(bill.billing_period_start)} - {formatDate(bill.billing_period_end)}
                                    </span>
                                  </div>
                                  <div className="flex justify-between border-b pb-2">
                                    <span className="text-muted-foreground">Due Date</span>
                                    <span>{formatDate(bill.due_date)}</span>
                                  </div>
                                  {bill.notes && (
                                    <div className="flex justify-between border-b pb-2">
                                      <span className="text-muted-foreground">Notes</span>
                                      <span>{bill.notes}</span>
                                    </div>
                                  )}
                                  <div className="flex justify-between font-bold text-lg pt-2">
                                    <span>Total</span>
                                    <span>{formatCurrency(Number(bill.amount))}</span>
                                  </div>
                                  {bill.status !== "paid" && (
                                    <Button className="w-full mt-4">
                                      <CreditCard className="mr-2 h-4 w-4" />
                                      Pay Now
                                    </Button>
                                  )}
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
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
    </div>
  );
}
