// Room Status Types
export type RoomStatus = "Trống" | "Đang thuê" | "Đang dọn dẹp" | "Bảo trì";

// Room Type
export interface RoomType {
  roomTypeID: string;
  roomTypeName: string;
  price: number;
  capacity: number;
  amenities: string[];
}

// Room
export interface Room {
  roomID: string;
  roomName: string;
  roomTypeID: string;
  roomType: RoomType;
  roomStatus: RoomStatus;
  floor: number;
}

// Filter Options
export interface RoomFilterOptions {
  status: RoomStatus | "Tất cả";
  roomType: string | "Tất cả";
  floor: number | "Tất cả";
}
