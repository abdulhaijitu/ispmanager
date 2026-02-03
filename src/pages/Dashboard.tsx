import { 
  Users, 
  Wallet, 
  TrendingUp, 
  AlertCircle,
  UserPlus,
  ArrowDownRight
} from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { CustomerTable } from "@/components/dashboard/CustomerTable";
import { RevenueChart } from "@/components/dashboard/RevenueChart";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your ISP operations.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Customers"
          value="2,847"
          subtitle="Active connections"
          icon={Users}
          trend={{ value: 12, isPositive: true }}
          variant="default"
        />
        <MetricCard
          title="Monthly Revenue"
          value="৳2,35,000"
          subtitle="January 2024"
          icon={Wallet}
          trend={{ value: 8, isPositive: true }}
          variant="success"
        />
        <MetricCard
          title="Collection Rate"
          value="94.2%"
          subtitle="Last 30 days"
          icon={TrendingUp}
          trend={{ value: 2.1, isPositive: true }}
          variant="success"
        />
        <MetricCard
          title="Total Due"
          value="৳45,200"
          subtitle="From 124 customers"
          icon={AlertCircle}
          trend={{ value: 5, isPositive: false }}
          variant="warning"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          title="New Customers"
          value="48"
          subtitle="This month"
          icon={UserPlus}
          variant="default"
        />
        <MetricCard
          title="Suspended"
          value="23"
          subtitle="Due to non-payment"
          icon={ArrowDownRight}
          variant="danger"
        />
        <MetricCard
          title="Avg. Revenue/Customer"
          value="৳825"
          subtitle="Per month"
          icon={TrendingUp}
          variant="success"
        />
      </div>

      {/* Charts and Activity */}
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <RevenueChart />
        </div>
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
      </div>

      {/* Customer Table */}
      <CustomerTable />
    </div>
  );
}
