import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import type { Tables } from "@/integrations/supabase/types";

export type Tenant = Tables<"tenants">;

export function useCurrentTenant() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["currentTenant", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      // First get the user's profile to find their tenant_id
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("tenant_id")
        .eq("id", user.id)
        .single();

      if (profileError || !profile?.tenant_id) {
        return null;
      }

      // Then get the tenant details
      const { data: tenant, error: tenantError } = await supabase
        .from("tenants")
        .select("*")
        .eq("id", profile.tenant_id)
        .single();

      if (tenantError) throw tenantError;
      return tenant as Tenant;
    },
    enabled: !!user?.id,
  });
}

export function useUserRoles() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["userRoles", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from("user_roles")
        .select("role, tenant_id")
        .eq("user_id", user.id);

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });
}

export function useIsSuperAdmin() {
  const { data: roles } = useUserRoles();
  return roles?.some((r) => r.role === "super_admin") ?? false;
}
