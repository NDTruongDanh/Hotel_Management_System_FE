import { Room, RoomType } from "@/lib/types/room";

// Mock Room Types
export const mockRoomTypes: RoomType[] = [
  {
    maLoaiPhong: "STD",
    tenLoaiPhong: "Standard",
    gia: 500000,
    sucChua: 2,
    tienNghi: ["WiFi", "Tivi", "Điều hòa", "Tủ lạnh"],
  },
  {
    maLoaiPhong: "DLX",
    tenLoaiPhong: "Deluxe",
    gia: 800000,
    sucChua: 2,
    tienNghi: ["WiFi", "Tivi", "Điều hòa", "Tủ lạnh", "Minibar", "Ban công"],
  },
  {
    maLoaiPhong: "SUT",
    tenLoaiPhong: "Suite",
    gia: 1200000,
    sucChua: 4,
    tienNghi: [
      "WiFi",
      "Tivi",
      "Điều hòa",
      "Tủ lạnh",
      "Minibar",
      "Ban công",
      "Bồn tắm",
      "Phòng khách riêng",
    ],
  },
  {
    maLoaiPhong: "FAM",
    tenLoaiPhong: "Family",
    gia: 1500000,
    sucChua: 6,
    tienNghi: [
      "WiFi",
      "Tivi",
      "Điều hòa",
      "Tủ lạnh",
      "Minibar",
      "Bếp nhỏ",
      "2 Phòng ngủ",
    ],
  },
];

