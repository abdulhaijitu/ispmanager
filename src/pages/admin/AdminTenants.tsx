import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { 
  Building2, 
  Search, 
  MoreHorizontal,
  Eye,
  Edit,
  Pause,
  Play,
  Trash2,
  CheckCircle,
  Clock,
  AlertTriangle,
  Filter,
  Loader2,
  LogIn
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAllTenants, useUpdateTenant, useDeleteTenant, type TenantWithStats } from "@/hooks/useTenants";
import { useTenantContext } from "@/contexts/TenantContext";

const statusConfig = {
  active: { label: "সক্রিয়", variant: "default" as const, icon: CheckCircle },
  trial: { label: "ট্রায়াল", variant: "secondary" as const, icon: Clock },
  suspended: { label: "স্থগিত", variant: "destructive" as const, icon: AlertTriangle },
};

export default function AdminTenants() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { startImpersonation } = useTenantContext();
  const { data: tenants, isLoading, error } = useAllTenants();
  const updateTenant = useUpdateTenant();
  const deleteTenant = useDeleteTenant();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [tenantToDelete, setTenantToDelete] = useState<TenantWithStats | null>(null);

  const handleLoginAsTenant = (tenant: TenantWithStats) => {
    startImpersonation(tenant.id);
    toast({
      title: "টেন্যান্ট হিসেবে লগইন",
      description: `আপনি "${tenant.name}" এর অ্যাডমিন হিসেবে লগইন করেছেন।`,
    });
    navigate("/dashboard");
  };

  const filteredTenants = (tenants ?? []).filter((tenant) => {
    const matchesSearch =
      tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.subdomain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tenant.owner_name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    const matchesStatus = statusFilter === "all" || tenant.subscription_status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('bn-BD', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleSuspend = async (tenant: TenantWithStats) => {
    try {
      await updateTenant.mutateAsync({
        id: tenant.id,
        updates: { subscription_status: "suspended" },
      });
      toast({
        title: "টেন্যান্ট স্থগিত",
        description: `${tenant.name} স্থগিত করা হয়েছে।`,
      });
    } catch (err) {
      toast({
        title: "ত্রুটি",
        description: "টেন্যান্ট স্থগিত করতে সমস্যা হয়েছে।",
        variant: "destructive",
      });
    }
  };

  const handleActivate = async (tenant: TenantWithStats) => {
    try {
      await updateTenant.mutateAsync({
        id: tenant.id,
        updates: { subscription_status: "active" },
      });
      toast({
        title: "টেন্যান্ট সক্রিয়",
        description: `${tenant.name} সক্রিয় করা হয়েছে।`,
      });
    } catch (err) {
      toast({
        title: "ত্রুটি",
        description: "টেন্যান্ট সক্রিয় করতে সমস্যা হয়েছে।",
        variant: "destructive",
      });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!tenantToDelete) return;
    
    try {
      await deleteTenant.mutateAsync(tenantToDelete.id);
      toast({
        title: "টেন্যান্ট মুছে ফেলা হয়েছে",
        description: `${tenantToDelete.name} সফলভাবে মুছে ফেলা হয়েছে।`,
      });
    } catch (err) {
      toast({
        title: "ত্রুটি",
        description: "টেন্যান্ট মুছে ফেলতে সমস্যা হয়েছে।",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setTenantToDelete(null);
    }
  };

  const activeCount = tenants?.filter(t => t.subscription_status === 'active').length ?? 0;
  const trialCount = tenants?.filter(t => t.subscription_status === 'trial').length ?? 0;
  const suspendedCount = tenants?.filter(t => t.subscription_status === 'suspended').length ?? 0;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-destructive">টেন্যান্ট তথ্য লোড করতে সমস্যা হয়েছে।</p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          পুনরায় চেষ্টা করুন
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">টেন্যান্ট ম্যানেজমেন্ট</h1>
          <p className="text-muted-foreground">
            প্ল্যাটফর্মের সকল ISP প্রতিষ্ঠান পরিচালনা করুন
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                {isLoading ? (
                  <Skeleton className="h-8 w-12" />
                ) : (
                  <p className="text-2xl font-bold">{activeCount}</p>
                )}
                <p className="text-sm text-muted-foreground">সক্রিয় টেন্যান্ট</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                <Clock className="h-6 w-6 text-secondary-foreground" />
              </div>
              <div>
                {isLoading ? (
                  <Skeleton className="h-8 w-12" />
                ) : (
                  <p className="text-2xl font-bold">{trialCount}</p>
                )}
                <p className="text-sm text-muted-foreground">ট্রায়াল টেন্যান্ট</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                {isLoading ? (
                  <Skeleton className="h-8 w-12" />
                ) : (
                  <p className="text-2xl font-bold">{suspendedCount}</p>
                )}
                <p className="text-sm text-muted-foreground">স্থগিত</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tenants Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            সকল টেন্যান্ট
          </CardTitle>
          <CardDescription>
            সকল ISP প্রতিষ্ঠান দেখুন ও পরিচালনা করুন
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="টেন্যান্ট খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="স্ট্যাটাস" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সব স্ট্যাটাস</SelectItem>
                <SelectItem value="active">সক্রিয়</SelectItem>
                <SelectItem value="trial">ট্রায়াল</SelectItem>
                <SelectItem value="suspended">স্থগিত</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>টেন্যান্ট</TableHead>
                  <TableHead>মালিক</TableHead>
                  <TableHead>গ্রাহক</TableHead>
                  <TableHead>তৈরি</TableHead>
                  <TableHead>স্ট্যাটাস</TableHead>
                  <TableHead className="text-right">অ্যাকশন</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  [...Array(3)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-12 w-full" /></TableCell>
                      <TableCell><Skeleton className="h-8 w-32" /></TableCell>
                      <TableCell><Skeleton className="h-8 w-16" /></TableCell>
                      <TableCell><Skeleton className="h-8 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-8 w-20" /></TableCell>
                      <TableCell><Skeleton className="h-8 w-8" /></TableCell>
                    </TableRow>
                  ))
                ) : filteredTenants.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                      কোন টেন্যান্ট পাওয়া যায়নি
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTenants.map((tenant) => {
                    const status = tenant.subscription_status ?? "trial";
                    const StatusIcon = statusConfig[status]?.icon ?? Clock;
                    return (
                      <TableRow key={tenant.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                              <Building2 className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{tenant.name}</p>
                              <p className="text-sm text-muted-foreground">{tenant.subdomain}.ispmanager.com</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{tenant.owner_name || "-"}</p>
                            <p className="text-sm text-muted-foreground">{tenant.owner_email || "-"}</p>
                          </div>
                        </TableCell>
                        <TableCell>{(tenant.customer_count ?? 0).toLocaleString()}</TableCell>
                        <TableCell>{formatDate(tenant.created_at)}</TableCell>
                        <TableCell>
                          <Badge variant={statusConfig[status]?.variant ?? "secondary"} className="gap-1">
                            <StatusIcon className="h-3 w-3" />
                            {statusConfig[status]?.label ?? status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" disabled={updateTenant.isPending}>
                                {updateTenant.isPending ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <MoreHorizontal className="h-4 w-4" />
                                )}
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                বিস্তারিত দেখুন
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                সম্পাদনা
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleLoginAsTenant(tenant)}>
                                <LogIn className="mr-2 h-4 w-4" />
                                অ্যাডমিন হিসেবে লগইন
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {status === "active" || status === "trial" ? (
                                <DropdownMenuItem 
                                  onClick={() => handleSuspend(tenant)}
                                  className="text-destructive"
                                >
                                  <Pause className="mr-2 h-4 w-4" />
                                  স্থগিত করুন
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem onClick={() => handleActivate(tenant)}>
                                  <Play className="mr-2 h-4 w-4" />
                                  সক্রিয় করুন
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem 
                                className="text-destructive"
                                onClick={() => {
                                  setTenantToDelete(tenant);
                                  setDeleteDialogOpen(true);
                                }}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                মুছে ফেলুন
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>আপনি কি নিশ্চিত?</AlertDialogTitle>
            <AlertDialogDescription>
              "{tenantToDelete?.name}" টেন্যান্ট এবং এর সাথে সম্পর্কিত সকল ডেটা স্থায়ীভাবে মুছে ফেলা হবে। 
              এই কাজ পূর্বাবস্থায় ফেরানো যাবে না।
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>বাতিল</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteTenant.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              মুছে ফেলুন
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
