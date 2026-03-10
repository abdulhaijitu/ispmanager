import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useTenantContext } from "@/contexts/TenantContext";
import { toast } from "sonner";

export interface OltDevice {
  id: string;
  tenant_id: string;
  name: string;
  brand: string;
  model: string | null;
  host: string;
  port: number;
  protocol: string;
  username: string;
  credentials_encrypted: string | null;
  snmp_community: string | null;
  snmp_version: string | null;
  total_pon_ports: number;
  is_enabled: boolean;
  notes: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface OltPort {
  id: string;
  olt_device_id: string;
  tenant_id: string;
  slot: number;
  port: number;
  port_label: string | null;
  port_type: string;
  status: string;
  max_onus: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
  customer_onu_count?: number;
}

export interface CustomerOnu {
  id: string;
  customer_id: string;
  olt_port_id: string;
  tenant_id: string;
  onu_number: number | null;
  onu_serial: string | null;
  onu_mac: string | null;
  onu_type: string;
  vlan_id: number | null;
  service_port_id: number | null;
  onu_status: string;
  rx_power: number | null;
  tx_power: number | null;
  last_seen_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  customers?: { name: string; phone: string; connection_status: string } | null;
  olt_ports?: { slot: number; port: number; port_label: string | null; olt_devices?: { name: string } | null } | null;
}

export function useOltDevices() {
  const { currentTenant } = useTenantContext();
  return useQuery({
    queryKey: ["olt-devices", currentTenant?.id],
    queryFn: async () => {
      if (!currentTenant?.id) return [];
      const { data, error } = await supabase
        .from("olt_devices")
        .select("*")
        .eq("tenant_id", currentTenant.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as OltDevice[];
    },
    enabled: !!currentTenant?.id,
  });
}

export function useOltPorts(deviceId?: string) {
  const { currentTenant } = useTenantContext();
  return useQuery({
    queryKey: ["olt-ports", currentTenant?.id, deviceId],
    queryFn: async () => {
      if (!currentTenant?.id) return [];
      let query = supabase
        .from("olt_ports")
        .select("*")
        .eq("tenant_id", currentTenant.id)
        .order("slot")
        .order("port");
      if (deviceId) query = query.eq("olt_device_id", deviceId);
      const { data, error } = await query;
      if (error) throw error;
      return data as OltPort[];
    },
    enabled: !!currentTenant?.id,
  });
}

export function useCustomerOnu(customerId?: string) {
  const { currentTenant } = useTenantContext();
  return useQuery({
    queryKey: ["customer-onu", currentTenant?.id, customerId],
    queryFn: async () => {
      if (!currentTenant?.id) return null;
      let query = supabase
        .from("customer_onu")
        .select("*, customers(name, phone, connection_status), olt_ports(slot, port, port_label, olt_devices:olt_device_id(name))")
        .eq("tenant_id", currentTenant.id);
      if (customerId) {
        query = query.eq("customer_id", customerId).maybeSingle();
        const { data, error } = await query;
        if (error) throw error;
        return data as CustomerOnu | null;
      }
      return null;
    },
    enabled: !!currentTenant?.id && !!customerId,
  });
}

export function useAllCustomerOnus() {
  const { currentTenant } = useTenantContext();
  return useQuery({
    queryKey: ["all-customer-onus", currentTenant?.id],
    queryFn: async () => {
      if (!currentTenant?.id) return [];
      const { data, error } = await supabase
        .from("customer_onu")
        .select("*, customers(name, phone, connection_status), olt_ports(slot, port, port_label, olt_devices:olt_device_id(name))")
        .eq("tenant_id", currentTenant.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as CustomerOnu[];
    },
    enabled: !!currentTenant?.id,
  });
}

export function useCreateOltDevice() {
  const queryClient = useQueryClient();
  const { currentTenant } = useTenantContext();
  return useMutation({
    mutationFn: async (device: Partial<OltDevice>) => {
      if (!currentTenant?.id) throw new Error("No tenant");
      const { data, error } = await supabase
        .from("olt_devices")
        .insert({ ...device, tenant_id: currentTenant.id } as any)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["olt-devices"] });
      toast.success("OLT ডিভাইস যোগ করা হয়েছে");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useUpdateOltDevice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<OltDevice> & { id: string }) => {
      const { data, error } = await supabase
        .from("olt_devices")
        .update(updates as any)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["olt-devices"] });
      toast.success("OLT ডিভাইস আপডেট হয়েছে");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useDeleteOltDevice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("olt_devices").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["olt-devices"] });
      toast.success("OLT ডিভাইস মুছে ফেলা হয়েছে");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useCreateOltPort() {
  const queryClient = useQueryClient();
  const { currentTenant } = useTenantContext();
  return useMutation({
    mutationFn: async (port: Partial<OltPort>) => {
      if (!currentTenant?.id) throw new Error("No tenant");
      const { data, error } = await supabase
        .from("olt_ports")
        .insert({ ...port, tenant_id: currentTenant.id } as any)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["olt-ports"] });
      toast.success("পোর্ট যোগ করা হয়েছে");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useCreateCustomerOnu() {
  const queryClient = useQueryClient();
  const { currentTenant } = useTenantContext();
  return useMutation({
    mutationFn: async (onu: Partial<CustomerOnu>) => {
      if (!currentTenant?.id) throw new Error("No tenant");
      const { data, error } = await supabase
        .from("customer_onu")
        .insert({ ...onu, tenant_id: currentTenant.id } as any)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer-onu"] });
      queryClient.invalidateQueries({ queryKey: ["all-customer-onus"] });
      toast.success("ONU অ্যাসাইন করা হয়েছে");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useUpdateCustomerOnu() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<CustomerOnu> & { id: string }) => {
      const { data, error } = await supabase
        .from("customer_onu")
        .update(updates as any)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer-onu"] });
      queryClient.invalidateQueries({ queryKey: ["all-customer-onus"] });
      toast.success("ONU তথ্য আপডেট হয়েছে");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useDeleteCustomerOnu() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("customer_onu").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer-onu"] });
      queryClient.invalidateQueries({ queryKey: ["all-customer-onus"] });
      toast.success("ONU রিমুভ করা হয়েছে");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
