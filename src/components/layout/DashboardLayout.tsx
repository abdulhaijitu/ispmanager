import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useTenantContext } from "@/contexts/TenantContext";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft } from "lucide-react";

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { isImpersonating, currentTenant, stopImpersonation } = useTenantContext();

  const handleExitImpersonation = () => {
    stopImpersonation();
    navigate("/admin/tenants");
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background">
        <DashboardSidebar />
        <div className="flex flex-1 flex-col">
          {/* Impersonation Banner */}
          {isImpersonating && (
            <div className="bg-destructive/20 text-destructive-foreground px-4 py-2 flex items-center justify-between border-b border-destructive/30">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <span className="text-sm font-medium">
                  আপনি "{currentTenant?.name}" টেন্যান্টে অ্যাডমিন হিসেবে লগইন আছেন
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExitImpersonation}
                className="border-destructive/50 hover:bg-destructive/10"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Super Admin-এ ফিরে যান
              </Button>
            </div>
          )}
          <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          <main className="flex-1 overflow-auto p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
