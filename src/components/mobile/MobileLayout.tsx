import { ReactNode, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Receipt, CreditCard, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { usePortalCustomer } from "@/hooks/usePortalData";

interface MobileLayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: "/app", icon: Home, label: "Home" },
  { path: "/app/bills", icon: Receipt, label: "Bills" },
  { path: "/app/payments", icon: CreditCard, label: "Payments" },
  { path: "/app/profile", icon: User, label: "Profile" },
];

export default function MobileLayout({ children }: MobileLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading: authLoading } = useAuth();
  const { data: customer, isLoading: customerLoading } = usePortalCustomer();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/app/login", { replace: true });
    }
  }, [user, authLoading, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main Content Area - Scrollable */}
      <main className="flex-1 overflow-y-auto pb-20">
        <div className="p-4 safe-area-inset">
          {children}
        </div>
      </main>

      {/* Bottom Navigation - Fixed */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border safe-area-bottom z-50">
        <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "flex flex-col items-center justify-center w-full h-full gap-1 transition-colors",
                  "active:bg-muted/50 touch-manipulation",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <Icon className={cn("w-6 h-6", isActive && "fill-primary/20")} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
