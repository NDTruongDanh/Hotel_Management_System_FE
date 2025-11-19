"use client";

import { CustomerFilterOptions } from "@/lib/types/customer";
import { ICONS } from "@/src/constants/icons.enum";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CustomerFiltersProps {
  filters: CustomerFilterOptions;
  onFiltersChange: (filters: CustomerFilterOptions) => void;
  onAddCustomer: () => void;
}

export function CustomerFilters({
  filters,
  onFiltersChange,
  onAddCustomer,
}: CustomerFiltersProps) {
  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, searchQuery: value });
  };

  const handleCustomerTypeChange = (value: string) => {
    onFiltersChange({
      ...filters,
      customerType: value as "all" | "Cá nhân" | "Doanh nghiệp",
    });
  };

  const handleVIPChange = (checked: boolean) => {
    onFiltersChange({ ...filters, vipOnly: checked });
  };

  const handleStatusChange = (value: string) => {
    onFiltersChange({
      ...filters,
      status: value as "all" | "Hoạt động" | "Vô hiệu hóa",
    });
  };

  const handleReset = () => {
    onFiltersChange({
      searchQuery: "",
      customerType: "all",
      vipOnly: false,
      status: "all",
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-300 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Tìm kiếm & Lọc khách hàng
        </h3>
        <Button
          onClick={onAddCustomer}
          className="h-10 bg-primary-blue-600 hover:bg-primary-blue-500"
        >
          <span className="w-4 h-4 mr-2">{ICONS.PLUS}</span>
          Thêm khách hàng
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Tìm kiếm</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400">
              {ICONS.SEARCH}
            </span>
            <Input
              type="text"
              placeholder="Tên, SĐT, Email, CCCD..."
              value={filters.searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 h-10"
            />
          </div>
        </div>

        {/* Customer Type Filter */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Loại khách hàng
          </Label>
          <Select
            value={filters.customerType}
            onValueChange={handleCustomerTypeChange}
          >
            <SelectTrigger className="h-10">
              <SelectValue placeholder="Tất cả" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="Cá nhân">Cá nhân</SelectItem>
              <SelectItem value="Doanh nghiệp">Doanh nghiệp</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Status Filter */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Trạng thái
          </Label>
          <Select value={filters.status} onValueChange={handleStatusChange}>
            <SelectTrigger className="h-10">
              <SelectValue placeholder="Tất cả" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="Hoạt động">Hoạt động</SelectItem>
              <SelectItem value="Vô hiệu hóa">Vô hiệu hóa</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* VIP Checkbox */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Lọc VIP</Label>
          <div className="flex items-center h-10">
            <Checkbox
              id="vipFilter"
              checked={filters.vipOnly}
              onCheckedChange={handleVIPChange}
            />
            <Label htmlFor="vipFilter" className="ml-2 text-sm cursor-pointer">
              Chỉ hiển thị khách VIP
            </Label>
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <div className="flex justify-end">
        <Button variant="outline" onClick={handleReset} className="h-10">
          <span className="w-4 h-4 mr-2">{ICONS.X_CIRCLE}</span>
          Đặt lại bộ lọc
        </Button>
      </div>
    </div>
  );
}
