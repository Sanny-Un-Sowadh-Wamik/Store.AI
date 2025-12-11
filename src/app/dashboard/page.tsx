"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { MetricsCard } from "@/components/dashboard/metrics-card";
import { SalesChart } from "@/components/dashboard/sales-chart";
import { AIInsights } from "@/components/dashboard/ai-insights";
import { AlertCard } from "@/components/alerts/alert-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DollarSign, ShoppingCart, Users, TrendingUp } from "lucide-react";
import { getGreeting } from "@/lib/utils";
import type { DashboardMetrics, ChartData, Alert } from "@/types";

const mockChartData: ChartData[] = [
  { date: "Dec 4", revenue: 2100, transactions: 142, customers: 98 },
  { date: "Dec 5", revenue: 2350, transactions: 156, customers: 112 },
  { date: "Dec 6", revenue: 1890, transactions: 128, customers: 89 },
  { date: "Dec 7", revenue: 2780, transactions: 189, customers: 134 },
  { date: "Dec 8", revenue: 3200, transactions: 215, customers: 156 },
  { date: "Dec 9", revenue: 2950, transactions: 198, customers: 142 },
  { date: "Dec 10", revenue: 2847, transactions: 172, customers: 118 },
];

const mockMetrics: DashboardMetrics = {
  totalRevenue: 18117,
  revenueChange: 12.5,
  transactionCount: 1200,
  transactionChange: 8.3,
  averageTicket: 15.1,
  ticketChange: 4.2,
  customerCount: 849,
  customerChange: 6.7,
};

const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "opportunity",
    severity: "success",
    title: "Peak Hour Opportunity",
    message: "Your 7-9 AM rush generates 40% of daily revenue. Consider a breakfast bundle deal.",
    insight: "Adding a $5 coffee + pastry combo could increase morning revenue by 15%.",
    createdAt: new Date(),
    read: false,
  },
  {
    id: "2",
    type: "inventory",
    severity: "warning",
    title: "Low Stock Alert",
    message: "Oat milk inventory is below reorder point. 3 days supply remaining.",
    createdAt: new Date(Date.now() - 3600000),
    read: false,
    actionUrl: "/dashboard/inventory",
  },
  {
    id: "3",
    type: "trend",
    severity: "info",
    title: "Weekend Trend",
    message: "Saturday sales are consistently 35% higher than weekdays. Staff accordingly.",
    createdAt: new Date(Date.now() - 7200000),
    read: true,
  },
];

const mockInsights = `**Your Business is Growing!**

Based on your recent sales data, your store is showing strong performance with a **12.5% increase in revenue** compared to last week. Here's what's driving your success:

**Key Observations:**
- Your morning coffee rush (7-9 AM) is your strongest revenue period
- Weekend traffic is consistently higher than weekdays
- Average ticket size has increased, suggesting successful upselling

**Recommendations:**
- Consider extending weekend hours to capture more sales
- Add a loyalty program to increase customer retention
- Bundle popular items to increase average ticket further
- Stock up on your top 5 products before the weekend rush`;

export default function DashboardPage() {
  const { data: session } = useSession();
  const [insights, setInsights] = useState<string | null>(mockInsights);
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("7d");

  const refreshInsights = useCallback(async () => {
    setIsLoadingInsights(true);
    try {
      const response = await fetch(`/api/insights?days=${selectedPeriod.replace("d", "")}`);
      if (response.ok) {
        const data = await response.json();
        setInsights(data.insights);
      }
    } catch (error) {
      console.error("Failed to fetch insights:", error);
    } finally {
      setIsLoadingInsights(false);
    }
  }, [selectedPeriod]);

  useEffect(() => {
    // In production, fetch real data here
  }, [selectedPeriod]);

  const greeting = getGreeting();
  const userName = session?.user?.name?.split(" ")[0] || "there";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {greeting}, {userName}!
          </h1>
          <p className="text-gray-500">Here&apos;s how your store is performing</p>
        </div>
        <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <TabsList>
            <TabsTrigger value="7d">7 Days</TabsTrigger>
            <TabsTrigger value="30d">30 Days</TabsTrigger>
            <TabsTrigger value="90d">90 Days</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricsCard
          title="Total Revenue"
          value={mockMetrics.totalRevenue}
          change={mockMetrics.revenueChange}
          format="currency"
          icon={DollarSign}
          iconColor="bg-green-100 text-green-600"
        />
        <MetricsCard
          title="Transactions"
          value={mockMetrics.transactionCount}
          change={mockMetrics.transactionChange}
          icon={ShoppingCart}
          iconColor="bg-blue-100 text-blue-600"
        />
        <MetricsCard
          title="Avg. Ticket"
          value={mockMetrics.averageTicket}
          change={mockMetrics.ticketChange}
          format="currency"
          icon={TrendingUp}
          iconColor="bg-purple-100 text-purple-600"
        />
        <MetricsCard
          title="Customers"
          value={mockMetrics.customerCount}
          change={mockMetrics.customerChange}
          icon={Users}
          iconColor="bg-orange-100 text-orange-600"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart data={mockChartData} />
        </div>
        <div>
          <AIInsights
            insights={insights}
            isLoading={isLoadingInsights}
            onRefresh={refreshInsights}
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockAlerts.map((alert) => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onDismiss={(id) => console.log("Dismiss", id)}
                onAction={(id) => console.log("Action", id)}
              />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Latte", sales: 342, revenue: 1710 },
                { name: "Cappuccino", sales: 289, revenue: 1301 },
                { name: "Cold Brew", sales: 234, revenue: 1053 },
                { name: "Croissant", sales: 198, revenue: 594 },
                { name: "Bagel & Cream Cheese", sales: 156, revenue: 624 },
              ].map((product, index) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600">
                      {index + 1}
                    </span>
                    <span className="font-medium text-gray-900">{product.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">${product.revenue}</p>
                    <p className="text-sm text-gray-500">{product.sales} sold</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
