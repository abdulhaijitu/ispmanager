import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

export type Tenant = Tables<"tenants">;
export type TenantWithStats = Tenant & {
  customer_count?: number;
  owner_name?: string;
  owner_email?: string;
};

// Fetch all tenants (for super admin)
export function useAllTenants() {
  return useQuery({
    queryKey: ["allTenants"],
    queryFn: async () => {
      const { data: tenants, error } = await supabase
        .from("tenants")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      // Get customer counts for each tenant
      const tenantsWithStats: TenantWithStats[] = await Promise.all(
        (tenants ?? []).map(async (tenant) => {
          // Get customer count
          const { count: customerCount } = await supabase
            .from("customers")
            .select("*", { count: "exact", head: true })
            .eq("tenant_id", tenant.id);

          // Get owner info from profiles/user_roles
          const { data: ownerRole } = await supabase
            .from("user_roles")
            .select("user_id")
            .eq("tenant_id", tenant.id)
            .eq("role", "isp_owner")
            .maybeSingle();

          let ownerName = "";
          let ownerEmail = "";
          
          if (ownerRole?.user_id) {
            const { data: profile } = await supabase
              .from("profiles")
              .select("full_name, email")
              .eq("id", ownerRole.user_id)
              .maybeSingle();
            
            ownerName = profile?.full_name || "";
            ownerEmail = profile?.email || "";
          }

          return {
            ...tenant,
            customer_count: customerCount ?? 0,
            owner_name: ownerName,
            owner_email: ownerEmail,
          };
        })
      );

      return tenantsWithStats;
    },
  });
}

// Get platform stats
export function usePlatformStats() {
  return useQuery({
    queryKey: ["platformStats"],
    queryFn: async () => {
      // Get tenant counts by status
      const { data: tenants, error: tenantsError } = await supabase
        .from("tenants")
        .select("subscription_status");

      if (tenantsError) throw tenantsError;

      const totalTenants = tenants?.length ?? 0;
      const activeSubscriptions = tenants?.filter(t => t.subscription_status === "active").length ?? 0;
      const trialTenants = tenants?.filter(t => t.subscription_status === "trial").length ?? 0;
      const suspendedTenants = tenants?.filter(t => t.subscription_status === "suspended").length ?? 0;

      // Get total customers count
      const { count: totalCustomers } = await supabase
        .from("customers")
        .select("*", { count: "exact", head: true });

      // Get active customers count
      const { count: activeConnections } = await supabase
        .from("customers")
        .select("*", { count: "exact", head: true })
        .eq("connection_status", "active");

      return {
        totalTenants,
        activeSubscriptions,
        trialTenants,
        suspendedTenants,
        totalEndUsers: totalCustomers ?? 0,
        activeConnections: activeConnections ?? 0,
      };
    },
  });
}

// Update tenant
export function useUpdateTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: TablesUpdate<"tenants">;
    }) => {
      const { data, error } = await supabase
        .from("tenants")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allTenants"] });
      queryClient.invalidateQueries({ queryKey: ["platformStats"] });
    },
  });
}

// Delete tenant
export function useDeleteTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (tenantId: string) => {
      const { error } = await supabase
        .from("tenants")
        .delete()
        .eq("id", tenantId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allTenants"] });
      queryClient.invalidateQueries({ queryKey: ["platformStats"] });
    },
  });
}