// Mock Rooms
export const mockRooms: Room[] = [
  // Floor 1 - Standard Rooms
  {
    maPhong: "101",
    tenPhong: "Phòng 101",
    maLoaiPhong: "STD",
    loaiPhong: mockRoomTypes[0],
    trangThaiPhong: "Trống",
    tang: 1,
  },
  {
    maPhong: "102",
    tenPhong: "Phòng 102",
    maLoaiPhong: "STD",
    loaiPhong: mockRoomTypes[0],
    trangThaiPhong: "Đang thuê",
    tang: 1,
  },
  {
    maPhong: "103",
    tenPhong: "Phòng 103",
    maLoaiPhong: "STD",
    loaiPhong: mockRoomTypes[0],
    trangThaiPhong: "Đang dọn dẹp",
    tang: 1,
  },
  {
    maPhong: "104",
    tenPhong: "Phòng 104",
    maLoaiPhong: "STD",
    loaiPhong: mockRoomTypes[0],
    trangThaiPhong: "Trống",
    tang: 1,
  },
  {
    maPhong: "105",
    tenPhong: "Phòng 105",
    maLoaiPhong: "DLX",
    loaiPhong: mockRoomTypes[1],
    trangThaiPhong: "Bảo trì",
    tang: 1,
  },

  // Floor 2 - Deluxe Rooms
  {
    maPhong: "201",
    tenPhong: "Phòng 201",
    maLoaiPhong: "DLX",
    loaiPhong: mockRoomTypes[1],
    trangThaiPhong: "Đang thuê",
    tang: 2,
  },
  {
    maPhong: "202",
    tenPhong: "Phòng 202",
    maLoaiPhong: "DLX",
    loaiPhong: mockRoomTypes[1],
    trangThaiPhong: "Trống",
    tang: 2,
  },
  {
    maPhong: "203",
    tenPhong: "Phòng 203",
    maLoaiPhong: "DLX",
    loaiPhong: mockRoomTypes[1],
    trangThaiPhong: "Đang thuê",
    tang: 2,
  },
  {
    maPhong: "204",
    tenPhong: "Phòng 204",
    maLoaiPhong: "DLX",
    loaiPhong: mockRoomTypes[1],
    trangThaiPhong: "Trống",
    tang: 2,
  },
  {
    maPhong: "205",
    tenPhong: "Phòng 205",
    maLoaiPhong: "DLX",
    loaiPhong: mockRoomTypes[1],
    trangThaiPhong: "Đang dọn dẹp",
    tang: 2,
  },

  // Floor 3 - Suite Rooms
  {
    maPhong: "301",
    tenPhong: "Phòng 301",
    maLoaiPhong: "SUT",
    loaiPhong: mockRoomTypes[2],
    trangThaiPhong: "Đang thuê",
    tang: 3,
  },
  {
    maPhong: "302",
    tenPhong: "Phòng 302",
    maLoaiPhong: "SUT",
    loaiPhong: mockRoomTypes[2],
    trangThaiPhong: "Trống",
    tang: 3,
  },
  {
    maPhong: "303",
    tenPhong: "Phòng 303",
    maLoaiPhong: "SUT",
    loaiPhong: mockRoomTypes[2],
    trangThaiPhong: "Trống",
    tang: 3,
  },
  {
    maPhong: "304",
    tenPhong: "Phòng 304",
    maLoaiPhong: "FAM",
    loaiPhong: mockRoomTypes[3],
    trangThaiPhong: "Đang thuê",
    tang: 3,
  },
  {
    maPhong: "305",
    tenPhong: "Phòng 305",
    maLoaiPhong: "FAM",
    loaiPhong: mockRoomTypes[3],
    trangThaiPhong: "Trống",
    tang: 3,
  },

  // Floor 4
  {
    maPhong: "401",
    tenPhong: "Phòng 401",
    maLoaiPhong: "SUT",
    loaiPhong: mockRoomTypes[2],
    trangThaiPhong: "Trống",
    tang: 4,
  },
  {
    maPhong: "402",
    tenPhong: "Phòng 402",
    maLoaiPhong: "SUT",
    loaiPhong: mockRoomTypes[2],
    trangThaiPhong: "Đang thuê",
    tang: 4,
  },
  {
    maPhong: "403",
    tenPhong: "Phòng 403",
    maLoaiPhong: "FAM",
    loaiPhong: mockRoomTypes[3],
    trangThaiPhong: "Trống",
    tang: 4,
  },
  {
    maPhong: "404",
    tenPhong: "Phòng 404",
    maLoaiPhong: "FAM",
    loaiPhong: mockRoomTypes[3],
    trangThaiPhong: "Bảo trì",
    tang: 4,
  },
  {
    maPhong: "405",
    tenPhong: "Phòng 405",
    maLoaiPhong: "FAM",
    loaiPhong: mockRoomTypes[3],
    trangThaiPhong: "Đang dọn dẹp",
    tang: 4,
  },
];

// Helper function to get room statistics
export const getRoomStatistics = (rooms: Room[]) => {
  const total = rooms.length;
  const available = rooms.filter((r) => r.trangThaiPhong === "Trống").length;
  const occupied = rooms.filter((r) => r.trangThaiPhong === "Đang thuê").length;
  const cleaning = rooms.filter(
    (r) => r.trangThaiPhong === "Đang dọn dẹp"
  ).length;
  const maintenance = rooms.filter(
    (r) => r.trangThaiPhong === "Bảo trì"
  ).length;

  return {
    total,
    available,
    occupied,
    cleaning,
    maintenance,
    occupancyRate: Math.round((occupied / total) * 100),
  };
};

// Helper function to get unique floors
export const getUniqueFloors = (rooms: Room[]): number[] => {
  return Array.from(new Set(rooms.map((room) => room.tang))).sort(
    (a, b) => a - b
  );
};

// Helper function to get unique room types
export const getUniqueRoomTypes = (rooms: Room[]): RoomType[] => {
  const uniqueTypes = new Map<string, RoomType>();
  rooms.forEach((room) => {
    if (!uniqueTypes.has(room.maLoaiPhong)) {
      uniqueTypes.set(room.maLoaiPhong, room.loaiPhong);
    }
  });
  return Array.from(uniqueTypes.values());
};
