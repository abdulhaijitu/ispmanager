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
        <div className="p-4 safe-area-inset animate-fade-in">
          {children}
        </div>
      </main>

      {/* Bottom Navigation - Fixed */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border safe-area-bottom z-50">
        <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path !== "/app" && location.pathname.startsWith(item.path));
            const Icon = item.icon;
            
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "relative flex flex-col items-center justify-center flex-1 py-2 rounded-xl transition-all duration-200",
                  "active:scale-[0.95] touch-manipulation",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                {/* Active indicator */}
                {isActive && (
                  <span className="absolute top-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-primary animate-scale-in" />
                )}
                
                <div className={cn(
                  "relative p-1.5 rounded-xl transition-all duration-200",
                  isActive && "bg-primary/10"
                )}>
                  <Icon className={cn(
                    "w-5 h-5 transition-transform duration-200",
                    isActive && "scale-110"
                  )} />
                </div>
                <span className={cn(
                  "text-[10px] font-medium mt-0.5 transition-all duration-200",
                  isActive && "font-semibold"
                )}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
