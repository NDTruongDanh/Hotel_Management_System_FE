import { RoomType } from "@/lib/types/room";

// Mock Room Types Data
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
  {
    maLoaiPhong: "PRE",
    tenLoaiPhong: "Presidential Suite",
    gia: 3000000,
    sucChua: 8,
    tienNghi: [
      "WiFi",
      "Tivi 4K",
      "Điều hòa thông minh",
      "Tủ lạnh mini",
      "Minibar cao cấp",
      "Ban công rộng",
      "Bồn tắm Jacuzzi",
      "Phòng khách sang trọng",
      "Phòng ăn riêng",
      "Bếp đầy đủ",
      "3 Phòng ngủ",
    ],
  },
];

// Mock functions for CRUD operations
export async function getRoomTypes(): Promise<RoomType[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return [...mockRoomTypes];
}

export async function createRoomType(
  roomType: Omit<RoomType, "maLoaiPhong">
): Promise<RoomType> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Generate unique code
  const code = roomType.tenLoaiPhong
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 3);

  const newRoomType: RoomType = {
    maLoaiPhong: code,
    ...roomType,
  };

  mockRoomTypes.push(newRoomType);
  return newRoomType;
}

export async function updateRoomType(
  maLoaiPhong: string,
  updates: Partial<RoomType>
): Promise<RoomType> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const index = mockRoomTypes.findIndex((rt) => rt.maLoaiPhong === maLoaiPhong);
  if (index === -1) {
    throw new Error("Không tìm thấy loại phòng");
  }

  mockRoomTypes[index] = {
    ...mockRoomTypes[index],
    ...updates,
    maLoaiPhong, // Keep original code
  };

  return mockRoomTypes[index];
}

export async function deleteRoomType(maLoaiPhong: string): Promise<void> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const index = mockRoomTypes.findIndex((rt) => rt.maLoaiPhong === maLoaiPhong);
  if (index === -1) {
    throw new Error("Không tìm thấy loại phòng");
  }

  // In a real app, check if room type is in use
  // For now, just remove it (soft delete in production)
  mockRoomTypes.splice(index, 1);
}

export function checkRoomTypeInUse(maLoaiPhong: string): boolean {
  // In real app, query PHONG table
  // For demo, randomly return true/false based on code
  const inUseCodes = ["STD", "DLX", "SUT"];
  return inUseCodes.includes(maLoaiPhong);
}
