import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

export type Package = Tables<"packages">;

export function usePackages(tenantId?: string) {
  return useQuery({
    queryKey: ["packages", tenantId],
    queryFn: async () => {
      let query = supabase
        .from("packages")
        .select("*")
        .order("monthly_price", { ascending: true });

      if (tenantId) {
        query = query.eq("tenant_id", tenantId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Package[];
    },
    enabled: true,
  });
}

export function useCreatePackage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (pkg: TablesInsert<"packages">) => {
      const { data, error } = await supabase
        .from("packages")
        .insert(pkg)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
    },
  });
}

export function useUpdatePackage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<TablesInsert<"packages">>;
    }) => {
      const { data, error } = await supabase
        .from("packages")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
    },
  });
}

export function useDeletePackage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (packageId: string) => {
      const { error } = await supabase
        .from("packages")
        .delete()
        .eq("id", packageId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
    },
  });
}
