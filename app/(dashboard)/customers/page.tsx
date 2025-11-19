"use client";

import { useCustomers } from "@/hooks/use-customers";
import { Customer } from "@/lib/types/customer";
import {
  CustomerTable,
  CustomerFormModal,
  CustomerDetailModal,
  CustomerFilters,
  CustomerStatisticsCards,
  CustomerDeleteDialog,
} from "@/components/customers";

export default function CustomersPage() {
  const {
    customers,
    selectedCustomer,
    statistics,
    filters,
    setFilters,
    addCustomer,
    updateCustomer,
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
    closeDeleteDialog,
    confirmDelete,
    openDeleteDialog,
  } = useCustomers();

  const handleViewDetails = (customer: Customer) => {
    openDetailModal(customer);
  };

  const handleEdit = (customer: Customer) => {
    openEditModal(customer);
  };

  const handleDelete = (customer: Customer) => {
    openDeleteDialog(customer);
  };

  const handleActivate = (customer: Customer) => {
    activateCustomer(customer.customerID);
  };

  const { bookingHistory } = getCustomerDetails(
    selectedCustomer?.customerID || ""
  );

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Quản lý Khách hàng</h1>
        <p className="text-sm text-gray-600 mt-1">
          Quản lý thông tin khách hàng và xem lịch sử đặt phòng
        </p>
      </div>

      {/* Statistics Cards */}
      <CustomerStatisticsCards statistics={statistics} />

      {/* Filters */}
      <CustomerFilters
        filters={filters}
        onFiltersChange={setFilters}
        onAddCustomer={openAddModal}
      />

      {/* Customer Table */}
      <div className="bg-white rounded-lg border border-gray-300 shadow-sm">
        <div className="p-6 border-b border-gray-300">
          <h2 className="text-lg font-semibold text-gray-900">
            Danh sách khách hàng
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Tổng số: {customers.length} khách hàng
          </p>
        </div>
        <div className="p-6">
          <CustomerTable
            customers={customers}
            onViewDetails={handleViewDetails}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onActivate={handleActivate}
          />
        </div>
      </div>

      {/* Add Customer Modal */}
      <CustomerFormModal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        onSubmit={addCustomer}
        mode="add"
      />

      {/* Edit Customer Modal */}
      <CustomerFormModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onSubmit={(formData) =>
          updateCustomer(selectedCustomer?.customerID || "", formData)
        }
        customer={selectedCustomer}
        mode="edit"
      />

      {/* Customer Detail Modal */}
      <CustomerDetailModal
        isOpen={isDetailModalOpen}
        onClose={closeDetailModal}
        customer={selectedCustomer}
        bookingHistory={bookingHistory}
      />

      {/* Delete Confirmation Dialog */}
      <CustomerDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
        customer={customerToDelete}
      />
    </div>
  );
}
