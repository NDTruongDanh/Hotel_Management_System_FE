"use client";

import { CustomerStatistics } from "@/lib/types/customer";
import { ICONS } from "@/src/constants/icons.enum";

interface CustomerStatisticsCardsProps {
  statistics: CustomerStatistics;
}

export function CustomerStatisticsCards({
  statistics,
}: CustomerStatisticsCardsProps) {
  const cards = [
    {
      title: "Tổng khách hàng",
      value: statistics.totalCustomers,
      icon: ICONS.USERS,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Khách VIP",
      value: statistics.vipCustomers,
      icon: ICONS.STAR,
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      title: "Khách hoạt động",
      value: statistics.activeCustomers,
      icon: ICONS.USER_CHECK,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Khách mới tháng này",
      value: statistics.newCustomersThisMonth,
      icon: ICONS.USER_PLUS,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-lg border border-gray-300 shadow-sm p-5"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{card.title}</p>
              <p className="text-3xl font-bold text-gray-900">{card.value}</p>
            </div>
            <div className={`p-3 rounded-lg ${card.bgColor}`}>
              <span className={`w-6 h-6 ${card.iconColor}`}>{card.icon}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
