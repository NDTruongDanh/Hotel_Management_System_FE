"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Hotel,
  LogOut,
  Home,
  BedDouble,
  TrendingUp,
  DollarSign,
  UserCheck,
} from "lucide-react";
import { getCurrentUser, mockLogout, type User } from "@/lib/mock-auth";
import { Button } from "@/components/ui/button";
import { KPICard } from "@/components/dashboard/kpi-card";
import { RoomStatusChart } from "@/components/dashboard/room-status-chart";
import { ArrivalsTable } from "@/components/dashboard/arrivals-table";
import { DeparturesTable } from "@/components/dashboard/departures-table";
import {
  getMockDashboardStats,
  getMockRoomStatusData,
  getMockArrivals,
  getMockDepartures,
} from "@/lib/mock-dashboard";

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

  // Get mock data
  const stats = getMockDashboardStats();
  const roomStatusData = getMockRoomStatusData();
  const arrivals = getMockArrivals();
  const departures = getMockDepartures();

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

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
                <p className="text-xs text-gray-500">Bảng Điều Khiển</p>
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
        {/* Welcome Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Chào mừng, {user.fullName}!
          </h2>
          <p className="text-gray-600 mt-1">
            Tổng quan về tình hình hoạt động của khách sạn
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Tổng Số Phòng"
            value={stats.totalRooms}
            icon={Home}
            iconBgColor="bg-primary-blue-100"
            iconColor="text-primary-blue-600"
          />
          <KPICard
            title="Phòng Trống"
            value={stats.availableRooms}
            icon={BedDouble}
            iconBgColor="bg-success-100"
            iconColor="text-success-600"
          />
          <KPICard
            title="Doanh Thu Hôm Nay"
            value={formatCurrency(stats.todayRevenue)}
            icon={DollarSign}
            iconBgColor="bg-warning-100"
            iconColor="text-warning-600"
          />
          <KPICard
            title="Khách Đang Ở"
            value={stats.currentGuests}
            icon={UserCheck}
            iconBgColor="bg-info-100"
            iconColor="text-info-600"
          />
        </div>

        {/* Chart and Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <RoomStatusChart data={roomStatusData} />
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Thống Kê Nhanh
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <span className="text-sm text-gray-600">Tỷ lệ lấp đầy</span>
                <span className="text-sm font-semibold text-gray-900">
                  {(
                    ((stats.totalRooms - stats.availableRooms) /
                      stats.totalRooms) *
                    100
                  ).toFixed(1)}
                  %
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <span className="text-sm text-gray-600">Khách đến hôm nay</span>
                <span className="text-sm font-semibold text-gray-900">
                  {arrivals.length}
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <span className="text-sm text-gray-600">Khách trả hôm nay</span>
                <span className="text-sm font-semibold text-gray-900">
                  {departures.length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Phòng cần dọn dẹp</span>
                <span className="text-sm font-semibold text-warning-600">
                  {roomStatusData.find((r) => r.status === "Đang dọn dẹp")
                    ?.count || 0}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Arrivals and Departures Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ArrivalsTable arrivals={arrivals} />
          <DeparturesTable departures={departures} />
        </div>
      </main>
    </div>
  );
}
