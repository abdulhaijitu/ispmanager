import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import type { Tables } from "@/integrations/supabase/types";

export type Customer = Tables<"customers"> & {
  packages?: Tables<"packages"> | null;
};

export type Bill = Tables<"bills">;
export type Payment = Tables<"payments">;

// Fetch current customer data based on logged-in user
export function usePortalCustomer() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["portalCustomer", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      const { data, error } = await supabase
        .from("customers")
        .select(`
          *,
          packages (*)
        `)
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;
      return data as Customer | null;
    },
    enabled: !!user?.id,
  });
}

// Fetch customer's bills
export function usePortalBills() {
  const { data: customer } = usePortalCustomer();

  return useQuery({
    queryKey: ["portalBills", customer?.id],
    queryFn: async () => {
      if (!customer?.id) return [];

      const { data, error } = await supabase
        .from("bills")
        .select("*")
        .eq("customer_id", customer.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Bill[];
    },
    enabled: !!customer?.id,
  });
}

// Fetch customer's payments
export function usePortalPayments() {
  const { data: customer } = usePortalCustomer();

  return useQuery({
    queryKey: ["portalPayments", customer?.id],
    queryFn: async () => {
      if (!customer?.id) return [];

      const { data, error } = await supabase
        .from("payments")
        .select(`
          *,
          bills (invoice_number)
        `)
        .eq("customer_id", customer.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as (Payment & { bills?: { invoice_number: string } | null })[];
    },
    enabled: !!customer?.id,
  });
}

// Get customer's current/latest bill
export function usePortalCurrentBill() {
  const { data: bills } = usePortalBills();
  
  return bills?.find(b => b.status !== "paid") || bills?.[0] || null;
}

// Get customer's last payment
export function usePortalLastPayment() {
  const { data: payments } = usePortalPayments();
  
  return payments?.[0] || null;
}
