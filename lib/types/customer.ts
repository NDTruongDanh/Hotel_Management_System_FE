import type { ReservationStatus } from "@/lib/types/reservation";

export type CustomerType = "Cá nhân" | "Doanh nghiệp";
export type CustomerStatus = "Hoạt động" | "Đã vô hiệu";

export interface CustomerHistoryRecord {
  reservationId: string;
  checkInDate: string;
  checkOutDate: string;
  roomName: string;
  roomTypeName: string;
  status: ReservationStatus;
  totalAmount: number;
}

export interface CustomerRecord {
  customerId: string;
  customerName: string;
  phoneNumber: string;
  email: string;
  identityCard: string;
  address: string;
  nationality: string;
  customerType: CustomerType;
  isVip: boolean;
  status: CustomerStatus;
  notes?: string;
  createdAt: string;
  lastVisit: string;
  totalBookings: number;
  totalSpent: number;
  tags?: string[];
  history: CustomerHistoryRecord[];
}

export interface CustomerFormData {
  customerName: string;
  phoneNumber: string;
  email: string;
  identityCard: string;
  address: string;
  nationality: string;
  customerType: CustomerType;
  isVip: boolean;
  notes?: string;
}

export interface CustomerFilters {
  searchQuery: string;
  typeFilter: CustomerType | "Tất cả";
  vipFilter: "Tất cả" | "VIP" | "Thường";
}

export interface CustomerStatistics {
  totalCustomers: number;
  vipCustomers: number;
  inactiveCustomers: number;
  corporateCustomers: number;
  totalLifetimeValue: number;
}
