import { useState } from "react";
import { Plus, Search, Filter, Download, MoreHorizontal, CreditCard, Banknote, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type PaymentMethod = "cash" | "online" | "bank_transfer";

interface Payment {
  id: string;
  customerId: string;
  customerName: string;
  amount: number;
  method: PaymentMethod;
  reference?: string;
  date: string;
  collectedBy: string;
}

const payments: Payment[] = [
  {
    id: "PAY001",
    customerId: "CUS001",
    customerName: "Rahim Ahmed",
    amount: 1200,
    method: "cash",
    date: "2024-01-20T10:30:00",
    collectedBy: "Admin",
  },
  {
    id: "PAY002",
    customerId: "CUS002",
    customerName: "Karim Hossain",
    amount: 800,
    method: "online",
    reference: "UPY-789456",
    date: "2024-01-19T14:15:00",
    collectedBy: "System",
  },
  {
    id: "PAY003",
    customerId: "CUS004",
    customerName: "Jamal Uddin",
    amount: 1200,
    method: "cash",
    date: "2024-01-19T09:45:00",
    collectedBy: "Staff1",
  },
  {
    id: "PAY004",
    customerId: "CUS006",
    customerName: "Salma Begum",
    amount: 5400,
    method: "bank_transfer",
    reference: "TRX-123456",
    date: "2024-01-18T16:20:00",
    collectedBy: "Admin",
  },
  {
    id: "PAY005",
    customerId: "CUS005",
    customerName: "Faruk Ahmed",
    amount: 800,
    method: "cash",
    date: "2024-01-18T11:00:00",
    collectedBy: "Staff2",
  },
];

const methodIcons: Record<PaymentMethod, React.ReactNode> = {
  cash: <Banknote className="h-4 w-4" />,
  online: <Globe className="h-4 w-4" />,
  bank_transfer: <CreditCard className="h-4 w-4" />,
};

const methodLabels: Record<PaymentMethod, string> = {
  cash: "Cash",
  online: "Online",
  bank_transfer: "Bank Transfer",
};

const methodStyles: Record<PaymentMethod, string> = {
  cash: "bg-success/10 text-success border-success/20",
  online: "bg-primary/10 text-primary border-primary/20",
  bank_transfer: "bg-info/10 text-info border-info/20",
};

export default function Payments() {
  const [searchQuery, setSearchQuery] = useState("");
  const [methodFilter, setMethodFilter] = useState<string>("all");

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMethod = methodFilter === "all" || payment.method === methodFilter;
    return matchesSearch && matchesMethod;
  });

  const totalToday = payments
    .filter((p) => new Date(p.date).toDateString() === new Date().toDateString())
    .reduce((sum, p) => sum + p.amount, 0);

  const totalThisMonth = payments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Payments</h1>
          <p className="text-muted-foreground">
            Track and manage all payment transactions
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Record Payment
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Today's Collection</CardDescription>
            <CardTitle className="text-3xl text-success">
              ৳{totalToday.toLocaleString()}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>This Month</CardDescription>
            <CardTitle className="text-3xl">
              ৳{totalThisMonth.toLocaleString()}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Transactions</CardDescription>
            <CardTitle className="text-3xl">{payments.length}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by customer or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Select value={methodFilter} onValueChange={setMethodFilter}>
            <SelectTrigger className="w-[160px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Methods</SelectItem>
              <SelectItem value="cash">Cash</SelectItem>
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Reference</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Collected By</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.map((payment, index) => (
              <TableRow
                key={payment.id}
                className="data-table-row animate-fade-in"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {payment.id}
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{payment.customerName}</p>
                    <p className="text-xs text-muted-foreground">
                      {payment.customerId}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <span className="font-semibold text-success">
                    ৳{payment.amount.toLocaleString()}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn("gap-1.5", methodStyles[payment.method])}
                  >
                    {methodIcons[payment.method]}
                    {methodLabels[payment.method]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {payment.reference || "—"}
                  </span>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="text-sm">
                      {new Date(payment.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(payment.date).toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{payment.collectedBy}</span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Print Receipt</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Void Payment
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredPayments.length} of {payments.length} payments
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
