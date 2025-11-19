"use client";

import { useState, useEffect } from "react";
import { Customer, CustomerFormData } from "@/lib/types/customer";
import { ICONS } from "@/src/constants/icons.enum";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface CustomerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: CustomerFormData) => boolean;
  customer?: Customer | null;
  mode: "add" | "edit";
}

export function CustomerFormModal({
  isOpen,
  onClose,
  onSubmit,
  customer,
  mode,
}: CustomerFormModalProps) {
  const [formData, setFormData] = useState<CustomerFormData>({
    customerName: "",
    phoneNumber: "",
    email: "",
    identityCard: "",
    address: "",
    nationality: "Việt Nam",
    customerType: "Cá nhân",
    isVIP: false,
    notes: "",
  });

  useEffect(() => {
    if (!isOpen) return;

    if (customer && mode === "edit") {
      setFormData({
        customerName: customer.customerName,
        phoneNumber: customer.phoneNumber,
        email: customer.email || "",
        identityCard: customer.identityCard,
        address: customer.address || "",
        nationality: customer.nationality || "Việt Nam",
        customerType: customer.customerType,
        isVIP: customer.isVIP,
        notes: customer.notes || "",
      });
    } else {
      setFormData({
        customerName: "",
        phoneNumber: "",
        email: "",
        identityCard: "",
        address: "",
        nationality: "Việt Nam",
        customerType: "Cá nhân",
        isVIP: false,
        notes: "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onSubmit(formData);
    if (success) {
      onClose();
    }
  };

  const handleChange = (
    field: keyof CustomerFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            {mode === "add" ? "Thêm khách hàng mới" : "Chỉnh sửa khách hàng"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Customer Name */}
            <div className="space-y-2">
              <Label htmlFor="customerName" className="text-sm font-medium">
                Tên khách hàng <span className="text-red-600">*</span>
              </Label>
              <Input
                id="customerName"
                value={formData.customerName}
                onChange={(e) => handleChange("customerName", e.target.value)}
                placeholder="Nhập tên khách hàng"
                required
                className="h-10"
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-sm font-medium">
                Số điện thoại <span className="text-red-600">*</span>
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
                placeholder="0901234567"
                required
                className="h-10"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="email@example.com"
                className="h-10"
              />
            </div>

            {/* Identity Card */}
            <div className="space-y-2">
              <Label htmlFor="identityCard" className="text-sm font-medium">
                Số CCCD <span className="text-red-600">*</span>
              </Label>
              <Input
                id="identityCard"
                value={formData.identityCard}
                onChange={(e) => handleChange("identityCard", e.target.value)}
                placeholder="079088001234"
                required
                className="h-10"
              />
            </div>

            {/* Customer Type */}
            <div className="space-y-2">
              <Label htmlFor="customerType" className="text-sm font-medium">
                Loại khách hàng <span className="text-red-600">*</span>
              </Label>
              <Select
                value={formData.customerType}
                onValueChange={(value) =>
                  handleChange(
                    "customerType",
                    value as "Cá nhân" | "Doanh nghiệp"
                  )
                }
              >
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Chọn loại khách hàng" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cá nhân">Cá nhân</SelectItem>
                  <SelectItem value="Doanh nghiệp">Doanh nghiệp</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Nationality */}
            <div className="space-y-2">
              <Label htmlFor="nationality" className="text-sm font-medium">
                Quốc tịch
              </Label>
              <Input
                id="nationality"
                value={formData.nationality}
                onChange={(e) => handleChange("nationality", e.target.value)}
                placeholder="Việt Nam"
                className="h-10"
              />
            </div>
          </div>

          {/* Address - Full Width */}
          <div className="space-y-2">
            <Label htmlFor="address" className="text-sm font-medium">
              Địa chỉ
            </Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Nhập địa chỉ"
              className="h-10"
            />
          </div>

          {/* VIP Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isVIP"
              checked={formData.isVIP}
              onCheckedChange={(checked) =>
                handleChange("isVIP", checked as boolean)
              }
            />
            <Label
              htmlFor="isVIP"
              className="text-sm font-medium cursor-pointer"
            >
              Khách VIP
            </Label>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-medium">
              Ghi chú
            </Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              placeholder="Nhập ghi chú (nếu có)"
              rows={3}
              className="resize-none"
            />
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="h-10"
            >
              <span className="w-4 h-4 mr-2">{ICONS.CLOSE}</span>
              Hủy
            </Button>
            <Button
              type="submit"
              className="h-10 bg-primary-blue-600 hover:bg-primary-blue-500"
            >
              <span className="w-4 h-4 mr-2">{ICONS.SAVE}</span>
              {mode === "add" ? "Thêm khách hàng" : "Cập nhật"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
