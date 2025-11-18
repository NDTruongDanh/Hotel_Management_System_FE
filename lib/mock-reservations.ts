import {
  Reservation,
  ReservationDetail,
  Customer,
  ReservationEvent,
} from "@/lib/types/reservation";

// Mock Customers
export const mockCustomers: Customer[] = [
  {
    customerID: "KH001",
    customerName: "Nguyễn Văn An",
    phoneNumber: "0901234567",
    email: "nguyenvanan@email.com",
    identityCard: "079012345678",
    address: "123 Lê Lợi, Q.1, TP.HCM",
  },
  {
    customerID: "KH002",
    customerName: "Trần Thị Bình",
    phoneNumber: "0912345678",
    email: "tranthibinh@email.com",
    identityCard: "079087654321",
    address: "456 Nguyễn Huệ, Q.1, TP.HCM",
  },
  {
    customerID: "KH003",
    customerName: "Lê Minh Cường",
    phoneNumber: "0923456789",
    email: "leminhcuong@email.com",
    identityCard: "079098765432",
    address: "789 Trần Hưng Đạo, Q.5, TP.HCM",
  },
  {
    customerID: "KH004",
    customerName: "Phạm Thu Duyên",
    phoneNumber: "0934567890",
    email: "phamthuduyen@email.com",
    identityCard: "079011223344",
    address: "321 Võ Văn Tần, Q.3, TP.HCM",
  },
  {
    customerID: "KH005",
    customerName: "Hoàng Văn Em",
    phoneNumber: "0945678901",
    email: "hoangvanem@email.com",
    identityCard: "079055667788",
    address: "654 Lý Thường Kiệt, Q.10, TP.HCM",
  },
];

// Mock Reservation Details
const mockReservationDetails: ReservationDetail[] = [
  {
    detailID: "CTD001",
    reservationID: "DP001",
    roomID: "P101",
    roomName: "Phòng 101",
    roomTypeName: "Standard",
    checkInDate: "2025-11-20",
    checkOutDate: "2025-11-23",
    status: "Đã đặt",
    numberOfGuests: 2,
    pricePerNight: 500000,
  },
  {
    detailID: "CTD002",
    reservationID: "DP002",
    roomID: "P201",
    roomName: "Phòng 201",
    roomTypeName: "Deluxe",
    checkInDate: "2025-11-19",
    checkOutDate: "2025-11-22",
    status: "Đã đặt",
    numberOfGuests: 2,
    pricePerNight: 800000,
  },
  {
    detailID: "CTD003",
    reservationID: "DP003",
    roomID: "P301",
    roomName: "Phòng 301",
    roomTypeName: "Suite",
    checkInDate: "2025-11-21",
    checkOutDate: "2025-11-25",
    status: "Đã đặt",
    numberOfGuests: 4,
    pricePerNight: 1200000,
  },
  {
    detailID: "CTD004",
    reservationID: "DP004",
    roomID: "P102",
    roomName: "Phòng 102",
    roomTypeName: "Standard",
    checkInDate: "2025-11-18",
    checkOutDate: "2025-11-20",
    status: "Đã nhận",
    numberOfGuests: 2,
    pricePerNight: 500000,
  },
  {
    detailID: "CTD005",
    reservationID: "DP005",
    roomID: "P202",
    roomName: "Phòng 202",
    roomTypeName: "Deluxe",
    checkInDate: "2025-11-22",
    checkOutDate: "2025-11-26",
    status: "Đã đặt",
    numberOfGuests: 3,
    pricePerNight: 800000,
  },
  {
    detailID: "CTD006",
    reservationID: "DP006",
    roomID: "P103",
    roomName: "Phòng 103",
    roomTypeName: "Standard",
    checkInDate: "2025-11-15",
    checkOutDate: "2025-11-17",
    status: "Đã hủy",
    numberOfGuests: 2,
    pricePerNight: 500000,
  },
  {
    detailID: "CTD007",
    reservationID: "DP007",
    roomID: "P302",
    roomName: "Phòng 302",
    roomTypeName: "Suite",
    checkInDate: "2025-11-24",
    checkOutDate: "2025-11-28",
    status: "Đã đặt",
    numberOfGuests: 4,
    pricePerNight: 1200000,
  },
  {
    detailID: "CTD008",
    reservationID: "DP008",
    roomID: "P203",
    roomName: "Phòng 203",
    roomTypeName: "Deluxe",
    checkInDate: "2025-11-25",
    checkOutDate: "2025-11-27",
    status: "Đã đặt",
    numberOfGuests: 2,
    pricePerNight: 800000,
  },
];

