"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ICONS } from "@/src/constants/icons.enum";
import { RoomStatus, RoomFilterOptions, RoomType } from "@/lib/types/room";

interface RoomFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: RoomFilterOptions;
  onFiltersChange: (filters: RoomFilterOptions) => void;
  uniqueRoomTypes: RoomType[];
  uniqueFloors: number[];
  filteredCount: number;
  totalCount: number;
  onReset: () => void;
}

export function RoomFilters({
  searchQuery,
  onSearchChange,
  filters,
  onFiltersChange,
  uniqueRoomTypes,
  uniqueFloors,
  filteredCount,
  totalCount,
  onReset,
}: RoomFiltersProps) {
  const hasActiveFilters =
    searchQuery ||
    filters.status !== "Tất cả" ||
    filters.roomType !== "Tất cả" ||
    filters.floor !== "Tất cả";

  return (
    <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg">
              {ICONS.FILTER}
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Bộ lọc tìm kiếm
              </CardTitle>
              <p className="text-xs text-gray-500 mt-0.5">
                Lọc và tìm kiếm phòng theo tiêu chí
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="hover:bg-gray-50"
          >
            <span className="mr-1.5">{ICONS.CLOSE}</span>
            Đặt lại
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {/* Search - Full Width */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
              <span className="text-gray-400">{ICONS.SEARCH}</span>
              Tìm kiếm nhanh
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                {ICONS.SEARCH}
              </span>
              <Input
                placeholder="Nhập tên phòng, mã phòng để tìm kiếm..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 h-11 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-gray-500 font-medium">
                Lọc theo tiêu chí
              </span>
            </div>
          </div>

          {/* Filter Grid */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {/* Status Filter */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-info-600"></span>
                Trạng thái phòng
              </label>
              <Select
                value={filters.status}
                onValueChange={(value) =>
                  onFiltersChange({
                    ...filters,
                    status: value as RoomStatus | "Tất cả",
                  })
                }
              >
                <SelectTrigger className="h-11 bg-gray-50 border-gray-200 hover:bg-white transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tất cả">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                      Tất cả trạng thái
                    </div>
                  </SelectItem>
                  <SelectItem value="Trống">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-success-600"></span>
                      Trống
                    </div>
                  </SelectItem>
                  <SelectItem value="Đang thuê">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-info-600"></span>
                      Đang thuê
                    </div>
                  </SelectItem>
                  <SelectItem value="Đang dọn dẹp">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-warning-600"></span>
                      Đang dọn dẹp
                    </div>
                  </SelectItem>
                  <SelectItem value="Bảo trì">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-error-600"></span>
                      Bảo trì
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Room Type Filter */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                <span className="text-gray-400">{ICONS.BED_DOUBLE}</span>
                Loại phòng
              </label>
              <Select
                value={filters.roomType}
                onValueChange={(value) =>
                  onFiltersChange({ ...filters, roomType: value })
                }
              >
                <SelectTrigger className="h-11 bg-gray-50 border-gray-200 hover:bg-white transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tất cả">Tất cả loại phòng</SelectItem>
                  {uniqueRoomTypes.map((type) => (
                    <SelectItem key={type.roomTypeID} value={type.roomTypeID}>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">
                          {ICONS.BED_DOUBLE}
                        </span>
                        {type.roomTypeName}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Floor Filter */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                <span className="text-gray-400">{ICONS.HOME}</span>
                Tầng
              </label>
              <Select
                value={filters.floor.toString()}
                onValueChange={(value) =>
                  onFiltersChange({
                    ...filters,
                    floor: value === "Tất cả" ? "Tất cả" : parseInt(value),
                  })
                }
              >
                <SelectTrigger className="h-11 bg-gray-50 border-gray-200 hover:bg-white transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tất cả">Tất cả tầng</SelectItem>
                  {uniqueFloors.map((floor) => (
                    <SelectItem key={floor} value={floor.toString()}>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">{ICONS.HOME}</span>
                        Tầng {floor}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 rounded-lg">
                <span className="text-primary-600 font-semibold">
                  {filteredCount}
                </span>
                <span className="text-gray-600">phòng tìm thấy</span>
              </div>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">
                Tổng <span className="font-medium">{totalCount}</span> phòng
              </span>
            </div>

            {hasActiveFilters && (
              <div className="text-xs text-gray-500 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-primary-600 rounded-full animate-pulse"></span>
                Đang áp dụng bộ lọc
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
