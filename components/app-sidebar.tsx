"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ICONS } from "@/src/constants/icons.enum";
import { cn } from "@/lib/utils";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

// Navigation items based on page-description.md
const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: ICONS.DASHBOARD,
  },
];

const roomManagement = [
  {
    title: "Quản lý Phòng",
    url: "/rooms",
    icon: ICONS.BED_DOUBLE,
  },
  {
    title: "Loại Phòng",
    url: "/room-types",
    icon: ICONS.DOOR_OPEN,
  },
];

const bookingManagement = [
  {
    title: "Đặt Phòng",
    url: "/reservations",
    icon: ICONS.CALENDAR,
  },
  {
    title: "Check-in / Check-out",
    url: "/checkin-checkout",
    icon: ICONS.CLIPBOARD_LIST,
  },
];

const serviceManagement = [
  {
    title: "Dịch Vụ",
    url: "/services",
    icon: ICONS.UTENSILS,
  },
  {
    title: "Thanh Toán",
    url: "/payments",
    icon: ICONS.RECEIPT,
  },
];

const adminManagement = [
  {
    title: "Nhân Viên",
    url: "/staff",
    icon: ICONS.USER_COG,
  },
  {
    title: "Báo Cáo",
    url: "/reports",
    icon: ICONS.BAR_CHART,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b border-gray-200 bg-white">
        <div className="flex items-center gap-2 px-4 py-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-600 text-white">
            {ICONS.HOTEL}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-base font-semibold text-gray-900 truncate">
              Hotel System
            </span>
            <span className="text-xs text-gray-500 truncate">
              Quản lý khách sạn
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-gray-50">
        {/* Dashboard */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "transition-colors",
                        isActive
                          ? "bg-primary-600 text-white hover:bg-primary-600"
                          : "hover:bg-primary-50 hover:text-primary-600"
                      )}
                    >
                      <Link href={item.url}>
                        <span className="flex items-center gap-2">
                          {item.icon}
                          <span>{item.title}</span>
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Room Management */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Quản lý Phòng
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {roomManagement.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "transition-colors",
                        isActive
                          ? "bg-primary-600 text-white hover:bg-primary-600"
                          : "hover:bg-primary-50 hover:text-primary-600"
                      )}
                    >
                      <Link href={item.url}>
                        <span className="flex items-center gap-2">
                          {item.icon}
                          <span>{item.title}</span>
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Booking Management */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Đặt Phòng & Check-in/out
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {bookingManagement.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "transition-colors",
                        isActive
                          ? "bg-primary-600 text-white hover:bg-primary-600"
                          : "hover:bg-primary-50 hover:text-primary-600"
                      )}
                    >
                      <Link href={item.url}>
                        <span className="flex items-center gap-2">
                          {item.icon}
                          <span>{item.title}</span>
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Service & Payment */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Dịch Vụ & Thanh Toán
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {serviceManagement.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "transition-colors",
                        isActive
                          ? "bg-primary-600 text-white hover:bg-primary-600"
                          : "hover:bg-primary-50 hover:text-primary-600"
                      )}
                    >
                      <Link href={item.url}>
                        <span className="flex items-center gap-2">
                          {item.icon}
                          <span>{item.title}</span>
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Admin */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Quản Trị
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminManagement.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "transition-colors",
                        isActive
                          ? "bg-primary-600 text-white hover:bg-primary-600"
                          : "hover:bg-primary-50 hover:text-primary-600"
                      )}
                    >
                      <Link href={item.url}>
                        <span className="flex items-center gap-2">
                          {item.icon}
                          <span>{item.title}</span>
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200 bg-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="hover:bg-error-100 hover:text-error-600 transition-colors"
            >
              <Link href="/logout">
                <span className="flex items-center gap-2">
                  {ICONS.LOGOUT}
                  <span>Đăng Xuất</span>
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
