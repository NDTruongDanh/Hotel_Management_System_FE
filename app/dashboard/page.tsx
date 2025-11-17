"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Hotel, LogOut } from "lucide-react";
import { getCurrentUser, mockLogout, type User } from "@/lib/mock-auth";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push("/login");
      return;
    }
    setUser(currentUser);
  }, [router]);

  const handleLogout = () => {
    mockLogout();
    router.push("/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-blue-100 rounded-lg">
                <Hotel className="h-6 w-6 text-primary-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Hệ thống Quản lý Khách sạn
                </h1>
                <p className="text-xs text-gray-500">Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user.fullName}
                </p>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                Đăng xuất
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="p-4 bg-success-100 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-6">
              <Hotel className="h-10 w-10 text-success-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Chào mừng, {user.fullName}!
            </h2>
            <p className="text-gray-600 mb-4">
              Bạn đã đăng nhập thành công với vai trò{" "}
              <span className="font-semibold text-primary-blue-600">
                {user.role}
              </span>
            </p>
            <div className="bg-info-100 border border-info-600 text-info-600 px-4 py-3 rounded-md text-sm">
              <p className="font-medium mb-2">📋 Thông tin tài khoản:</p>
              <div className="space-y-1 text-left">
                <p>
                  <strong>Mã nhân viên:</strong> {user.employeeId}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                {user.phoneNumber && (
                  <p>
                    <strong>Số điện thoại:</strong> {user.phoneNumber}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-6 p-4 bg-gray-50 rounded-md text-left">
              <p className="text-sm text-gray-600">
                <strong>Lưu ý:</strong> Đây là trang Dashboard tạm thời. Các
                tính năng quản lý phòng, đặt phòng, check-in/check-out, và các
                chức năng khác sẽ được phát triển tiếp theo.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
