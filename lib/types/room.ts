// Room Status Types
export type RoomStatus = "Trống" | "Đang thuê" | "Đang dọn dẹp" | "Bảo trì";

// Room Type
export interface RoomType {
  maLoaiPhong: string;
  tenLoaiPhong: string;
  gia: number;
  sucChua: number;
  tienNghi: string[];
}

// Room
export interface Room {
  maPhong: string;
  tenPhong: string;
  maLoaiPhong: string;
  loaiPhong: RoomType;
  trangThaiPhong: RoomStatus;
  tang: number;
}

// Filter Options
export interface RoomFilterOptions {
  status: RoomStatus | "Tất cả";
  roomType: string | "Tất cả";
  floor: number | "Tất cả";
}
