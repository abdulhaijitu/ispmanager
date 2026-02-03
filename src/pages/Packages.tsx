import { Plus, Edit, Trash2, MoreHorizontal, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface Package {
  id: string;
  name: string;
  speedLabel: string;
  monthlyPrice: number;
  validity: number;
  customersCount: number;
  isPopular: boolean;
  isActive: boolean;
}

const packages: Package[] = [
  {
    id: "1",
    name: "Basic",
    speedLabel: "20 Mbps",
    monthlyPrice: 800,
    validity: 30,
    customersCount: 856,
    isPopular: false,
    isActive: true,
  },
  {
    id: "2",
    name: "Pro",
    speedLabel: "30 Mbps",
    monthlyPrice: 1200,
    validity: 30,
    customersCount: 1245,
    isPopular: true,
    isActive: true,
  },
  {
    id: "3",
    name: "Premium",
    speedLabel: "50 Mbps",
    monthlyPrice: 1800,
    validity: 30,
    customersCount: 523,
    isPopular: false,
    isActive: true,
  },
  {
    id: "4",
    name: "Ultra",
    speedLabel: "100 Mbps",
    monthlyPrice: 2500,
    validity: 30,
    customersCount: 198,
    isPopular: false,
    isActive: true,
  },
  {
    id: "5",
    name: "Enterprise",
    speedLabel: "200 Mbps",
    monthlyPrice: 5000,
    validity: 30,
    customersCount: 25,
    isPopular: false,
    isActive: true,
  },
  {
    id: "6",
    name: "Budget",
    speedLabel: "10 Mbps",
    monthlyPrice: 500,
    validity: 30,
    customersCount: 0,
    isPopular: false,
    isActive: false,
  },
];

export default function Packages() {
  const activePackages = packages.filter((p) => p.isActive);
  const inactivePackages = packages.filter((p) => !p.isActive);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Packages</h1>
          <p className="text-muted-foreground">
            Manage your internet service packages
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Package
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Packages</CardDescription>
            <CardTitle className="text-3xl">{activePackages.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Subscriptions</CardDescription>
            <CardTitle className="text-3xl">
              {packages.reduce((sum, p) => sum + p.customersCount, 0).toLocaleString()}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Avg. Revenue/Package</CardDescription>
            <CardTitle className="text-3xl">
              ৳{Math.round(
                packages
                  .filter((p) => p.isActive)
                  .reduce((sum, p) => sum + p.monthlyPrice * p.customersCount, 0) /
                  packages.filter((p) => p.isActive).reduce((sum, p) => sum + p.customersCount, 0)
              ).toLocaleString()}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Active Packages */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Active Packages</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {activePackages.map((pkg, index) => (
            <Card
              key={pkg.id}
              className={cn(
                "relative animate-fade-in transition-micro hover:shadow-md",
                pkg.isPopular && "ring-2 ring-primary"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {pkg.isPopular && (
                <div className="absolute -top-3 left-4">
                  <Badge className="bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl">{pkg.name}</CardTitle>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Zap className="h-4 w-4" />
                      <span className="font-medium">{pkg.speedLabel}</span>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Package
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Deactivate
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">৳{pkg.monthlyPrice.toLocaleString()}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Active Subscribers</span>
                  <span className="font-medium">{pkg.customersCount.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Monthly Revenue</span>
                  <span className="font-medium text-success">
                    ৳{(pkg.monthlyPrice * pkg.customersCount).toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Inactive Packages */}
      {inactivePackages.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-4 text-muted-foreground">
            Inactive Packages
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {inactivePackages.map((pkg) => (
              <Card key={pkg.id} className="opacity-60">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-xl">{pkg.name}</CardTitle>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Zap className="h-4 w-4" />
                        <span className="font-medium">{pkg.speedLabel}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-muted-foreground">
                      Inactive
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-muted-foreground">
                      ৳{pkg.monthlyPrice.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <Button variant="outline" className="w-full mt-4" size="sm">
                    Reactivate
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
