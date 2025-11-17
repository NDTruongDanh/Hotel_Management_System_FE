import { Badge } from "@/components/ui/badge";
import { RoomStatus } from "@/lib/types/room";
import { cn } from "@/lib/utils";

interface RoomStatusBadgeProps {
  status: RoomStatus;
  className?: string;
}

export function RoomStatusBadge({ status, className }: RoomStatusBadgeProps) {
  const statusConfig: Record<
    RoomStatus,
    { color: string; bgColor: string; label: string }
  > = {
    Trống: {
      color: "text-success-600",
      bgColor: "bg-success-100",
      label: "Trống",
    },
    "Đang thuê": {
      color: "text-info-600",
      bgColor: "bg-info-100",
      label: "Đang thuê",
    },
    "Đang dọn dẹp": {
      color: "text-warning-600",
      bgColor: "bg-warning-100",
      label: "Đang dọn dẹp",
    },
    "Bảo trì": {
      color: "text-error-600",
      bgColor: "bg-error-100",
      label: "Bảo trì",
    },
  };

  const config = statusConfig[status];

  return (
    <Badge
      className={cn(
        "rounded-full px-3 py-1 text-xs font-medium border-0",
        config.bgColor,
        config.color,
        className
      )}
    >
      {config.label}
    </Badge>
  );
}
