"use client";

import { RevenueByDayTable } from "./revenue-by-day-table";
import type { RevenueByMonthData } from "@/lib/types/reports";

interface RevenueByMonthReportProps {
  filteredRevenueByMonthData: RevenueByMonthData[];
}

export function RevenueByMonthReport({
  filteredRevenueByMonthData,
}: RevenueByMonthReportProps) {
  return (
    <div className="space-y-6">
      <RevenueByDayTable data={filteredRevenueByMonthData} />
    </div>
  );
}
