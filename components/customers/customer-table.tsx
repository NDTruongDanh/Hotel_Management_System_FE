"use client";

import { Customer } from "@/lib/types/customer";
import { ICONS } from "@/src/constants/icons.enum";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "../ui/card";

interface CustomerTableProps {
  customers: Customer[];
  onViewDetails: (customer: Customer) => void;
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
  onActivate?: (customer: Customer) => void;
}

export function CustomerTable({
  customers,
  onViewDetails,
  onEdit,
  onDelete,
  onActivate,
}: CustomerTableProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <Card>
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Mã KH
            </TableHead>
            <TableHead className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tên khách hàng
            </TableHead>
            <TableHead className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Số điện thoại
            </TableHead>
            <TableHead className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </TableHead>
            <TableHead className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Loại KH
            </TableHead>
            <TableHead className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Số lần đặt
            </TableHead>
            <TableHead className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tổng chi tiêu
            </TableHead>
            <TableHead className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Trạng thái
            </TableHead>
            <TableHead className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Thao tác
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white">
          {customers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="h-24 text-center text-gray-500">
                Không tìm thấy khách hàng nào
              </TableCell>
            </TableRow>
          ) : (
            customers.map((customer) => (
              <TableRow key={customer.customerID}>
                <TableCell className="px-6 py-4 text-sm font-medium text-gray-900">
                  {customer.customerID}
                </TableCell>
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">
                      {customer.customerName}
                    </span>
                    {customer.isVIP && (
                      <span className="inline-flex items-center text-yellow-600">
                        {ICONS.STAR}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-700">
                  {customer.phoneNumber}
                </TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-700">
                  {customer.email || "-"}
                </TableCell>
                <TableCell className="px-6 py-4">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium",
                      customer.customerType === "Doanh nghiệp"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                    )}
                  >
                    {customer.customerType}
                  </span>
                </TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-700">
                  {customer.totalBookings}
                </TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-900 font-medium">
                  {formatCurrency(customer.totalSpending)}
                </TableCell>
                <TableCell className="px-6 py-4">
                  <span
                    className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                      customer.status === "Hoạt động"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    )}
                  >
                    {customer.status}
                  </span>
                </TableCell>
                <TableCell className="px-6 py-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        {ICONS.MORE}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onViewDetails(customer)}>
                        <span className="mr-2">{ICONS.INFO}</span>
                        Xem chi tiết
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(customer)}>
                        <span className="mr-2">{ICONS.EDIT}</span>
                        Chỉnh sửa
                      </DropdownMenuItem>
                      {customer.status === "Hoạt động" ? (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => onDelete(customer)}
                            className="text-red-600"
                          >
                            <span className="mr-2">{ICONS.TRASH}</span>
                            Xóa
                          </DropdownMenuItem>
                        </>
                      ) : (
                        onActivate && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => onActivate(customer)}
                              className="text-green-600"
                            >
                              <span className="mr-2">{ICONS.CHECK}</span>
                              Kích hoạt
                            </DropdownMenuItem>
                          </>
                        )
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
