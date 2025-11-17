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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Room, RoomType, RoomStatus } from "@/lib/types/room";

interface RoomFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  room?: Room | null;
  roomTypes: RoomType[];
  onSave: (room: Partial<Room>) => void;
}

export function RoomFormModal({
  open,
  onOpenChange,
  room,
  roomTypes,
  onSave,
}: RoomFormModalProps) {
  const [formData, setFormData] = useState<{
    maPhong: string;
    tenPhong: string;
    maLoaiPhong: string;
    trangThaiPhong: RoomStatus;
    tang: number;
  }>({
    maPhong: "",
    tenPhong: "",
    maLoaiPhong: "",
    trangThaiPhong: "Trống",
    tang: 1,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!open) return;

    if (room) {
      setFormData({
        maPhong: room.maPhong,
        tenPhong: room.tenPhong,
        maLoaiPhong: room.maLoaiPhong,
        trangThaiPhong: room.trangThaiPhong,
        tang: room.tang,
      });
    } else {
      setFormData({
        maPhong: "",
        tenPhong: "",
        maLoaiPhong: roomTypes[0]?.maLoaiPhong || "",
        trangThaiPhong: "Trống",
        tang: 1,
      });
    }
    setErrors({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.maPhong.trim()) {
      newErrors.maPhong = "Mã phòng không được để trống";
    }
    if (!formData.tenPhong.trim()) {
      newErrors.tenPhong = "Tên phòng không được để trống";
    }
    if (!formData.maLoaiPhong) {
      newErrors.maLoaiPhong = "Vui lòng chọn loại phòng";
    }
    if (formData.tang < 1) {
      newErrors.tang = "Tầng phải lớn hơn 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const selectedRoomType = roomTypes.find(
      (rt) => rt.maLoaiPhong === formData.maLoaiPhong
    );

    if (!selectedRoomType) return;

    const roomData: Partial<Room> = {
      maPhong: formData.maPhong,
      tenPhong: formData.tenPhong,
      maLoaiPhong: formData.maLoaiPhong,
      loaiPhong: selectedRoomType,
      trangThaiPhong: formData.trangThaiPhong,
      tang: formData.tang,
    };

    onSave(roomData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            {room ? "Chỉnh sửa phòng" : "Thêm phòng mới"}
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            {room ? "Cập nhật thông tin phòng" : "Nhập thông tin cho phòng mới"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Room Code */}
          <div className="space-y-2">
            <Label
              htmlFor="maPhong"
              className="text-sm font-medium text-gray-700"
            >
              Mã phòng <span className="text-red-500">*</span>
            </Label>
            <Input
              id="maPhong"
              placeholder="Ví dụ: 101, 201A"
              value={formData.maPhong}
              onChange={(e) =>
                setFormData({ ...formData, maPhong: e.target.value })
              }
              disabled={!!room}
              className={errors.maPhong ? "border-red-500" : ""}
            />
            {errors.maPhong && (
              <p className="text-xs text-red-500">{errors.maPhong}</p>
            )}
          </div>

          {/* Room Name */}
          <div className="space-y-2">
            <Label
              htmlFor="tenPhong"
              className="text-sm font-medium text-gray-700"
            >
              Tên phòng <span className="text-red-500">*</span>
            </Label>
            <Input
              id="tenPhong"
              placeholder="Ví dụ: Phòng 101"
              value={formData.tenPhong}
              onChange={(e) =>
                setFormData({ ...formData, tenPhong: e.target.value })
              }
              className={errors.tenPhong ? "border-red-500" : ""}
            />
            {errors.tenPhong && (
              <p className="text-xs text-red-500">{errors.tenPhong}</p>
            )}
          </div>

          {/* Room Type */}
          <div className="space-y-2">
            <Label
              htmlFor="maLoaiPhong"
              className="text-sm font-medium text-gray-700"
            >
              Loại phòng <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.maLoaiPhong}
              onValueChange={(value) =>
                setFormData({ ...formData, maLoaiPhong: value })
              }
            >
              <SelectTrigger
                className={errors.maLoaiPhong ? "border-red-500" : ""}
              >
                <SelectValue placeholder="Chọn loại phòng" />
              </SelectTrigger>
              <SelectContent>
                {roomTypes.map((type) => (
                  <SelectItem key={type.maLoaiPhong} value={type.maLoaiPhong}>
                    {type.tenLoaiPhong} -{" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(type.gia)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.maLoaiPhong && (
              <p className="text-xs text-red-500">{errors.maLoaiPhong}</p>
            )}
          </div>

          {/* Floor */}
          <div className="space-y-2">
            <Label htmlFor="tang" className="text-sm font-medium text-gray-700">
              Tầng <span className="text-red-500">*</span>
            </Label>
            <Input
              id="tang"
              type="number"
              min="1"
              value={formData.tang}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  tang: parseInt(e.target.value) || 1,
                })
              }
              className={errors.tang ? "border-red-500" : ""}
            />
            {errors.tang && (
              <p className="text-xs text-red-500">{errors.tang}</p>
            )}
          </div>

          {/* Status (only for edit mode) */}
          {room && (
            <div className="space-y-2">
              <Label
                htmlFor="trangThaiPhong"
                className="text-sm font-medium text-gray-700"
              >
                Trạng thái
              </Label>
              <Select
                value={formData.trangThaiPhong}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    trangThaiPhong: value as RoomStatus,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Trống">Trống</SelectItem>
                  <SelectItem value="Đang thuê">Đang thuê</SelectItem>
                  <SelectItem value="Đang dọn dẹp">Đang dọn dẹp</SelectItem>
                  <SelectItem value="Bảo trì">Bảo trì</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-primary-600 hover:bg-primary-500"
          >
            {room ? "Cập nhật" : "Thêm phòng"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
