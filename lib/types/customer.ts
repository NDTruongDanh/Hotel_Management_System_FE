// Customer Types
export type CustomerType = "Cá nhân" | "Doanh nghiệp";
export type CustomerStatus = "Hoạt động" | "Vô hiệu hóa";

// Customer Interface
export interface Customer {
  customerID: string;
  customerName: string;
  phoneNumber: string;
  email?: string;
  identityCard: string;
  address?: string;
  nationality?: string;
  customerType: CustomerType;
  isVIP: boolean;
  status: CustomerStatus;
  createdAt: string;
  totalBookings: number;
  totalSpending: number;
  lastVisit?: string;
  notes?: string;
}

// Customer Booking History
export interface CustomerBookingHistory {
  reservationID: string;
  reservationDate: string;
  checkInDate: string;
  checkOutDate: string;
  roomName: string;
  roomTypeName: string;
  totalAmount: number;
  status: string;
}

// Customer Form Data
export interface CustomerFormData {
  customerName: string;
  phoneNumber: string;
  email?: string;
  identityCard: string;
  address?: string;
  nationality?: string;
  customerType: CustomerType;
  isVIP: boolean;
  notes?: string;
}

// Customer Filter Options
export interface CustomerFilterOptions {
  searchQuery: string;
  customerType: "all" | CustomerType;
  vipOnly: boolean;
  status: "all" | CustomerStatus;
}

// Customer Statistics
export interface CustomerStatistics {
  totalCustomers: number;
  vipCustomers: number;
  activeCustomers: number;
  newCustomersThisMonth: number;
}
