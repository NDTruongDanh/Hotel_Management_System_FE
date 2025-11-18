"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ICONS } from "@/src/constants/icons.enum";
import type { Reservation } from "@/lib/types/reservation";
import type { CheckInFormData } from "@/lib/types/checkin-checkout";

interface CheckInModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reservation: Reservation | null;
  onConfirm: (data: CheckInFormData) => void;
}

export function CheckInModal({
  open,
  onOpenChange,
  reservation,
  onConfirm,
}: CheckInModalProps) {
  const [numberOfGuests, setNumberOfGuests] = useState(
    reservation?.details[0]?.numberOfGuests || 1
  );
  const [notes, setNotes] = useState("");

  const handleConfirm = () => {
    if (!reservation) return;

    const formData: CheckInFormData = {
      reservationID: reservation.reservationID,
      roomID: reservation.details[0].roomID,
      numberOfGuests,
      notes: notes.trim() || undefined,
    };

    onConfirm(formData);
    onOpenChange(false);
    // Reset form
    setNotes("");
  };

  if (!reservation) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Xác nhận Check-in
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Vui lòng xác nhận thông tin trước khi check-in cho khách
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Customer Info */}
          <div className="rounded-lg bg-gray-50 p-4 space-y-3">
            <h3 className="font-semibold text-gray-900 text-sm">
              Thông tin khách hàng
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Họ tên:</span>
                <p className="font-medium text-gray-900">
                  {reservation.customer.customerName}
                </p>
              </div>
              <div>
                <span className="text-gray-500">Số điện thoại:</span>
                <p className="font-medium text-gray-900">
                  {reservation.customer.phoneNumber}
                </p>
              </div>
              <div>
                <span className="text-gray-500">CMND:</span>
                <p className="font-medium text-gray-900">
                  {reservation.customer.identityCard}
                </p>
              </div>
              <div>
                <span className="text-gray-500">Email:</span>
                <p className="font-medium text-gray-900">
                  {reservation.customer.email || "Không có"}
                </p>
              </div>
            </div>
          </div>

          {/* Reservation Info */}
          <div className="rounded-lg border border-gray-300 p-4 space-y-3">
            <h3 className="font-semibold text-gray-900 text-sm">
              Thông tin đặt phòng
            </h3>
            <div className="space-y-2 text-sm">
              {reservation.details.map((detail) => (
                <div
                  key={detail.detailID}
                  className="flex justify-between items-start py-2 border-b border-gray-200 last:border-0"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {detail.roomName} - {detail.roomTypeName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(detail.checkInDate)} -{" "}
                      {formatDate(detail.checkOutDate)}
                    </p>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(detail.pricePerNight)}/đêm
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Number of Guests */}
          <div className="space-y-2">
            <Label htmlFor="numberOfGuests" className="text-sm font-medium">
              Số người ở thực tế <span className="text-error-600">*</span>
            </Label>
            <Input
              id="numberOfGuests"
              type="number"
              min="1"
              value={numberOfGuests}
              onChange={(e) => setNumberOfGuests(parseInt(e.target.value) || 1)}
              className="h-10 border-gray-300 focus:ring-primary-500"
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-medium">
              Ghi chú
            </Label>
            <Textarea
              id="notes"
              placeholder="Nhập ghi chú (nếu có)..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="border-gray-300 focus:ring-primary-500 resize-none"
            />
          </div>

          {/* Summary */}
          <div className="rounded-lg bg-primary-50 p-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-900">
                Tổng tiền đặt cọc:
              </span>
              <span className="text-lg font-bold text-primary-600">
                {formatCurrency(reservation.depositAmount)}
              </span>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            onClick={() => onOpenChange(false)}
            variant="outline"
            className="h-10"
          >
            {ICONS.CLOSE}
            <span className="ml-2">Hủy</span>
          </Button>
          <Button
            onClick={handleConfirm}
            className="h-10 bg-primary-600 hover:bg-primary-500 text-white"
          >
            {ICONS.CHECK}
            <span className="ml-2">Xác nhận Check-in</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
