import { useState } from "react";
import { Plus, Search, Filter, Download, MoreHorizontal, ArrowUpDown } from "lucide-react";
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

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  package: string;
  status: ConnectionStatus;
  dueAmount: number;
  advanceAmount: number;
  joinDate: string;
  lastPayment: string;
}

const customers: Customer[] = [
  {
    id: "CUS001",
    name: "Rahim Ahmed",
    email: "rahim@email.com",
    phone: "01712345678",
    address: "House 12, Road 5, Dhanmondi",
    package: "30 Mbps Pro",
    status: "active",
    dueAmount: 0,
    advanceAmount: 1500,
    joinDate: "2023-06-15",
    lastPayment: "2024-01-15",
  },
  {
    id: "CUS002",
    name: "Karim Hossain",
    email: "karim@email.com",
    phone: "01812345678",
    address: "Flat 4B, Gulshan Avenue",
    package: "20 Mbps Basic",
    status: "active",
    dueAmount: 1500,
    advanceAmount: 0,
    joinDate: "2023-08-20",
    lastPayment: "2023-12-20",
  },
  {
    id: "CUS003",
    name: "Nasir Khan",
    email: "nasir@email.com",
    phone: "01912345678",
    address: "789 Banani DOHS",
    package: "50 Mbps Premium",
    status: "suspended",
    dueAmount: 4500,
    advanceAmount: 0,
    joinDate: "2023-03-10",
    lastPayment: "2023-11-10",
  },
  {
    id: "CUS004",
    name: "Jamal Uddin",
    email: "jamal@email.com",
    phone: "01612345678",
    address: "321 Mirpur-10",
    package: "30 Mbps Pro",
    status: "active",
    dueAmount: 0,
    advanceAmount: 0,
    joinDate: "2023-09-01",
    lastPayment: "2024-01-20",
  },
  {
    id: "CUS005",
    name: "Faruk Ahmed",
    email: "faruk@email.com",
    phone: "01512345678",
    address: "567 Uttara Sector-7",
    package: "20 Mbps Basic",
    status: "pending",
    dueAmount: 750,
    advanceAmount: 0,
    joinDate: "2024-01-05",
    lastPayment: "2024-01-05",
  },
  {
    id: "CUS006",
    name: "Salma Begum",
    email: "salma@email.com",
    phone: "01712345679",
    address: "89 Mohammadpur",
    package: "50 Mbps Premium",
    status: "active",
    dueAmount: 0,
    advanceAmount: 3000,
    joinDate: "2022-11-15",
    lastPayment: "2024-01-18",
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

export default function Customers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery) ||
      customer.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">
            Manage your customer base and connections
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Customer
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, phone, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
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
              <TableHead>
                <Button variant="ghost" size="sm" className="-ml-3 h-8">
                  Customer
                  <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
                </Button>
              </TableHead>
              <TableHead>Package</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Due</TableHead>
              <TableHead className="text-right">Advance</TableHead>
              <TableHead>Last Payment</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer, index) => (
              <TableRow
                key={customer.id}
                className="data-table-row animate-fade-in"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {customer.id}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center">
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
                <TableCell className="text-right">
                  <span
                    className={cn(
                      "font-medium",
                      customer.advanceAmount > 0 ? "text-success" : "text-muted-foreground"
                    )}
                  >
                    ৳{customer.advanceAmount.toLocaleString()}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {new Date(customer.lastPayment).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
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
                      <DropdownMenuItem>Edit Customer</DropdownMenuItem>
                      <DropdownMenuItem>Record Payment</DropdownMenuItem>
                      <DropdownMenuItem>Generate Bill</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {customer.status === "active" ? (
                        <DropdownMenuItem className="text-destructive">
                          Suspend Connection
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem className="text-success">
                          Activate Connection
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination placeholder */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredCustomers.length} of {customers.length} customers
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
