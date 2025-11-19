"use client";

import { useState, useMemo } from "react";
import {
  Customer,
  CustomerFormData,
  CustomerFilterOptions,
  CustomerBookingHistory,
} from "@/lib/types/customer";
import {
  mockCustomers,
  mockCustomerStatistics,
  getCustomerBookingHistory,
  validatePhoneNumber,
  validateEmail,
  validateIdentityCard,
  searchCustomers,
  filterCustomers,
} from "@/lib/mock-customers";
import { useNotification } from "./use-notification";

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(
    null
  );

  const [filters, setFilters] = useState<CustomerFilterOptions>({
    searchQuery: "",
    customerType: "all",
    vipOnly: false,
    status: "all",
  });

  const { showSuccess } = useNotification();

  // Filtered customers
  const filteredCustomers = useMemo(() => {
    let result = [...customers];

    // Apply search
    if (filters.searchQuery) {
      result = searchCustomers(filters.searchQuery);
    }

    // Apply filters
    result = filterCustomers(result, {
      customerType: filters.customerType,
      vipOnly: filters.vipOnly,
      status: filters.status,
    });

    return result;
  }, [customers, filters]);

  // Statistics
  const statistics = useMemo(() => {
    return {
      ...mockCustomerStatistics,
      totalCustomers: customers.length,
      activeCustomers: customers.filter((c) => c.status === "Hoạt động").length,
      vipCustomers: customers.filter((c) => c.isVIP).length,
    };
  }, [customers]);

  // Add customer
  const addCustomer = (formData: CustomerFormData): boolean => {
    // Validate phone number
    if (!validatePhoneNumber(formData.phoneNumber)) {
      alert("Số điện thoại không hợp lệ. Vui lòng nhập đúng định dạng.");
      return false;
    }

    // Validate email if provided
    if (formData.email && !validateEmail(formData.email)) {
      alert("Email không hợp lệ. Vui lòng nhập đúng định dạng.");
      return false;
    }

    // Validate identity card
    if (!validateIdentityCard(formData.identityCard)) {
      alert("Số CCCD không hợp lệ. Vui lòng nhập 9 hoặc 12 chữ số.");
      return false;
    }

    // Check for duplicate phone number
    if (customers.some((c) => c.phoneNumber === formData.phoneNumber)) {
      alert("Số điện thoại đã tồn tại trong hệ thống.");
      return false;
    }

    // Check for duplicate identity card
    if (customers.some((c) => c.identityCard === formData.identityCard)) {
      alert("Số CCCD đã tồn tại trong hệ thống.");
      return false;
    }

    // Generate new customer ID
    const newID = `KH${String(customers.length + 1).padStart(3, "0")}`;

    const newCustomer: Customer = {
      customerID: newID,
      customerName: formData.customerName,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      identityCard: formData.identityCard,
      address: formData.address,
      nationality: formData.nationality || "Việt Nam",
      customerType: formData.customerType,
      isVIP: formData.isVIP,
      status: "Hoạt động",
      createdAt: new Date().toISOString().split("T")[0],
      totalBookings: 0,
      totalSpending: 0,
      notes: formData.notes,
    };

    setCustomers([...customers, newCustomer]);
    showSuccess("Thêm khách hàng thành công!");
    return true;
  };

  // Update customer
  const updateCustomer = (
    customerID: string,
    formData: CustomerFormData
  ): boolean => {
    // Validate phone number
    if (!validatePhoneNumber(formData.phoneNumber)) {
      alert("Số điện thoại không hợp lệ. Vui lòng nhập đúng định dạng.");
      return false;
    }

    // Validate email if provided
    if (formData.email && !validateEmail(formData.email)) {
      alert("Email không hợp lệ. Vui lòng nhập đúng định dạng.");
      return false;
    }

    // Validate identity card
    if (!validateIdentityCard(formData.identityCard)) {
      alert("Số CCCD không hợp lệ. Vui lòng nhập 9 hoặc 12 chữ số.");
      return false;
    }

    // Check for duplicate phone number (excluding current customer)
    if (
      customers.some(
        (c) =>
          c.phoneNumber === formData.phoneNumber && c.customerID !== customerID
      )
    ) {
      alert("Số điện thoại đã tồn tại trong hệ thống.");
      return false;
    }

    // Check for duplicate identity card (excluding current customer)
    if (
      customers.some(
        (c) =>
          c.identityCard === formData.identityCard &&
          c.customerID !== customerID
      )
    ) {
      alert("Số CCCD đã tồn tại trong hệ thống.");
      return false;
    }

    setCustomers(
      customers.map((customer) =>
        customer.customerID === customerID
          ? {
              ...customer,
              customerName: formData.customerName,
              phoneNumber: formData.phoneNumber,
              email: formData.email,
              identityCard: formData.identityCard,
              address: formData.address,
              nationality: formData.nationality,
              customerType: formData.customerType,
              isVIP: formData.isVIP,
              notes: formData.notes,
            }
          : customer
      )
    );

    showSuccess("Cập nhật thông tin khách hàng thành công!");
    return true;
  };

  // Delete customer (soft delete)
  const deleteCustomer = (customerID: string): boolean => {
    const customer = customers.find((c) => c.customerID === customerID);

    if (!customer) {
      alert("Không tìm thấy khách hàng.");
      return false;
    }

    // Check if customer has booking history
    if (customer.totalBookings > 0) {
      // Soft delete
      setCustomers(
        customers.map((c) =>
          c.customerID === customerID ? { ...c, status: "Vô hiệu hóa" } : c
        )
      );
      showSuccess(
        "Khách hàng có lịch sử giao dịch. Đã chuyển sang trạng thái vô hiệu hóa."
      );
      return true;
    }

    // Hard delete if no booking history
    setCustomers(customers.filter((c) => c.customerID !== customerID));
    showSuccess("Xóa khách hàng thành công!");
    return true;
  };

  // Activate customer
  const activateCustomer = (customerID: string): boolean => {
    setCustomers(
      customers.map((c) =>
        c.customerID === customerID ? { ...c, status: "Hoạt động" } : c
      )
    );
    showSuccess("Kích hoạt khách hàng thành công!");
    return true;
  };

  // Get customer details with booking history
  const getCustomerDetails = (
    customerID: string
  ): {
    customer: Customer | null;
    bookingHistory: CustomerBookingHistory[];
  } => {
    const customer = customers.find((c) => c.customerID === customerID) || null;
    const bookingHistory = customer
      ? getCustomerBookingHistory(customerID)
      : [];

    return { customer, bookingHistory };
  };

  // Modal handlers
  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const openEditModal = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setSelectedCustomer(null);
    setIsEditModalOpen(false);
  };

  const openDetailModal = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDetailModalOpen(true);
  };
  const closeDetailModal = () => {
    setSelectedCustomer(null);
    setIsDetailModalOpen(false);
  };

  const openDeleteDialog = (customer: Customer) => {
    setCustomerToDelete(customer);
    setIsDeleteDialogOpen(true);
  };
  const closeDeleteDialog = () => {
    setCustomerToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  const confirmDelete = () => {
    if (customerToDelete) {
      deleteCustomer(customerToDelete.customerID);
      closeDeleteDialog();
    }
  };

  return {
    customers: filteredCustomers,
    selectedCustomer,
    statistics,
    filters,
    setFilters,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    activateCustomer,
    getCustomerDetails,
    isAddModalOpen,
    isEditModalOpen,
    isDetailModalOpen,
    isDeleteDialogOpen,
    customerToDelete,
    openAddModal,
    closeAddModal,
    openEditModal,
    closeEditModal,
    openDetailModal,
    closeDetailModal,
    openDeleteDialog,
    closeDeleteDialog,
    confirmDelete,
  };
}
