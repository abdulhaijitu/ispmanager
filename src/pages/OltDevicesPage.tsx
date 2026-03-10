import { useState } from "react";
import {
  Server, Plus, RefreshCw, Settings2, Trash2, Edit, Network as NetworkIcon,
  CheckCircle, XCircle, MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useOltDevices, useCreateOltDevice, useUpdateOltDevice, useDeleteOltDevice,
  type OltDevice,
} from "@/hooks/useOltDevices";
import { OltDeviceFormDialog } from "@/components/olt/OltDeviceFormDialog";
import { OltPortsDialog } from "@/components/olt/OltPortsDialog";
import { useQueryClient } from "@tanstack/react-query";

export default function OltDevicesPage() {
  const queryClient = useQueryClient();
  const { data: devices, isLoading } = useOltDevices();
  const createDevice = useCreateOltDevice();
  const updateDevice = useUpdateOltDevice();
  const deleteDevice = useDeleteOltDevice();

  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [editingDevice, setEditingDevice] = useState<OltDevice | null>(null);
  const [portsDevice, setPortsDevice] = useState<OltDevice | null>(null);

  const handleAdd = () => { setEditingDevice(null); setFormMode("add"); setFormOpen(true); };
  const handleEdit = (d: OltDevice) => { setEditingDevice(d); setFormMode("edit"); setFormOpen(true); };

  const handleSubmit = async (data: Partial<OltDevice>) => {
    if (formMode === "edit" && data.id) {
      await updateDevice.mutateAsync(data as any);
    } else {
      await createDevice.mutateAsync(data);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 p-4 md:p-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-40" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Server className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">OLT ডিভাইস ম্যানেজমেন্ট</h1>
            <p className="text-sm text-muted-foreground">GPON/EPON OLT ডিভাইস ও পোর্ট ম্যানেজমেন্ট</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => queryClient.invalidateQueries({ queryKey: ["olt-devices"] })}>
            <RefreshCw className="h-4 w-4 mr-2" />রিফ্রেশ
          </Button>
          <Button size="sm" onClick={handleAdd}>
            <Plus className="h-4 w-4 mr-2" />OLT যোগ করুন
          </Button>
        </div>
      </div>

      {/* Devices Grid */}
      {!devices?.length ? (
        <div className="rounded-xl border-2 border-dashed p-8 text-center">
          <Server className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
          <h3 className="font-semibold mb-1">কোনো OLT ডিভাইস নেই</h3>
          <p className="text-sm text-muted-foreground mb-4">প্রথমে একটি OLT ডিভাইস যোগ করুন</p>
          <Button onClick={handleAdd}><Plus className="h-4 w-4 mr-2" />OLT যোগ করুন</Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {devices.map(device => (
            <Card key={device.id} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {device.is_enabled ? (
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-muted-foreground" />
                    )}
                    <CardTitle className="text-base">{device.name}</CardTitle>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setPortsDevice(device)}>
                        <NetworkIcon className="h-4 w-4 mr-2" />পোর্ট দেখুন
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(device)}>
                        <Edit className="h-4 w-4 mr-2" />এডিট
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => deleteDevice.mutate(device.id)}>
                        <Trash2 className="h-4 w-4 mr-2" />মুছুন
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="outline" className="text-[10px] uppercase">{device.brand}</Badge>
                  {device.model && <Badge variant="secondary" className="text-[10px]">{device.model}</Badge>}
                  <Badge variant="outline" className="text-[10px]">{device.protocol}</Badge>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p className="font-mono text-xs">{device.host}:{device.port}</p>
                  <p>{device.total_pon_ports} PON পোর্ট</p>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => setPortsDevice(device)}>
                  <NetworkIcon className="h-4 w-4 mr-2" />পোর্ট ম্যানেজ করুন
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Dialogs */}
      <OltDeviceFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        device={editingDevice}
        onSubmit={handleSubmit}
        mode={formMode}
      />
      {portsDevice && (
        <OltPortsDialog
          open={!!portsDevice}
          onOpenChange={() => setPortsDevice(null)}
          device={portsDevice}
        />
      )}
    </div>
  );
}
