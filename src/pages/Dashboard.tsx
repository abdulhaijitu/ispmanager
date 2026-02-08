import { 
  Users, 
  Wallet, 
  TrendingUp, 
  AlertCircle,
  UserPlus,
  ArrowDownRight,
  Plus,
  FileText,
  Info,
} from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { CustomerTable } from "@/components/dashboard/CustomerTable";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { useTenantContext } from "@/contexts/TenantContext";
import { useCustomers } from "@/hooks/useCustomers";
import { usePayments } from "@/hooks/usePayments";
import { useBills } from "@/hooks/useBills";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertBanner } from "@/components/shared/AlertBanner";
import { OnboardingChecklist } from "@/components/onboarding/OnboardingChecklist";
import { useDemoMode } from "@/contexts/DemoModeContext";
import { demoMetrics } from "@/data/demoData";

export default function Dashboard() {
  const navigate = useNavigate();
  const { currentTenant, isLoading: tenantLoading } = useTenantContext();
  const { isDemoMode } = useDemoMode();
  const { data: customers = [], isLoading: customersLoading } = useCustomers(currentTenant?.id);
  const { data: payments = [], isLoading: paymentsLoading } = usePayments(currentTenant?.id);
  const { data: bills = [], isLoading: billsLoading } = useBills(currentTenant?.id);

  const isLoading = !isDemoMode && (tenantLoading || customersLoading || paymentsLoading || billsLoading);

  // Calculate metrics — use demo data when in demo mode
  const totalCustomers = isDemoMode ? demoMetrics.totalCustomers : customers.length;
  const activeCustomers = isDemoMode ? demoMetrics.activeCustomers : customers.filter(c => c.connection_status === "active").length;
  const suspendedCustomers = isDemoMode ? demoMetrics.suspendedCustomers : customers.filter(c => c.connection_status === "suspended").length;

  const now = new Date();
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
  
  const newCustomersThisMonth = isDemoMode ? demoMetrics.newCustomersThisMonth : customers.filter(c => {
    const joinDate = new Date(c.join_date);
    return joinDate >= thisMonthStart;
  }).length;

  const customerGrowth = isDemoMode ? demoMetrics.customerGrowth : (() => {
    const newCustomersLastMonth = customers.filter(c => {
      const joinDate = new Date(c.join_date);
      return joinDate >= lastMonthStart && joinDate <= lastMonthEnd;
    }).length;
    return newCustomersLastMonth > 0 
      ? Math.round(((newCustomersThisMonth - newCustomersLastMonth) / newCustomersLastMonth) * 100)
      : newCustomersThisMonth > 0 ? 100 : 0;
  })();

  const monthlyRevenue = isDemoMode ? demoMetrics.monthlyRevenue : (() => {
    const monthlyPayments = payments.filter(p => {
      const paymentDate = new Date(p.created_at);
      return paymentDate >= thisMonthStart;
    });
    return monthlyPayments.reduce((sum, p) => sum + Number(p.amount), 0);
  })();

  const revenueGrowth = isDemoMode ? demoMetrics.revenueGrowth : (() => {
    const thisMonthPayments = payments.filter(p => new Date(p.created_at) >= thisMonthStart);
    const lastMonthPay = payments.filter(p => {
      const d = new Date(p.created_at);
      return d >= lastMonthStart && d <= lastMonthEnd;
    });
    const lastMonthRev = lastMonthPay.reduce((sum, p) => sum + Number(p.amount), 0);
    const thisMonthRev = thisMonthPayments.reduce((sum, p) => sum + Number(p.amount), 0);
    return lastMonthRev > 0
      ? Math.round(((thisMonthRev - lastMonthRev) / lastMonthRev) * 100)
      : thisMonthRev > 0 ? 100 : 0;
  })();

  const totalDue = isDemoMode ? demoMetrics.totalDue : customers.reduce((sum, c) => sum + (c.due_balance || 0), 0);
  const customersWithDue = isDemoMode ? demoMetrics.customersWithDue : customers.filter(c => (c.due_balance || 0) > 0).length;

  const monthlyBillsCount = isDemoMode ? demoMetrics.monthlyBillsCount : bills.filter(b => {
    const billDate = new Date(b.created_at);
    return billDate >= thisMonthStart;
  }).length;

  const totalBilled = isDemoMode ? 9300 : bills.filter(b => new Date(b.created_at) >= thisMonthStart).reduce((sum, b) => sum + Number(b.amount), 0);
  const collectionRate = isDemoMode ? demoMetrics.collectionRate : (totalBilled > 0 ? ((monthlyRevenue / totalBilled) * 100) : 0);

  // Contextual guidance checks
  const hasNoPaymentGateway = !isDemoMode && !currentTenant?.enable_online_payment;
  const autoSuspendDays = currentTenant?.auto_suspend_days;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-5 w-64" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header with Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {now.toLocaleDateString("en-US", { month: "long", year: "numeric" })} — your ISP at a glance
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-1.5"
            onClick={() => navigate("/dashboard/billing")}
          >
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Generate Bills</span>
          </Button>
          <Button 
            size="sm" 
            className="gap-1.5"
            onClick={() => navigate("/dashboard/customers")}
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Customer</span>
          </Button>
        </div>
      </div>

      {/* Onboarding Checklist */}
      <OnboardingChecklist />

      {/* Contextual Guidance Banners */}
      {hasNoPaymentGateway && totalCustomers > 0 && (
        <AlertBanner variant="info" title="Collect payments faster">
          Enable online payments so customers can pay directly from their portal — reducing manual collection effort.{" "}
          <button onClick={() => navigate("/dashboard/settings")} className="font-semibold text-primary underline underline-offset-2">
            Set up now →
          </button>
        </AlertBanner>
      )}

      {suspendedCustomers > 0 && autoSuspendDays && autoSuspendDays > 0 && (
        <AlertBanner variant="warning" title={`${suspendedCustomers} connection${suspendedCustomers > 1 ? "s" : ""} suspended`}>
          Unpaid customers are automatically suspended after {autoSuspendDays} days. Connections restore instantly once payment is received.
        </AlertBanner>
      )}

      {/* Primary Metrics — Revenue & Due first */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Monthly Revenue"
          value={`৳${monthlyRevenue.toLocaleString()}`}
          subtitle={now.toLocaleDateString("en-US", { month: "long" })}
          icon={Wallet}
          trend={revenueGrowth !== 0 ? { value: Math.abs(revenueGrowth), isPositive: revenueGrowth > 0 } : undefined}
          variant="success"
        />
        <MetricCard
          title="Outstanding Due"
          value={`৳${totalDue.toLocaleString()}`}
          subtitle={customersWithDue > 0 ? `From ${customersWithDue} customer${customersWithDue > 1 ? "s" : ""}` : "All caught up!"}
          icon={AlertCircle}
          variant={totalDue > 0 ? "warning" : "success"}
        />
        <MetricCard
          title="Active Customers"
          value={activeCustomers.toLocaleString()}
          subtitle={`${totalCustomers} total`}
          icon={Users}
          trend={customerGrowth !== 0 ? { value: Math.abs(customerGrowth), isPositive: customerGrowth > 0 } : undefined}
          variant="default"
        />
        <MetricCard
          title="Collection Rate"
          value={`${collectionRate.toFixed(0)}%`}
          subtitle="This month"
          icon={TrendingUp}
          variant={collectionRate >= 90 ? "success" : collectionRate >= 70 ? "warning" : "danger"}
        />
      </div>

      {/* Secondary Metrics - Compact */}
      <div className="grid gap-4 sm:grid-cols-3">
        <MetricCard
          title="New This Month"
          value={newCustomersThisMonth.toString()}
          icon={UserPlus}
          variant="default"
          className="py-4"
        />
        <MetricCard
          title="Suspended"
          value={suspendedCustomers.toString()}
          icon={ArrowDownRight}
          variant={suspendedCustomers > 0 ? "danger" : "default"}
          className="py-4"
        />
        <MetricCard
          title="Bills Generated"
          value={monthlyBillsCount.toString()}
          icon={FileText}
          variant="default"
          className="py-4"
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
