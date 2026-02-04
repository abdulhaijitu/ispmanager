import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

export type Bill = Tables<"bills"> & {
  customer?: Tables<"customers"> & {
    package?: Tables<"packages">;
  };
  payments?: Tables<"payments">[];
};

export function useBills(tenantId?: string) {
  return useQuery({
    queryKey: ["bills", tenantId],
    queryFn: async () => {
      let query = supabase
        .from("bills")
        .select(`
          *,
          customer:customers(
            *,
            package:packages(*)
          ),
          payments(*)
        `)
        .order("created_at", { ascending: false });

      if (tenantId) {
        query = query.eq("tenant_id", tenantId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Bill[];
    },
    enabled: true,
  });
}

export function useBill(billId: string) {
  return useQuery({
    queryKey: ["bill", billId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bills")
        .select(`
          *,
          customer:customers(
            *,
            package:packages(*)
          ),
          payments(*)
        `)
        .eq("id", billId)
        .single();

      if (error) throw error;
      return data as Bill;
    },
    enabled: !!billId,
  });
}

export function useCustomerBills(customerId: string) {
  return useQuery({
    queryKey: ["bills", "customer", customerId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bills")
        .select("*")
        .eq("customer_id", customerId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!customerId,
  });
}

export function useCreateBill() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bill: TablesInsert<"bills">) => {
      const { data, error } = await supabase
        .from("bills")
        .insert(bill)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bills"] });
    },
  });
}

export function useUpdateBill() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<TablesInsert<"bills">>;
    }) => {
      const { data, error } = await supabase
        .from("bills")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["bills"] });
      queryClient.invalidateQueries({ queryKey: ["bill", variables.id] });
    },
  });
}

export function useGenerateBills() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      tenantId,
      billingPeriodStart,
      billingPeriodEnd,
      dueDate,
    }: {
      tenantId: string;
      billingPeriodStart: string;
      billingPeriodEnd: string;
      dueDate: string;
    }) => {
      // Get all active customers with their packages
      const { data: customers, error: customersError } = await supabase
        .from("customers")
        .select("*, package:packages(*)")
        .eq("tenant_id", tenantId)
        .eq("connection_status", "active");

      if (customersError) throw customersError;

      // Generate bills for each customer
      const bills = customers
        .filter((c) => c.package)
        .map((customer, index) => ({
          tenant_id: tenantId,
          customer_id: customer.id,
          amount: customer.package!.monthly_price,
          billing_period_start: billingPeriodStart,
          billing_period_end: billingPeriodEnd,
          due_date: dueDate,
          invoice_number: `INV-${new Date().getFullYear()}-${String(index + 1).padStart(4, "0")}`,
          status: "due" as const,
        }));

      if (bills.length === 0) {
        throw new Error("No active customers with packages to bill");
      }

      const { data, error } = await supabase
        .from("bills")
        .insert(bills)
        .select();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bills"] });
    },
  });
}
