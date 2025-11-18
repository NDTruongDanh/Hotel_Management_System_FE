"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RoomStatusBadge } from "@/components/rooms/room-status-badge";
import { Room, RoomStatus } from "@/lib/types/room";
import { ICONS } from "@/src/constants/icons.enum";
import { cn } from "@/lib/utils";

interface RoomCardProps {
  room: Room;
  onEdit?: (room: Room) => void;
  onDelete?: (room: Room) => void;
  onStatusChange?: (room: Room, newStatus: RoomStatus) => void;
}

export function RoomCard({
  room,
  onEdit,
  onDelete,
  onStatusChange,
}: RoomCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  // Status border color mapping
  const statusBorderColor: Record<RoomStatus, string> = {
    Trống: "border-l-success-600",
    "Đang thuê": "border-l-info-600",
    "Đang dọn dẹp": "border-l-warning-600",
    "Bảo trì": "border-l-error-600",
  };

  return (
    <Card
      className={cn(
        "hover:shadow-md transition-shadow border-l-4",
        statusBorderColor[room.roomStatus]
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold text-gray-900">
              {room.roomName}
            </CardTitle>
            <p className="text-sm text-gray-500">
              {room.roomType.roomTypeName}
            </p>
          </div>
          <RoomStatusBadge status={room.roomStatus} />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Room Details */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-700">
            <span className="text-gray-500">{ICONS.BED_DOUBLE}</span>
            <span>Sức chứa: {room.roomType.capacity} người</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <span className="text-gray-500">{ICONS.HOME}</span>
            <span>Tầng {room.floor}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <span className="text-gray-500">{ICONS.DOLLAR_SIGN}</span>
            <span className="font-semibold text-primary-600">
              {formatCurrency(room.roomType.price)}
            </span>
          </div>
        </div>

        {/* Amenities */}
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-600">Tiện nghi:</p>
          <div className="flex flex-wrap gap-1">
            {room.roomType.amenities.slice(0, 3).map((amenity) => (
              <span
                key={amenity}
                className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded"
              >
                {amenity}
              </span>
            ))}
            {room.roomType.amenities.length > 3 && (
              <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded">
                +{room.roomType.amenities.length - 3} khác
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2 border-t border-gray-100">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onEdit?.(room)}
          >
            <span className="mr-1">{ICONS.EDIT}</span>
            Sửa
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={() => onDelete?.(room)}
          >
            <span className="mr-1">{ICONS.TRASH}</span>
            Xóa
          </Button>
        </div>

        {/* Quick Status Change */}
        {onStatusChange && (
          <div className="pt-2 border-t border-gray-100">
            <p className="text-xs font-medium text-gray-600 mb-2">
              Cập nhật nhanh:
            </p>
            <div className="grid grid-cols-2 gap-2">
              {(["Trống", "Đang dọn dẹp", "Bảo trì"] as RoomStatus[]).map(
                (status) =>
                  room.roomStatus !== status && (
                    <Button
                      key={status}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => onStatusChange(room, status)}
                    >
                      {status}
                    </Button>
                  )
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
