"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ICONS } from "@/src/constants/icons.enum";
import type { CheckoutSummary } from "@/lib/types/checkin-checkout";

interface CheckOutDetailsProps {
  summary: CheckoutSummary;
  onAddService: () => void;
  onAddPenalty: () => void;
  onCompleteCheckout: () => void;
  onBack: () => void;
}

export function CheckOutDetails({
  summary,
  onAddService,
  onAddPenalty,
  onCompleteCheckout,
  onBack,
}: CheckOutDetailsProps) {
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
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center gap-4">
        <Button onClick={onBack} variant="outline" size="sm" className="h-8">
          {ICONS.CHEVRON_LEFT}
          <span className="ml-1">Quay lại</span>
        </Button>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Chi tiết trả phòng
          </h2>
          <p className="text-sm text-gray-500">
            Mã phiếu thuê: {summary.receiptID}
          </p>
        </div>
      </div>

      {/* Customer & Room Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Thông tin khách hàng & phòng
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Khách hàng:</span>
              <p className="font-medium text-gray-900">
                {summary.receipt.customerName}
              </p>
            </div>
            <div>
              <span className="text-gray-500">Số điện thoại:</span>
              <p className="font-medium text-gray-900">
                {summary.receipt.phoneNumber}
              </p>
            </div>
            <div>
              <span className="text-gray-500">CMND:</span>
              <p className="font-medium text-gray-900">
                {summary.receipt.identityCard}
              </p>
            </div>
            <div>
              <span className="text-gray-500">Phòng:</span>
              <p className="font-medium text-gray-900">
                {summary.receipt.roomName} ({summary.receipt.roomTypeName})
              </p>
            </div>
            <div>
              <span className="text-gray-500">Ngày nhận:</span>
              <p className="font-medium text-gray-900">
                {formatDate(summary.receipt.checkInDate)}
              </p>
            </div>
            <div>
              <span className="text-gray-500">Ngày trả:</span>
              <p className="font-medium text-gray-900">
                {formatDate(summary.receipt.checkOutDate)}
              </p>
            </div>
            <div>
              <span className="text-gray-500">Số đêm:</span>
              <p className="font-medium text-gray-900">
                {summary.receipt.totalNights} đêm
              </p>
            </div>
            <div>
              <span className="text-gray-500">Số khách:</span>
              <p className="font-medium text-gray-900">
                {summary.receipt.numberOfGuests} người
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Room Charges */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tiền phòng</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-700">
              {summary.receipt.totalNights} đêm ×{" "}
              {formatCurrency(summary.receipt.pricePerNight)}
            </span>
            <span className="font-semibold text-gray-900">
              {formatCurrency(summary.roomTotal)}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Services */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Dịch vụ sử dụng</CardTitle>
          <Button
            onClick={onAddService}
            size="sm"
            variant="outline"
            className="h-8 border-primary-600 text-primary-600 hover:bg-primary-50"
          >
            {ICONS.PLUS}
            <span className="ml-1">Thêm dịch vụ</span>
          </Button>
        </CardHeader>
        <CardContent>
          {summary.services.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">
              Chưa có dịch vụ nào được sử dụng
            </p>
          ) : (
            <div className="space-y-3">
              {summary.services.map((service) => (
                <div
                  key={service.detailID}
                  className="flex justify-between items-start text-sm"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {service.serviceName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {service.quantity} × {formatCurrency(service.price)} •{" "}
                      {formatDate(service.dateUsed)}
                    </p>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(service.total)}
                  </span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-gray-700">Tổng dịch vụ:</span>
                <span className="text-gray-900">
                  {formatCurrency(summary.servicesTotal)}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Penalties */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Phí phạt & bồi thường</CardTitle>
          <Button
            onClick={onAddPenalty}
            size="sm"
            variant="outline"
            className="h-8 border-error-600 text-error-600 hover:bg-error-100"
          >
            {ICONS.ALERT}
            <span className="ml-1">Thêm phạt</span>
          </Button>
        </CardHeader>
        <CardContent>
          {summary.penalties.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">
              Không có phí phạt nào
            </p>
          ) : (
            <div className="space-y-3">
              {summary.penalties.map((penalty) => (
                <div
                  key={penalty.penaltyID}
                  className="flex justify-between items-start text-sm"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {penalty.description}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(penalty.dateIssued)}
                    </p>
                  </div>
                  <span className="font-semibold text-error-600">
                    {formatCurrency(penalty.amount)}
                  </span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-gray-700">Tổng phạt:</span>
                <span className="text-error-600">
                  {formatCurrency(summary.penaltiesTotal)}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Grand Total */}
      <Card className="bg-primary-50 border-primary-600">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">
              Tổng thanh toán:
            </span>
            <span className="text-2xl font-bold text-primary-600">
              {formatCurrency(summary.grandTotal)}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Action Button */}
      <div className="flex justify-end">
        <Button
          onClick={onCompleteCheckout}
          className="h-10 bg-primary-600 hover:bg-primary-500 text-white px-8"
        >
          {ICONS.CREDIT_CARD}
          <span className="ml-2">Hoàn tất Check-out và Thanh toán</span>
        </Button>
      </div>
    </div>
  );
}
