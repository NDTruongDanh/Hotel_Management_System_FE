"use client";

import { Customer } from "@/lib/types/customer";
import { ICONS } from "@/src/constants/icons.enum";
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

interface CustomerDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  customer: Customer | null;
}

export function CustomerDeleteDialog({
  isOpen,
  onClose,
  onConfirm,
  customer,
}: CustomerDeleteDialogProps) {
  if (!customer) return null;

  const hasBookingHistory = customer.totalBookings > 0;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <span className="w-6 h-6 text-red-600">{ICONS.ALERT}</span>
            {hasBookingHistory ? "Vô hiệu hóa khách hàng" : "Xóa khách hàng"}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            {hasBookingHistory ? (
              <>
                Khách hàng <strong>{customer.customerName}</strong> có lịch sử
                giao dịch ({customer.totalBookings} lần đặt phòng).
                <br />
                <br />
                Hệ thống sẽ chuyển khách hàng sang trạng thái{" "}
                <strong>Vô hiệu hóa</strong> thay vì xóa để đảm bảo tính toàn
                vẹn dữ liệu.
                <br />
                <br />
                Bạn có chắc chắn muốn tiếp tục?
              </>
            ) : (
              <>
                Bạn có chắc chắn muốn xóa khách hàng{" "}
                <strong>{customer.customerName}</strong>?
                <br />
                <br />
                Hành động này không thể hoàn tác.
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700"
          >
            {hasBookingHistory ? "Vô hiệu hóa" : "Xóa"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
