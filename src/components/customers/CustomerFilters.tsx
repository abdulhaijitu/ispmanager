import { useState } from "react";
import { Search, Filter, X, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { Tables } from "@/integrations/supabase/types";

export interface CustomerFilters {
  search: string;
  status: string;
  packageId: string;
  balanceType: string;
}

interface CustomerFiltersProps {
  filters: CustomerFilters;
  onFiltersChange: (filters: CustomerFilters) => void;
  packages: Tables<"packages">[];
  totalCount: number;
  filteredCount: number;
}

export function CustomerFiltersBar({
  filters,
  onFiltersChange,
  packages,
  totalCount,
  filteredCount,
}: CustomerFiltersProps) {
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const updateFilter = <K extends keyof CustomerFilters>(
    key: K,
    value: CustomerFilters[K]
  ) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: "",
      status: "all",
      packageId: "all",
      balanceType: "all",
    });
  };

  const activeFiltersCount = [
    filters.status !== "all",
    filters.packageId !== "all",
    filters.balanceType !== "all",
  ].filter(Boolean).length;

  const hasActiveFilters = activeFiltersCount > 0 || filters.search.length > 0;

  return (
    <div className="space-y-4">
      {/* Main Filter Row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="নাম, ফোন, ইমেইল বা ID দিয়ে খুঁজুন..."
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="pl-9 pr-9"
          />
          {filters.search && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
              onClick={() => updateFilter("search", "")}
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>

        {/* Quick Status Filter */}
        <Select
          value={filters.status}
          onValueChange={(value) => updateFilter("status", value)}
        >
          <SelectTrigger className="w-full sm:w-[160px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="স্ট্যাটাস" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">সব স্ট্যাটাস</SelectItem>
            <SelectItem value="active">সক্রিয়</SelectItem>
            <SelectItem value="suspended">স্থগিত</SelectItem>
            <SelectItem value="pending">অপেক্ষমান</SelectItem>
          </SelectContent>
        </Select>

        {/* Advanced Filters Popover */}
        <Popover open={advancedOpen} onOpenChange={setAdvancedOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              ফিল্টার
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">অ্যাডভান্সড ফিল্টার</h4>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                  >
                    সব ক্লিয়ার করুন
                  </Button>
                )}
              </div>
              <Separator />

              {/* Package Filter */}
              <div className="space-y-2">
                <Label>প্যাকেজ</Label>
                <Select
                  value={filters.packageId}
                  onValueChange={(value) => updateFilter("packageId", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="প্যাকেজ নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">সব প্যাকেজ</SelectItem>
                    <SelectItem value="none">প্যাকেজ নেই</SelectItem>
                    {packages.map((pkg) => (
                      <SelectItem key={pkg.id} value={pkg.id}>
                        {pkg.name} - {pkg.speed_label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Balance Type Filter */}
              <div className="space-y-2">
                <Label>ব্যালেন্স টাইপ</Label>
                <Select
                  value={filters.balanceType}
                  onValueChange={(value) => updateFilter("balanceType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="ব্যালেন্স টাইপ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">সব</SelectItem>
                    <SelectItem value="due">বাকি আছে</SelectItem>
                    <SelectItem value="advance">অগ্রিম আছে</SelectItem>
                    <SelectItem value="clear">কোন বাকি নেই</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <Button
                className="w-full"
                onClick={() => setAdvancedOpen(false)}
              >
                ফিল্টার প্রয়োগ করুন
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">ফিল্টার:</span>
          
          {filters.search && (
            <Badge variant="secondary" className="gap-1">
              খোঁজা: "{filters.search}"
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => updateFilter("search", "")}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          
          {filters.status !== "all" && (
            <Badge variant="secondary" className="gap-1">
              স্ট্যাটাস: {filters.status === "active" ? "সক্রিয়" : filters.status === "suspended" ? "স্থগিত" : "অপেক্ষমান"}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => updateFilter("status", "all")}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          
          {filters.packageId !== "all" && (
            <Badge variant="secondary" className="gap-1">
              প্যাকেজ: {filters.packageId === "none" ? "নেই" : packages.find(p => p.id === filters.packageId)?.name}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => updateFilter("packageId", "all")}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          
          {filters.balanceType !== "all" && (
            <Badge variant="secondary" className="gap-1">
              ব্যালেন্স: {filters.balanceType === "due" ? "বাকি" : filters.balanceType === "advance" ? "অগ্রিম" : "ক্লিয়ার"}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => updateFilter("balanceType", "all")}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-6 text-xs"
          >
            সব ক্লিয়ার
          </Button>
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm">
        <p className="text-muted-foreground">
          মোট <span className="font-medium text-foreground">{totalCount}</span> কাস্টমারের মধ্যে{" "}
          <span className="font-medium text-foreground">{filteredCount}</span> জন দেখানো হচ্ছে
        </p>
      </div>
    </div>
  );
}
