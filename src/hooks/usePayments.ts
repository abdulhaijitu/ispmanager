import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

export type Payment = Tables<"payments"> & {
  customer?: Tables<"customers">;
  bill?: Tables<"bills">;
};

export function usePayments(tenantId?: string) {
  return useQuery({
    queryKey: ["payments", tenantId],
    queryFn: async () => {
      let query = supabase
        .from("payments")
        .select(`
          *,
          customer:customers(*),
          bill:bills(*)
        `)
        .order("created_at", { ascending: false });

      if (tenantId) {
        query = query.eq("tenant_id", tenantId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Payment[];
    },
    enabled: true,
  });
}

export function useCustomerPayments(customerId: string) {
  return useQuery({
    queryKey: ["payments", "customer", customerId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("payments")
        .select(`
          *,
          bill:bills(*)
        `)
        .eq("customer_id", customerId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Payment[];
    },
    enabled: !!customerId,
  });
}

export function useRecordPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payment: TablesInsert<"payments">) => {
      const { data, error } = await supabase
        .from("payments")
        .insert(payment)
        .select()
        .single();

      if (error) throw error;

      // Update bill status if payment is linked to a bill
      if (payment.bill_id) {
        const { data: bill } = await supabase
          .from("bills")
          .select("amount")
          .eq("id", payment.bill_id)
          .single();

        if (bill) {
          // Get total payments for this bill
          const { data: payments } = await supabase
            .from("payments")
            .select("amount")
            .eq("bill_id", payment.bill_id);

          const totalPaid = payments?.reduce((sum, p) => sum + Number(p.amount), 0) || 0;
          const billAmount = Number(bill.amount);

          let newStatus: "paid" | "partial" | "due" = "due";
          if (totalPaid >= billAmount) {
            newStatus = "paid";
          } else if (totalPaid > 0) {
            newStatus = "partial";
          }

          await supabase
            .from("bills")
            .update({ status: newStatus })
            .eq("id", payment.bill_id);
        }
      }

      // Update customer's last payment date and balances
      await supabase
        .from("customers")
        .update({
          last_payment_date: new Date().toISOString().split("T")[0],
        })
        .eq("id", payment.customer_id);

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      queryClient.invalidateQueries({ queryKey: ["bills"] });
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
}
