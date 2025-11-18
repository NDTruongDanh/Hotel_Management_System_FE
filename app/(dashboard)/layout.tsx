import * as React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { Navbar } from "@/components/navbar/navbar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="p-6 max-w-full overflow-hidden">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
