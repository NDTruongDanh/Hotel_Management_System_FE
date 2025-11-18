"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RoomType } from "@/lib/types/room";
import { ICONS } from "@/src/constants/icons.enum";
import { formatCurrency } from "@/lib/utils";

interface RoomTypeTableProps {
  roomTypes: RoomType[];
  onEdit: (roomType: RoomType) => void;
  onDelete: (maLoaiPhong: string) => void;
  isDeleting?: string | null;
}

export function RoomTypeTable({
  roomTypes,
  onEdit,
  onDelete,
  isDeleting,
}: RoomTypeTableProps) {
  const [deleteConfirm, setDeleteConfirm] = useState<{
    open: boolean;
    roomType: RoomType | null;
  }>({
    open: false,
    roomType: null,
  });

  const handleDeleteClick = (roomType: RoomType) => {
    setDeleteConfirm({ open: true, roomType });
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirm.roomType) {
      onDelete(deleteConfirm.roomType.maLoaiPhong);
      setDeleteConfirm({ open: false, roomType: null });
    }
  };

  if (roomTypes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="w-16 h-16 text-gray-400 mb-4">{ICONS.BED_DOUBLE}</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Chưa có loại phòng nào
        </h3>
        <p className="text-sm text-gray-500">
          Nhấn &quot;Thêm loại phòng mới&quot; để bắt đầu
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="font-semibold text-gray-700">
                Mã loại phòng
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Tên loại phòng
              </TableHead>
              <TableHead className="font-semibold text-gray-700 text-right">
                Giá (VNĐ)
              </TableHead>
              <TableHead className="font-semibold text-gray-700 text-center">
                Sức chứa
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Tiện nghi
              </TableHead>
              <TableHead className="font-semibold text-gray-700 text-right">
                Thao tác
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roomTypes.map((roomType) => (
              <TableRow
                key={roomType.maLoaiPhong}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell className="font-medium text-gray-900">
                  {roomType.maLoaiPhong}
                </TableCell>
                <TableCell className="font-medium text-gray-900">
                  {roomType.tenLoaiPhong}
                </TableCell>
                <TableCell className="text-right font-medium text-gray-900">
                  {formatCurrency(roomType.gia)}
                </TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant="outline"
                    className="bg-primary-blue-50 text-primary-blue-700 border-primary-blue-200"
                  >
                    {roomType.sucChua} người
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {roomType.tienNghi.slice(0, 3).map((amenity, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-gray-100 text-gray-700 text-xs"
                      >
                        {amenity}
                      </Badge>
                    ))}
                    {roomType.tienNghi.length > 3 && (
                      <Badge
                        variant="secondary"
                        className="bg-gray-100 text-gray-700 text-xs"
                      >
                        +{roomType.tienNghi.length - 3}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(roomType)}
                      className="h-8 px-3 text-primary-blue-600 hover:bg-primary-blue-50 hover:text-primary-blue-700"
                    >
                      <span className="w-4 h-4 mr-1">{ICONS.EDIT}</span>
                      Sửa
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteClick(roomType)}
                      disabled={isDeleting === roomType.maLoaiPhong}
                      className="h-8 px-3 text-error-600 hover:bg-error-50 hover:text-error-700 disabled:opacity-50"
                    >
                      <span className="w-4 h-4 mr-1">{ICONS.TRASH}</span>
                      {isDeleting === roomType.maLoaiPhong
                        ? "Đang xóa..."
                        : "Xóa"}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirm.open}
        onOpenChange={(open) =>
          setDeleteConfirm({ open, roomType: deleteConfirm.roomType })
        }
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Xác nhận xóa loại phòng
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="p-4 bg-warning-100 border border-warning-600 rounded-md mb-4">
              <p className="text-sm text-warning-600 flex items-start gap-2">
                <span className="w-5 h-5 shrink-0 mt-0.5">{ICONS.ALERT}</span>
                <span>
                  Bạn có chắc chắn muốn xóa loại phòng{" "}
                  <strong>{deleteConfirm.roomType?.tenLoaiPhong}</strong> (
                  {deleteConfirm.roomType?.maLoaiPhong})?
                </span>
              </p>
            </div>

            {deleteConfirm.roomType && (
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Giá:</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(deleteConfirm.roomType.gia)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Sức chứa:</span>
                  <span className="font-medium text-gray-900">
                    {deleteConfirm.roomType.sucChua} người
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-gray-500">Tiện nghi:</span>
                  <span className="font-medium text-gray-900 text-right">
                    {deleteConfirm.roomType.tienNghi.join(", ")}
                  </span>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteConfirm({ open: false, roomType: null })}
              className="h-10 px-5 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Hủy
            </Button>
            <Button
              type="button"
              onClick={handleDeleteConfirm}
              className="h-10 px-5 bg-error-600 text-white hover:bg-error-700"
            >
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
