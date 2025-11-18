// Service Category Type
export interface ServiceCategory {
  categoryID: string;
  categoryName: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Service Item Type
export interface ServiceItem {
  serviceID: string;
  serviceName: string;
  categoryID: string;
  category: ServiceCategory;
  price: number;
  unit: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Form Data Types
export interface ServiceCategoryFormData {
  categoryName: string;
  description?: string;
}

export interface ServiceItemFormData {
  serviceName: string;
  categoryID: string;
  price: number;
  unit: string;
  description?: string;
}

// Filter Options
export interface ServiceFilterOptions {
  category: string | "Tất cả";
  searchTerm: string;
  status: "active" | "inactive" | "all";
}
