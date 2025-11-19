import {
  Customer,
  CustomerBookingHistory,
  CustomerStatistics,
} from "@/lib/types/customer";

// Mock Customers Data
export const mockCustomers: Customer[] = [
  {
    customerID: "KH001",
    customerName: "Nguyễn Văn An",
    phoneNumber: "0901234567",
    email: "nguyenvanan@email.com",
    identityCard: "079088001234",
    address: "123 Nguyễn Huệ, Q.1, TP.HCM",
    nationality: "Việt Nam",
    customerType: "Cá nhân",
    isVIP: true,
    status: "Hoạt động",
    createdAt: "2024-01-15",
    totalBookings: 12,
    totalSpending: 25000000,
    lastVisit: "2024-11-10",
    notes: "Khách quen, thích phòng view biển",
  },
  {
    customerID: "KH002",
    customerName: "Trần Thị Bình",
    phoneNumber: "0912345678",
    email: "tranthibinh@email.com",
    identityCard: "079088005678",
    address: "456 Lê Lợi, Q.3, TP.HCM",
    nationality: "Việt Nam",
    customerType: "Cá nhân",
    isVIP: false,
    status: "Hoạt động",
    createdAt: "2024-03-20",
    totalBookings: 5,
    totalSpending: 8000000,
    lastVisit: "2024-10-25",
  },
  {
    customerID: "KH003",
    customerName: "Công ty TNHH ABC",
    phoneNumber: "0283456789",
    email: "contact@abc.com.vn",
    identityCard: "0123456789",
    address: "789 Võ Văn Tần, Q.3, TP.HCM",
    nationality: "Việt Nam",
    customerType: "Doanh nghiệp",
    isVIP: true,
    status: "Hoạt động",
    createdAt: "2023-11-05",
    totalBookings: 35,
    totalSpending: 85000000,
    lastVisit: "2024-11-15",
    notes: "Đối tác doanh nghiệp, đặt phòng định kỳ cho nhân viên",
  },
  {
    customerID: "KH004",
    customerName: "Lê Minh Châu",
    phoneNumber: "0934567890",
    email: "leminhchau@email.com",
    identityCard: "079088009012",
    address: "321 Trần Hưng Đạo, Q.5, TP.HCM",
    nationality: "Việt Nam",
    customerType: "Cá nhân",
    isVIP: false,
    status: "Hoạt động",
    createdAt: "2024-05-12",
    totalBookings: 3,
    totalSpending: 4500000,
    lastVisit: "2024-09-18",
  },
  {
    customerID: "KH005",
    customerName: "Phạm Hoàng Duy",
    phoneNumber: "0945678901",
    email: "phamhoangduy@email.com",
    identityCard: "079088003456",
    address: "654 Hai Bà Trưng, Q.1, TP.HCM",
    nationality: "Việt Nam",
    customerType: "Cá nhân",
    isVIP: true,
    status: "Hoạt động",
    createdAt: "2023-08-22",
    totalBookings: 18,
    totalSpending: 32000000,
    lastVisit: "2024-11-12",
    notes: "Khách VIP, ưu tiên phòng Suite",
  },
  {
    customerID: "KH006",
    customerName: "Võ Thị Diệu",
    phoneNumber: "0956789012",
    email: "vothidieu@email.com",
    identityCard: "079088007890",
    address: "987 Phan Xích Long, Phú Nhuận, TP.HCM",
    nationality: "Việt Nam",
    customerType: "Cá nhân",
    isVIP: false,
    status: "Hoạt động",
    createdAt: "2024-07-08",
    totalBookings: 2,
    totalSpending: 3000000,
    lastVisit: "2024-08-20",
  },
  {
    customerID: "KH007",
    customerName: "Hoàng Văn Em",
    phoneNumber: "0967890123",
    email: "hoangvanem@email.com",
    identityCard: "079088002345",
    address: "159 Nam Kỳ Khởi Nghĩa, Q.3, TP.HCM",
    nationality: "Việt Nam",
    customerType: "Cá nhân",
    isVIP: false,
    status: "Vô hiệu hóa",
    createdAt: "2023-12-10",
    totalBookings: 4,
    totalSpending: 6500000,
    lastVisit: "2024-02-15",
    notes: "Đã hủy nhiều lần, tạm khóa tài khoản",
  },
  {
    customerID: "KH008",
    customerName: "Đỗ Thị Phương",
    phoneNumber: "0978901234",
    email: "dothiphuong@email.com",
    identityCard: "079088006789",
    address: "753 Cách Mạng Tháng 8, Q.10, TP.HCM",
    nationality: "Việt Nam",
    customerType: "Cá nhân",
    isVIP: false,
    status: "Hoạt động",
    createdAt: "2024-06-15",
    totalBookings: 1,
    totalSpending: 1500000,
    lastVisit: "2024-07-01",
  },
  {
    customerID: "KH009",
    customerName: "Công ty XYZ Corporation",
    phoneNumber: "0289012345",
    email: "info@xyzcorp.com.vn",
    identityCard: "0987654321",
    address: "246 Nguyễn Thị Minh Khai, Q.1, TP.HCM",
    nationality: "Việt Nam",
    customerType: "Doanh nghiệp",
    isVIP: true,
    status: "Hoạt động",
    createdAt: "2023-06-18",
    totalBookings: 48,
    totalSpending: 120000000,
    lastVisit: "2024-11-18",
    notes: "Đối tác chiến lược, ưu đãi đặc biệt",
  },
  {
    customerID: "KH010",
    customerName: "Bùi Văn Giang",
    phoneNumber: "0990123456",
    email: "buivangiang@email.com",
    identityCard: "079088008901",
    address: "852 Điện Biên Phủ, Q.Bình Thạnh, TP.HCM",
    nationality: "Việt Nam",
    customerType: "Cá nhân",
    isVIP: false,
    status: "Hoạt động",
    createdAt: "2024-09-03",
    totalBookings: 1,
    totalSpending: 800000,
    lastVisit: "2024-09-05",
  },
];

