import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { cn } from "@/lib/utils";
import type { ConnectionStatus } from "@/types";

interface CustomerTableData {
  id: string;
  name: string;
  phone: string;
  package: string;
  status: ConnectionStatus;
  dueAmount: number;
  lastPayment: string;
}

const mockCustomers: CustomerTableData[] = [
  {
    id: "1",
    name: "Rahim Ahmed",
    phone: "01712345678",
    package: "30 Mbps Pro",
    status: "active",
    dueAmount: 0,
    lastPayment: "Jan 15, 2024",
  },
  {
    id: "2",
    name: "Karim Hossain",
    phone: "01812345678",
    package: "20 Mbps Basic",
    status: "active",
    dueAmount: 1500,
    lastPayment: "Dec 20, 2023",
  },
  {
    id: "3",
    name: "Nasir Khan",
    phone: "01912345678",
    package: "50 Mbps Premium",
    status: "suspended",
    dueAmount: 4500,
    lastPayment: "Nov 10, 2023",
  },
  {
    id: "4",
    name: "Jamal Uddin",
    phone: "01612345678",
    package: "30 Mbps Pro",
    status: "active",
    dueAmount: 0,
    lastPayment: "Jan 20, 2024",
  },
  {
    id: "5",
    name: "Faruk Ahmed",
    phone: "01512345678",
    package: "20 Mbps Basic",
    status: "pending",
    dueAmount: 750,
    lastPayment: "Jan 5, 2024",
  },
];

const statusStyles: Record<ConnectionStatus, string> = {
  active: "status-active",
  suspended: "status-suspended",
  pending: "status-pending",
};

const statusLabels: Record<ConnectionStatus, string> = {
  active: "Active",
  suspended: "Suspended",
  pending: "Pending",
};

export function CustomerTable() {
  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border p-4">
        <div>
          <h3 className="font-semibold">Recent Customers</h3>
          <p className="text-sm text-muted-foreground">
            Quick overview of your customers
          </p>
        </div>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>
              <Button variant="ghost" size="sm" className="-ml-3 h-8">
                Customer
                <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
              </Button>
            </TableHead>
            <TableHead>Package</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Due Amount</TableHead>
            <TableHead>Last Payment</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockCustomers.map((customer, index) => (
            <TableRow 
              key={customer.id} 
              className="data-table-row animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-xs font-medium">
                      {customer.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{customer.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {customer.phone}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm">{customer.package}</span>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={cn("text-xs font-medium", statusStyles[customer.status])}
                >
                  {statusLabels[customer.status]}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <span
                  className={cn(
                    "font-medium",
                    customer.dueAmount > 0 ? "text-destructive" : "text-muted-foreground"
                  )}
                >
                  ৳{customer.dueAmount.toLocaleString()}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground">
                  {customer.lastPayment}
                </span>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Record Payment</DropdownMenuItem>
                    <DropdownMenuItem>Generate Bill</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      Suspend Connection
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
