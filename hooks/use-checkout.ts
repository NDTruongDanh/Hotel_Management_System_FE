import { useState } from "react";
import type {
  RentalReceipt,
  CheckoutSummary,
  AddServiceFormData,
  AddPenaltyFormData,
} from "@/lib/types/checkin-checkout";
import {
  searchActiveRentals,
  getCheckoutSummary,
  mockServices,
} from "@/lib/mock-checkin-checkout";

export function useCheckOut() {
  const [query, setQuery] = useState("");
  // Initialize with all active rentals on first render
  const [results, setResults] = useState<RentalReceipt[]>(() =>
    searchActiveRentals("")
  );
  const [selectedCheckout, setSelectedCheckout] =
    useState<CheckoutSummary | null>(null);
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [showAddPenaltyModal, setShowAddPenaltyModal] = useState(false);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    const searchResults = searchActiveRentals(searchQuery);
    setResults(searchResults);
  };

  const handleSelectRental = (rental: RentalReceipt) => {
    const summary = getCheckoutSummary(rental.receiptID);
    if (summary) {
      setSelectedCheckout(summary);
    }
  };

  const handleBackToSearch = () => {
    setSelectedCheckout(null);
  };

  const handleAddService = (data: AddServiceFormData): string => {
    if (!selectedCheckout) return "";

    // In real app, this would call an API
    console.log("Add service:", data);

    const service = mockServices.find((s) => s.serviceID === data.serviceID);
    if (!service) return "";

    // Add service to checkout summary
    const newService = {
      detailID: `SD${Date.now()}`,
      serviceID: data.serviceID,
      serviceName: service.serviceName,
      quantity: data.quantity,
      price: service.price,
      total: service.price * data.quantity,
      dateUsed: new Date().toISOString().split("T")[0],
    };

    setSelectedCheckout({
      ...selectedCheckout,
      services: [...selectedCheckout.services, newService],
      servicesTotal: selectedCheckout.servicesTotal + newService.total,
      grandTotal: selectedCheckout.grandTotal + newService.total,
    });

    return service.serviceName;
  };

  const handleAddPenalty = (data: AddPenaltyFormData): boolean => {
    if (!selectedCheckout) return false;

    // In real app, this would call an API
    console.log("Add penalty:", data);

    const newPenalty = {
      penaltyID: `PEN${Date.now()}`,
      description: data.description,
      amount: data.amount,
      dateIssued: new Date().toISOString().split("T")[0],
    };

    setSelectedCheckout({
      ...selectedCheckout,
      penalties: [...selectedCheckout.penalties, newPenalty],
      penaltiesTotal: selectedCheckout.penaltiesTotal + newPenalty.amount,
      grandTotal: selectedCheckout.grandTotal + newPenalty.amount,
    });

    return true;
  };

  const handleCompleteCheckout = (): {
    confirmed: boolean;
    roomName: string;
  } => {
    if (!selectedCheckout) return { confirmed: false, roomName: "" };

    // This would open payment modal in real app
    const confirmed = window.confirm(
      `Xác nhận thanh toán ${new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(selectedCheckout.grandTotal)}?`
    );

    if (confirmed) {
      const roomName = selectedCheckout.receipt.roomName;

      // Remove from results and reset
      setResults((prev) =>
        prev.filter((r) => r.receiptID !== selectedCheckout.receiptID)
      );
      setSelectedCheckout(null);

      return { confirmed: true, roomName };
    }

    return { confirmed: false, roomName: "" };
  };

  return {
    query,
    results,
    selectedCheckout,
    showAddServiceModal,
    showAddPenaltyModal,
    handleSearch,
    handleSelectRental,
    handleBackToSearch,
    handleAddService,
    handleAddPenalty,
    handleCompleteCheckout,
    setShowAddServiceModal,
    setShowAddPenaltyModal,
  };
}
