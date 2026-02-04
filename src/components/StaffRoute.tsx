import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useIsStaff, useIsSuperAdmin } from "@/hooks/useUserRole";
import { useTenantContext } from "@/contexts/TenantContext";
import { Loader2 } from "lucide-react";

interface StaffRouteProps {
  children: React.ReactNode;
}

export function StaffRoute({ children }: StaffRouteProps) {
  const { user, loading: authLoading } = useAuth();
  const { isStaff, isLoading: roleLoading } = useIsStaff();
  const { isSuperAdmin, isLoading: superAdminLoading } = useIsSuperAdmin();
  const { isImpersonating } = useTenantContext();
  const location = useLocation();

  if (authLoading || roleLoading || superAdminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Allow super admin in impersonation mode to access staff routes
  if (isSuperAdmin && isImpersonating) {
    return <>{children}</>;
  }

  if (!isStaff) {
    // User is logged in but not staff - redirect to customer portal
    return <Navigate to="/portal" replace />;
  }

  return <>{children}</>;
}
