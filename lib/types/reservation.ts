// Reservation Status Types
export type ReservationStatus = "Đã đặt" | "Đã nhận" | "Đã hủy" | "Không đến";

// Customer Information
export interface Customer {
  customerID: string;
  customerName: string;
  phoneNumber: string;
  email?: string;
  identityCard: string;
  address?: string;
}

// Reservation Detail (Room in a Reservation)
export interface ReservationDetail {
  detailID: string;
  reservationID: string;
  roomID: string;
  roomName: string;
  roomTypeName: string;
  checkInDate: string;
  checkOutDate: string;
  status: ReservationStatus;
  numberOfGuests: number;
  pricePerNight: number;
}

// Main Reservation
export interface Reservation {
  reservationID: string;
  customerID: string;
  customer: Customer;
  reservationDate: string;
  totalRooms: number;
  totalAmount: number;
  depositAmount: number;
  notes?: string;
  status: ReservationStatus;
  details: ReservationDetail[];
}

// Reservation Form Data
export interface ReservationFormData {
  customerName: string;
  phoneNumber: string;
  email?: string;
  identityCard: string;
  address?: string;
  checkInDate: string;
  checkOutDate: string;
  roomTypeID: string;
  numberOfGuests: number;
  depositAmount: number;
  notes?: string;
}

// Available Room Search
export interface AvailableRoomSearchParams {
  checkInDate: string;
  checkOutDate: string;
  roomTypeID?: string;
  numberOfGuests?: number;
}

// Calendar Event for Timeline View
export interface ReservationEvent {
  id: string;
  reservationID: string;
  roomID: string;
  roomName: string;
  customerName: string;
  start: Date;
  end: Date;
  status: ReservationStatus;
  numberOfGuests: number;
}
