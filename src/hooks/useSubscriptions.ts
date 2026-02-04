import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type SubscriptionWithTenant = {
  id: string;
  tenant_id: string;
  tenant_name: string;
  subdomain: string;
  subscription_status: "active" | "trial" | "suspended";
  customer_count: number;
  created_at: string;
};

// Fetch all subscriptions with tenant info (for super admin)
export function useAllSubscriptions() {
  return useQuery({
    queryKey: ["allSubscriptions"],
    queryFn: async () => {
      const { data: tenants, error } = await supabase
        .from("tenants")
        .select("id, name, subdomain, subscription_status, created_at")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Get customer counts for each tenant
      const subscriptions: SubscriptionWithTenant[] = await Promise.all(
        (tenants ?? []).map(async (tenant) => {
          const { count } = await supabase
            .from("customers")
            .select("*", { count: "exact", head: true })
            .eq("tenant_id", tenant.id);

          return {
            id: tenant.id,
            tenant_id: tenant.id,
            tenant_name: tenant.name,
            subdomain: tenant.subdomain,
            subscription_status: tenant.subscription_status ?? "trial",
            customer_count: count ?? 0,
            created_at: tenant.created_at,
          };
        })
      );

      return subscriptions;
    },
  });
}

// Get subscription stats
export function useSubscriptionStats() {
  return useQuery({
    queryKey: ["subscriptionStats"],
    queryFn: async () => {
      const { data: tenants, error } = await supabase
        .from("tenants")
        .select("subscription_status");

      if (error) throw error;

      const active = tenants?.filter(t => t.subscription_status === "active").length ?? 0;
      const trial = tenants?.filter(t => t.subscription_status === "trial").length ?? 0;
      const suspended = tenants?.filter(t => t.subscription_status === "suspended").length ?? 0;
      const total = tenants?.length ?? 0;

      return {
        active,
        trial,
        suspended,
        total,
      };
    },
  });
}
