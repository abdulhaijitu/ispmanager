import { CreditCard, UserPlus, AlertTriangle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityItem {
  id: string;
  type: "payment" | "new_customer" | "suspension" | "reactivation";
  title: string;
  description: string;
  time: string;
}

const activities: ActivityItem[] = [
  {
    id: "1",
    type: "payment",
    title: "Payment Received",
    description: "Rahim Ahmed paid ৳1,500",
    time: "5 mins ago",
  },
  {
    id: "2",
    type: "new_customer",
    title: "New Customer",
    description: "Karim Hossain joined with 30 Mbps plan",
    time: "1 hour ago",
  },
  {
    id: "3",
    type: "suspension",
    title: "Auto-Suspended",
    description: "Customer #4521 suspended (15 days overdue)",
    time: "2 hours ago",
  },
  {
    id: "4",
    type: "reactivation",
    title: "Connection Reactivated",
    description: "Customer #3892 connection restored",
    time: "3 hours ago",
  },
  {
    id: "5",
    type: "payment",
    title: "Payment Received",
    description: "Nasir Khan paid ৳2,000",
    time: "5 hours ago",
  },
];

const iconMap = {
  payment: CreditCard,
  new_customer: UserPlus,
  suspension: AlertTriangle,
  reactivation: CheckCircle,
};

const colorMap = {
  payment: "text-success bg-success/10",
  new_customer: "text-primary bg-primary/10",
  suspension: "text-destructive bg-destructive/10",
  reactivation: "text-success bg-success/10",
};

export function RecentActivity() {
  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="border-b border-border p-4">
        <h3 className="font-semibold">Recent Activity</h3>
        <p className="text-sm text-muted-foreground">Latest updates from your ISP</p>
      </div>
      <div className="divide-y divide-border">
        {activities.map((activity, index) => {
          const Icon = iconMap[activity.type];
          return (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-4 transition-micro hover:bg-muted/50"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={cn("rounded-full p-2", colorMap[activity.type])}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{activity.title}</p>
                <p className="text-xs text-muted-foreground">
                  {activity.description}
                </p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {activity.time}
              </span>
            </div>
          );
        })}
      </div>
      <div className="border-t border-border p-4">
        <button className="text-sm font-medium text-primary hover:underline">
          View all activity →
        </button>
      </div>
    </div>
  );
}
