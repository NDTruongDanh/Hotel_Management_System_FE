"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { CustomerRecord } from "@/lib/types/customer";

interface CustomerDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: CustomerRecord | null;
}

export function CustomerDetailsModal({
  open,
  onOpenChange,
  customer,
}: CustomerDetailsModalProps) {
  if (!customer) return null;

  const infoItems = [
    { label: "Mã khách", value: customer.customerId },
    { label: "Trạng thái", value: customer.status },
    { label: "Số điện thoại", value: customer.phoneNumber },
    { label: "Email", value: customer.email },
    { label: "CCCD / MST", value: customer.identityCard },
    { label: "Quốc tịch", value: customer.nationality },
    { label: "Địa chỉ", value: customer.address },
    { label: "Tổng số lần đặt", value: `${customer.totalBookings} lần` },
    {
      label: "Tổng chi tiêu",
      value: formatCurrency(customer.totalSpent),
    },
    {
      label: "Lần ghé gần nhất",
      value: customer.lastVisit || "Chưa có",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span>{customer.customerName}</span>
            <Badge className="bg-primary-100 text-primary-700 border-0">
              {customer.customerType}
            </Badge>
            {customer.isVip && (
              <Badge className="bg-warning-100 text-warning-700 border-0">
                VIP
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            Hồ sơ khách hàng và lịch sử đặt phòng gần nhất
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {infoItems.map((item) => (
              <InfoItem key={item.label} label={item.label}>
                {item.value}
              </InfoItem>
            ))}
          </div>

          {customer.notes && (
            <div className="rounded-lg border border-primary-100 bg-primary-50 p-4">
              <h4 className="text-sm font-semibold text-primary-700">
                Ghi chú
              </h4>
              <p className="text-sm text-primary-900 mt-1">{customer.notes}</p>
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Lịch sử đặt phòng
            </h3>
            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead>Mã đặt phòng</TableHead>
                      <TableHead>Phòng</TableHead>
                      <TableHead>Khoảng thời gian</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="text-right">Tổng tiền</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customer.history.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          className="py-6 text-center text-gray-500"
                        >
                          Chưa có dữ liệu lịch sử
                        </TableCell>
                      </TableRow>
                    ) : (
                      customer.history.map((item) => (
                        <TableRow key={item.reservationId}>
                          <TableCell className="font-medium">
                            {item.reservationId}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="text-gray-900">
                                {item.roomName}
                              </span>
                              <span className="text-xs text-gray-500">
                                {item.roomTypeName}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {item.checkInDate} - {item.checkOutDate}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`${statusBadge(item.status)} border-0`}
                            >
                              {item.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {formatCurrency(item.totalAmount)}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface InfoItemProps {
  label: string;
  children: React.ReactNode;
}

function InfoItem({ label, children }: InfoItemProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
        {label}
      </p>
      <p className="text-sm text-gray-900 mt-1 wrap-break-word">{children}</p>
    </div>
  );
}

const statusStyles: Record<string, string> = {
  "Đã đặt": "bg-info-100 text-info-700",
  "Đã nhận": "bg-success-100 text-success-700",
  "Đã hủy": "bg-error-100 text-error-700",
  "Không đến": "bg-warning-100 text-warning-700",
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);

const statusBadge = (status: string) =>
  statusStyles[status] ?? "bg-gray-100 text-gray-700";
