"use client";

import { useState, useEffect } from "react";
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
import { RoomType } from "@/lib/types/room";
import { ICONS } from "@/src/constants/icons.enum";

interface RoomTypeFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  roomType?: RoomType | null;
  onSave: (roomType: Partial<RoomType>) => Promise<void>;
}

export function RoomTypeFormModal({
  open,
  onOpenChange,
  roomType,
  onSave,
}: RoomTypeFormModalProps) {
  const [formData, setFormData] = useState<{
    tenLoaiPhong: string;
    gia: string;
    sucChua: string;
    tienNghi: string;
  }>({
    tenLoaiPhong: "",
    gia: "",
    sucChua: "",
    tienNghi: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;

    if (roomType) {
      setFormData({
        tenLoaiPhong: roomType.tenLoaiPhong,
        gia: roomType.gia.toString(),
        sucChua: roomType.sucChua.toString(),
        tienNghi: roomType.tienNghi.join(", "),
      });
    } else {
      setFormData({
        tenLoaiPhong: "",
        gia: "",
        sucChua: "",
        tienNghi: "",
      });
    }
    setErrors({});
  }, [open, roomType]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.tenLoaiPhong.trim()) {
      newErrors.tenLoaiPhong = "Tên loại phòng không được để trống";
    }

    const gia = parseFloat(formData.gia);
    if (!formData.gia.trim() || isNaN(gia) || gia <= 0) {
      newErrors.gia = "Giá phải là số dương";
    }

    const sucChua = parseInt(formData.sucChua);
    if (!formData.sucChua.trim() || isNaN(sucChua) || sucChua <= 0) {
      newErrors.sucChua = "Sức chứa phải là số nguyên dương";
    }

    if (!formData.tienNghi.trim()) {
      newErrors.tienNghi = "Tiện nghi không được để trống";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const roomTypeData: Partial<RoomType> = {
        tenLoaiPhong: formData.tenLoaiPhong.trim(),
        gia: parseFloat(formData.gia),
        sucChua: parseInt(formData.sucChua),
        tienNghi: formData.tienNghi
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item.length > 0),
      };

      if (roomType) {
        roomTypeData.maLoaiPhong = roomType.maLoaiPhong;
      }

      await onSave(roomTypeData);
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving room type:", error);
      setErrors({
        submit: error instanceof Error ? error.message : "Có lỗi xảy ra",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            {roomType ? "Chỉnh sửa Loại phòng" : "Thêm Loại phòng mới"}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            {roomType
              ? "Cập nhật thông tin loại phòng. Nhấn Lưu để hoàn tất."
              : "Nhập thông tin loại phòng mới. Tất cả các trường đều bắt buộc."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-5 py-4">
          {/* Tên loại phòng */}
          <div className="grid gap-2">
            <Label htmlFor="tenLoaiPhong" className="text-sm font-medium text-gray-700">
              Tên loại phòng <span className="text-error-600">*</span>
            </Label>
            <Input
              id="tenLoaiPhong"
              value={formData.tenLoaiPhong}
              onChange={(e) =>
                setFormData({ ...formData, tenLoaiPhong: e.target.value })
              }
              placeholder="VD: Standard, Deluxe, Suite..."
              className={`h-10 ${errors.tenLoaiPhong ? "border-error-600 focus:ring-error-500" : "border-gray-300 focus:ring-primary-blue-500"}`}
            />
            {errors.tenLoaiPhong && (
              <p className="text-xs text-error-600 flex items-center gap-1">
                <span className="w-3 h-3">{ICONS.ALERT}</span>
                {errors.tenLoaiPhong}
              </p>
            )}
          </div>

          {/* Giá */}
          <div className="grid gap-2">
            <Label htmlFor="gia" className="text-sm font-medium text-gray-700">
              Giá (VNĐ) <span className="text-error-600">*</span>
            </Label>
            <Input
              id="gia"
              type="number"
              value={formData.gia}
              onChange={(e) => setFormData({ ...formData, gia: e.target.value })}
              placeholder="VD: 500000"
              className={`h-10 ${errors.gia ? "border-error-600 focus:ring-error-500" : "border-gray-300 focus:ring-primary-blue-500"}`}
            />
            {errors.gia && (
              <p className="text-xs text-error-600 flex items-center gap-1">
                <span className="w-3 h-3">{ICONS.ALERT}</span>
                {errors.gia}
              </p>
            )}
          </div>

          {/* Sức chứa */}
          <div className="grid gap-2">
            <Label htmlFor="sucChua" className="text-sm font-medium text-gray-700">
              Sức chứa (người) <span className="text-error-600">*</span>
            </Label>
            <Input
              id="sucChua"
              type="number"
              value={formData.sucChua}
              onChange={(e) =>
                setFormData({ ...formData, sucChua: e.target.value })
              }
              placeholder="VD: 2"
              className={`h-10 ${errors.sucChua ? "border-error-600 focus:ring-error-500" : "border-gray-300 focus:ring-primary-blue-500"}`}
            />
            {errors.sucChua && (
              <p className="text-xs text-error-600 flex items-center gap-1">
                <span className="w-3 h-3">{ICONS.ALERT}</span>
                {errors.sucChua}
              </p>
            )}
          </div>

          {/* Tiện nghi */}
          <div className="grid gap-2">
            <Label htmlFor="tienNghi" className="text-sm font-medium text-gray-700">
              Tiện nghi <span className="text-error-600">*</span>
            </Label>
            <Input
              id="tienNghi"
              value={formData.tienNghi}
              onChange={(e) =>
                setFormData({ ...formData, tienNghi: e.target.value })
              }
              placeholder="VD: WiFi, Tivi, Điều hòa, Tủ lạnh"
              className={`h-10 ${errors.tienNghi ? "border-error-600 focus:ring-error-500" : "border-gray-300 focus:ring-primary-blue-500"}`}
            />
            <p className="text-xs text-gray-500">
              Nhập các tiện nghi cách nhau bằng dấu phẩy
            </p>
            {errors.tienNghi && (
              <p className="text-xs text-error-600 flex items-center gap-1">
                <span className="w-3 h-3">{ICONS.ALERT}</span>
                {errors.tienNghi}
              </p>
            )}
          </div>

          {/* Submit error */}
          {errors.submit && (
            <div className="p-3 bg-error-100 border border-error-600 rounded-md">
              <p className="text-sm text-error-600 flex items-center gap-2">
                <span className="w-4 h-4">{ICONS.ALERT}</span>
                {errors.submit}
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
            className="h-10 px-5 border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Hủy
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="h-10 px-5 bg-primary-blue-600 text-white hover:bg-primary-blue-700"
          >
            {isSubmitting ? "Đang lưu..." : "Lưu"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
