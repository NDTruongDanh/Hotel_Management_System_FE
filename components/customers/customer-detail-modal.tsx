"use client";

import { Customer, CustomerBookingHistory } from "@/lib/types/customer";
import { ICONS } from "@/src/constants/icons.enum";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface CustomerDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer | null;
  bookingHistory: CustomerBookingHistory[];
}

export function CustomerDetailModal({
  isOpen,
  onClose,
  customer,
  bookingHistory,
}: CustomerDetailModalProps) {
  if (!customer) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-32 max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-200 bg-linear-to-r from-primary-50 to-blue-50">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                {customer.customerName}
                {customer.isVIP && (
                  <Badge className="bg-linear-to-r from-yellow-400 to-yellow-500 text-white border-0 shadow-sm">
                    <span className="w-3.5 h-3.5 mr-1">{ICONS.STAR}</span>
                    VIP
                  </Badge>
                )}
              </DialogTitle>
              <p className="text-sm text-gray-600 font-medium">
                Mã khách hàng: {customer.customerID}
              </p>
            </div>
            <Badge
              variant={
                customer.status === "Hoạt động" ? "default" : "destructive"
              }
              className={`${
                customer.status === "Hoạt động"
                  ? "bg-green-100 text-green-700 hover:bg-green-100"
                  : "bg-red-100 text-red-700 hover:bg-red-100"
              } px-4 py-1.5 text-sm font-semibold`}
            >
              {customer.status}
            </Badge>
          </div>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[calc(90vh-8rem)]">
          <Tabs defaultValue="info" className="w-full">
            <div className="px-6 pt-4">
              <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 h-12">
                <TabsTrigger
                  value="info"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium"
                >
                  <span className="w-4 h-4 mr-2">{ICONS.USER}</span>
                  Thông tin cá nhân
                </TabsTrigger>
                <TabsTrigger
                  value="history"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium"
                >
                  <span className="w-4 h-4 mr-2">{ICONS.CALENDAR}</span>
                  Lịch sử đặt phòng
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="info" className="space-y-6 px-6 pb-6 mt-6">
              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="group bg-linear-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-blue-700 mb-2">
                        Tổng số lần đặt
                      </p>
                      <p className="text-3xl font-bold text-blue-900">
                        {customer.totalBookings}
                      </p>
                      <p className="text-xs text-blue-600 mt-1">
                        lượt đặt phòng
                      </p>
                    </div>
                    <div className="p-3 bg-blue-500 rounded-lg shadow-md group-hover:scale-110 transition-transform duration-300">
                      <span className="w-6 h-6 text-white block">
                        {ICONS.CALENDAR}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="group bg-linear-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-green-700 mb-2">
                        Tổng chi tiêu
                      </p>
                      <p className="text-2xl font-bold text-green-900">
                        {formatCurrency(customer.totalSpending)}
                      </p>
                      <p className="text-xs text-green-600 mt-1">
                        tổng doanh thu
                      </p>
                    </div>
                    <div className="p-3 bg-green-500 rounded-lg shadow-md group-hover:scale-110 transition-transform duration-300">
                      <span className="w-6 h-6 text-white block">
                        {ICONS.DOLLAR_SIGN}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="group bg-linear-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-purple-700 mb-2">
                        Lần đến gần nhất
                      </p>
                      <p className="text-xl font-bold text-purple-900">
                        {customer.lastVisit
                          ? formatDate(customer.lastVisit)
                          : "Chưa có"}
                      </p>
                      <p className="text-xs text-purple-600 mt-1">ngày cuối</p>
                    </div>
                    <div className="p-3 bg-purple-500 rounded-lg shadow-md group-hover:scale-110 transition-transform duration-300">
                      <span className="w-6 h-6 text-white block">
                        {ICONS.CLOCK}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Contact Information */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <span className="w-5 h-5 text-primary-600">
                      {ICONS.PHONE}
                    </span>
                    Thông tin liên hệ
                  </h4>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-4 group">
                      <div className="p-2.5 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                        <span className="w-5 h-5 text-blue-600 block">
                          {ICONS.PHONE}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                          Số điện thoại
                        </p>
                        <p className="text-base font-semibold text-gray-900">
                          {customer.phoneNumber}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                      <div className="p-2.5 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
                        <span className="w-5 h-5 text-purple-600 block">
                          {ICONS.MAIL}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                          Email
                        </p>
                        <p className="text-base font-semibold text-gray-900 truncate">
                          {customer.email || "Chưa có"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                      <div className="p-2.5 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                        <span className="w-5 h-5 text-green-600 block">
                          {ICONS.ID_CARD}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                          Số CCCD/Passport
                        </p>
                        <p className="text-base font-semibold text-gray-900">
                          {customer.identityCard}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                      <div className="p-2.5 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors">
                        <span className="w-5 h-5 text-red-600 block">
                          {ICONS.MAP_PIN}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                          Địa chỉ
                        </p>
                        <p className="text-base font-semibold text-gray-900">
                          {customer.address || "Chưa có"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <span className="w-5 h-5 text-primary-600">
                      {ICONS.INFO}
                    </span>
                    Thông tin bổ sung
                  </h4>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Loại khách hàng
                      </p>
                      <Badge
                        variant="outline"
                        className="text-sm font-semibold"
                      >
                        {customer.customerType}
                      </Badge>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Quốc tịch
                      </p>
                      <p className="text-base font-semibold text-gray-900">
                        {customer.nationality || "Chưa có"}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Ngày tạo
                      </p>
                      <p className="text-base font-semibold text-gray-900">
                        {formatDate(customer.createdAt)}
                      </p>
                    </div>

                    {customer.notes && (
                      <div className="md:col-span-2 space-y-1">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Ghi chú
                        </p>
                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <p className="text-sm text-gray-900 leading-relaxed">
                            {customer.notes}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history" className="px-6 pb-6 mt-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                {bookingHistory.length === 0 ? (
                  <div className="p-12 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                      <span className="w-8 h-8 text-gray-400">
                        {ICONS.CALENDAR}
                      </span>
                    </div>
                    <p className="text-gray-500 font-medium">
                      Khách hàng chưa có lịch sử đặt phòng
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      Lịch sử đặt phòng sẽ hiển thị ở đây
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Mã đặt phòng
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Ngày đặt
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Ngày nhận
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Ngày trả
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Phòng
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Loại phòng
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Tổng tiền
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Trạng thái
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {bookingHistory.map((booking) => (
                          <tr
                            key={booking.reservationID}
                            className="hover:bg-blue-50 transition-colors"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm font-bold text-primary-600">
                                {booking.reservationID}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {formatDate(booking.reservationDate)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {formatDate(booking.checkInDate)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {formatDate(booking.checkOutDate)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm font-semibold text-gray-900">
                                {booking.roomName}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {booking.roomTypeName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm font-bold text-gray-900">
                                {formatCurrency(booking.totalAmount)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge
                                variant="outline"
                                className={`font-semibold ${
                                  booking.status === "Đã hoàn thành"
                                    ? "bg-green-50 text-green-700 border-green-200"
                                    : booking.status === "Đang sử dụng"
                                    ? "bg-blue-50 text-blue-700 border-blue-200"
                                    : "bg-gray-50 text-gray-700 border-gray-200"
                                }`}
                              >
                                {booking.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