// Mock Reservations
export const mockReservations: Reservation[] = [
  {
    reservationID: "DP001",
    customerID: "KH001",
    customer: mockCustomers[0],
    reservationDate: "2025-11-15",
    totalRooms: 1,
    totalAmount: 1500000, // 3 nights * 500000
    depositAmount: 500000,
    notes: "Yêu cầu phòng tầng cao",
    status: "Đã đặt",
    details: [mockReservationDetails[0]],
  },
  {
    reservationID: "DP002",
    customerID: "KH002",
    customer: mockCustomers[1],
    reservationDate: "2025-11-14",
    totalRooms: 1,
    totalAmount: 2400000, // 3 nights * 800000
    depositAmount: 800000,
    notes: "Khách VIP, chuẩn bị hoa tươi",
    status: "Đã đặt",
    details: [mockReservationDetails[1]],
  },
  {
    reservationID: "DP003",
    customerID: "KH003",
    customer: mockCustomers[2],
    reservationDate: "2025-11-16",
    totalRooms: 1,
    totalAmount: 4800000, // 4 nights * 1200000
    depositAmount: 1200000,
    notes: "Du lịch gia đình",
    status: "Đã đặt",
    details: [mockReservationDetails[2]],
  },
  {
    reservationID: "DP004",
    customerID: "KH004",
    customer: mockCustomers[3],
    reservationDate: "2025-11-17",
    totalRooms: 1,
    totalAmount: 1000000, // 2 nights * 500000
    depositAmount: 500000,
    notes: "Công tác",
    status: "Đã nhận",
    details: [mockReservationDetails[3]],
  },
  {
    reservationID: "DP005",
    customerID: "KH005",
    customer: mockCustomers[4],
    reservationDate: "2025-11-17",
    totalRooms: 1,
    totalAmount: 3200000, // 4 nights * 800000
    depositAmount: 800000,
    notes: "Kỷ niệm ngày cưới",
    status: "Đã đặt",
    details: [mockReservationDetails[4]],
  },
  {
    reservationID: "DP006",
    customerID: "KH001",
    customer: mockCustomers[0],
    reservationDate: "2025-11-10",
    totalRooms: 1,
    totalAmount: 1000000, // 2 nights * 500000
    depositAmount: 500000,
    notes: "Hủy do thay đổi kế hoạch",
    status: "Đã hủy",
    details: [mockReservationDetails[5]],
  },
  {
    reservationID: "DP007",
    customerID: "KH002",
    customer: mockCustomers[1],
    reservationDate: "2025-11-18",
    totalRooms: 1,
    totalAmount: 4800000, // 4 nights * 1200000
    depositAmount: 1200000,
    notes: "Họp hội nghị",
    status: "Đã đặt",
    details: [mockReservationDetails[6]],
  },
  {
    reservationID: "DP008",
    customerID: "KH003",
    customer: mockCustomers[2],
    reservationDate: "2025-11-19",
    totalRooms: 1,
    totalAmount: 1600000, // 2 nights * 800000
    depositAmount: 500000,
    notes: "Tuần trăng mật",
    status: "Đã đặt",
    details: [mockReservationDetails[7]],
  },
];

// Helper function to convert reservations to calendar events
export const convertReservationsToEvents = (
  reservations: Reservation[]
): ReservationEvent[] => {
  const events: ReservationEvent[] = [];

  reservations.forEach((reservation) => {
    reservation.details.forEach((detail) => {
      events.push({
        id: detail.detailID,
        reservationID: reservation.reservationID,
        roomID: detail.roomID,
        roomName: detail.roomName,
        customerName: reservation.customer.customerName,
        start: new Date(detail.checkInDate),
        end: new Date(detail.checkOutDate),
        status: detail.status,
        numberOfGuests: detail.numberOfGuests,
      });
    });
  });

  return events;
};

// Helper function to check room availability (conflict detection - FR-009)
export const checkRoomAvailability = (
  roomID: string,
  checkInDate: string,
  checkOutDate: string,
  excludeReservationID?: string
): boolean => {
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);

  const conflictingReservations = mockReservations.filter((reservation) => {
    if (
      excludeReservationID &&
      reservation.reservationID === excludeReservationID
    ) {
      return false;
    }

    return reservation.details.some((detail) => {
      if (detail.roomID !== roomID) return false;
      if (detail.status === "Đã hủy" || detail.status === "Không đến")
        return false;

      const existingCheckIn = new Date(detail.checkInDate);
      const existingCheckOut = new Date(detail.checkOutDate);

      // Check for overlap
      return checkIn < existingCheckOut && checkOut > existingCheckIn;
    });
  });

  return conflictingReservations.length === 0;
};

// Helper function to get available rooms for a date range
export const getAvailableRooms = (
  checkInDate: string,
  checkOutDate: string
): string[] => {
  // This would normally query the database
  // For mock purposes, return a simple list
  const allRoomIDs = [
    "P101",
    "P102",
    "P103",
    "P104",
    "P105",
    "P201",
    "P202",
    "P203",
    "P204",
    "P205",
    "P301",
    "P302",
    "P303",
    "P304",
    "P305",
  ];

  return allRoomIDs.filter((roomID) => {
    const isAvailable = checkRoomAvailability(
      roomID,
      checkInDate,
      checkOutDate
    );
    return isAvailable;
  });
};
