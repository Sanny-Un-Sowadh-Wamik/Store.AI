"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn, formatCurrency, formatNumber, formatPercentage } from "@/lib/utils";
import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react";

interface MetricsCardProps {
  title: string;
  value: number;
  change: number;
  format?: "currency" | "number" | "percentage";
  icon: LucideIcon;
  iconColor?: string;
}

export function MetricsCard({
  title,
  value,
  change,
  format = "number",
  icon: Icon,
  iconColor = "bg-blue-100 text-blue-600",
}: MetricsCardProps) {
  const formatValue = (val: number) => {
    switch (format) {
      case "currency":
        return formatCurrency(val);
      case "percentage":
        return `${val.toFixed(1)}%`;
      default:
        return formatNumber(val);
    }
  };

  const isPositive = change >= 0;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{formatValue(value)}</p>
          </div>
          <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", iconColor)}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
        <div className="flex items-center mt-4">
          {isPositive ? (
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
          )}
          <span className={cn("text-sm font-medium", isPositive ? "text-green-600" : "text-red-600")}>
            {formatPercentage(change)}
          </span>
          <span className="text-sm text-gray-500 ml-2">vs last period</span>
        </div>
      </CardContent>
    </Card>
  );
}
