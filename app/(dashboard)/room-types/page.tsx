"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RoomType } from "@/lib/types/room";
import { ICONS } from "@/src/constants/icons.enum";
import {
  getRoomTypes,
  createRoomType,
  updateRoomType,
  deleteRoomType,
  checkRoomTypeInUse,
} from "@/lib/mock-room-types";
import { RoomTypeFormModal } from "@/components/room-types/room-type-form-modal";
import { RoomTypeTable } from "@/components/room-types/room-type-table";

export default function RoomTypesPage() {
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRoomType, setEditingRoomType] = useState<RoomType | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRoomTypes();
  }, []);

  const loadRoomTypes = async () => {
    try {
      setLoading(true);
      const data = await getRoomTypes();
      setRoomTypes(data);
      setError(null);
    } catch (err) {
      console.error("Error loading room types:", err);
      setError("Không thể tải danh sách loại phòng");
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setEditingRoomType(null);
    setModalOpen(true);
  };

  const handleEdit = (roomType: RoomType) => {
    setEditingRoomType(roomType);
    setModalOpen(true);
  };

  const handleSave = async (roomTypeData: Partial<RoomType>) => {
    try {
      if (editingRoomType) {
        // Update existing room type
        await updateRoomType(editingRoomType.maLoaiPhong, roomTypeData);
      } else {
        // Create new room type
        await createRoomType(roomTypeData as Omit<RoomType, "maLoaiPhong">);
      }
      await loadRoomTypes();
      setModalOpen(false);
      setEditingRoomType(null);
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : "Không thể lưu loại phòng"
      );
    }
  };

  const handleDelete = async (maLoaiPhong: string) => {
    // Check if room type is in use
    const inUse = checkRoomTypeInUse(maLoaiPhong);

    if (inUse) {
      setError(
        "Không thể xóa loại phòng đang được sử dụng. Bạn chỉ có thể chỉnh sửa thông tin."
      );
      setTimeout(() => setError(null), 5000);
      return;
    }

    try {
      setIsDeleting(maLoaiPhong);
      await deleteRoomType(maLoaiPhong);
      await loadRoomTypes();
      setError(null);
    } catch (err) {
      console.error("Error deleting room type:", err);
      setError(err instanceof Error ? err.message : "Không thể xóa loại phòng");
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Quản lý Loại Phòng
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Quản lý các loại phòng, giá cơ bản, sức chứa và tiện nghi
          </p>
        </div>
        <Button
          onClick={handleAddNew}
          className="h-10 px-5 bg-primary-blue-600 text-white hover:bg-primary-blue-700 font-medium"
        >
          <span className="w-4 h-4 mr-2">{ICONS.PLUS}</span>
          Thêm loại phòng mới
        </Button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-error-100 border border-error-600 rounded-lg">
          <div className="flex items-start gap-3">
            <span className="w-5 h-5 text-error-600 shrink-0 mt-0.5">
              {ICONS.ALERT}
            </span>
            <div className="flex-1">
              <p className="text-sm font-medium text-error-600">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-error-600 hover:text-error-700"
            >
              <span className="w-4 h-4">{ICONS.CLOSE}</span>
            </button>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Tổng loại phòng</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">
                {roomTypes.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-primary-blue-100 rounded-lg flex items-center justify-center">
              <span className="w-6 h-6 text-primary-blue-600">
                {ICONS.BED_DOUBLE}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Giá thấp nhất</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">
                {roomTypes.length > 0
                  ? new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(Math.min(...roomTypes.map((rt) => rt.gia)))
                  : "0 ₫"}
              </p>
            </div>
            <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
              <span className="w-6 h-6 text-success-600">
                {ICONS.DOLLAR_SIGN}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Giá cao nhất</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">
                {roomTypes.length > 0
                  ? new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(Math.max(...roomTypes.map((rt) => rt.gia)))
                  : "0 ₫"}
              </p>
            </div>
            <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
              <span className="w-6 h-6 text-warning-600">
                {ICONS.TRENDING_UP}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
          <div className="flex flex-col items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-sm text-gray-500">Đang tải dữ liệu...</p>
          </div>
        </div>
      ) : (
        <RoomTypeTable
          roomTypes={roomTypes}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isDeleting={isDeleting}
        />
      )}

      {/* Form Modal */}
      <RoomTypeFormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        roomType={editingRoomType}
        onSave={handleSave}
      />
    </div>
  );
}