// Mock Customer Booking History
export const mockCustomerBookingHistory: Record<
  string,
  CustomerBookingHistory[]
> = {
  KH001: [
    {
      reservationID: "DP001",
      reservationDate: "2024-11-01",
      checkInDate: "2024-11-10",
      checkOutDate: "2024-11-12",
      roomName: "Phòng 301",
      roomTypeName: "Suite",
      totalAmount: 2400000,
      status: "Đã hoàn thành",
    },
    {
      reservationID: "DP015",
      reservationDate: "2024-10-15",
      checkInDate: "2024-10-20",
      checkOutDate: "2024-10-22",
      roomName: "Phòng 201",
      roomTypeName: "Deluxe",
      totalAmount: 1600000,
      status: "Đã hoàn thành",
    },
    {
      reservationID: "DP032",
      reservationDate: "2024-09-05",
      checkInDate: "2024-09-12",
      checkOutDate: "2024-09-15",
      roomName: "Phòng 302",
      roomTypeName: "Suite",
      totalAmount: 3600000,
      status: "Đã hoàn thành",
    },
  ],
  KH002: [
    {
      reservationID: "DP008",
      reservationDate: "2024-10-20",
      checkInDate: "2024-10-25",
      checkOutDate: "2024-10-27",
      roomName: "Phòng 102",
      roomTypeName: "Standard",
      totalAmount: 1000000,
      status: "Đã hoàn thành",
    },
  ],
  KH003: [
    {
      reservationID: "DP045",
      reservationDate: "2024-11-10",
      checkInDate: "2024-11-15",
      checkOutDate: "2024-11-18",
      roomName: "Phòng 401, 402, 403",
      roomTypeName: "Family",
      totalAmount: 13500000,
      status: "Đang sử dụng",
    },
    {
      reservationID: "DP040",
      reservationDate: "2024-10-25",
      checkInDate: "2024-11-01",
      checkOutDate: "2024-11-03",
      roomName: "Phòng 201, 202",
      roomTypeName: "Deluxe",
      totalAmount: 3200000,
      status: "Đã hoàn thành",
    },
  ],
  KH005: [
    {
      reservationID: "DP012",
      reservationDate: "2024-11-05",
      checkInDate: "2024-11-12",
      checkOutDate: "2024-11-14",
      roomName: "Phòng 301",
      roomTypeName: "Suite",
      totalAmount: 2400000,
      status: "Đã hoàn thành",
    },
  ],
};

// Mock Customer Statistics
export const mockCustomerStatistics: CustomerStatistics = {
  totalCustomers: 10,
  vipCustomers: 4,
  activeCustomers: 9,
  newCustomersThisMonth: 2,
};

// Helper functions for customer operations
export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;
  return phoneRegex.test(phone);
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateIdentityCard = (idCard: string): boolean => {
  // Vietnam ID card: 9 or 12 digits
  const idRegex = /^[0-9]{9}$|^[0-9]{12}$/;
  return idRegex.test(idCard);
};

export const getCustomerByID = (customerID: string): Customer | undefined => {
  return mockCustomers.find((c) => c.customerID === customerID);
};

export const getCustomerBookingHistory = (
  customerID: string
): CustomerBookingHistory[] => {
  return mockCustomerBookingHistory[customerID] || [];
};

export const searchCustomers = (query: string): Customer[] => {
  const lowerQuery = query.toLowerCase();
  return mockCustomers.filter(
    (customer) =>
      customer.customerName.toLowerCase().includes(lowerQuery) ||
      customer.phoneNumber.includes(query) ||
      customer.email?.toLowerCase().includes(lowerQuery) ||
      customer.identityCard.includes(query) ||
      customer.customerID.toLowerCase().includes(lowerQuery)
  );
};

export const filterCustomers = (
  customers: Customer[],
  filters: {
    customerType?: "all" | "Cá nhân" | "Doanh nghiệp";
    vipOnly?: boolean;
    status?: "all" | "Hoạt động" | "Vô hiệu hóa";
  }
): Customer[] => {
  return customers.filter((customer) => {
    if (filters.customerType && filters.customerType !== "all") {
      if (customer.customerType !== filters.customerType) return false;
    }
    if (filters.vipOnly && !customer.isVIP) return false;
    if (filters.status && filters.status !== "all") {
      if (customer.status !== filters.status) return false;
    }
    return true;
  });
};
