"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Download, Calendar } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const revenueData = [
  { date: "Mon", revenue: 2100, lastWeek: 1900 },
  { date: "Tue", revenue: 2350, lastWeek: 2100 },
  { date: "Wed", revenue: 1890, lastWeek: 2000 },
  { date: "Thu", revenue: 2780, lastWeek: 2400 },
  { date: "Fri", revenue: 3200, lastWeek: 2800 },
  { date: "Sat", revenue: 3950, lastWeek: 3500 },
  { date: "Sun", revenue: 2847, lastWeek: 2600 },
];

const hourlyData = [
  { hour: "6AM", sales: 120 },
  { hour: "7AM", sales: 450 },
  { hour: "8AM", sales: 680 },
  { hour: "9AM", sales: 520 },
  { hour: "10AM", sales: 380 },
  { hour: "11AM", sales: 420 },
  { hour: "12PM", sales: 580 },
  { hour: "1PM", sales: 450 },
  { hour: "2PM", sales: 320 },
  { hour: "3PM", sales: 380 },
  { hour: "4PM", sales: 420 },
  { hour: "5PM", sales: 350 },
  { hour: "6PM", sales: 280 },
];

const categoryData = [
  { name: "Coffee", value: 45, color: "#3b82f6" },
  { name: "Pastries", value: 25, color: "#10b981" },
  { name: "Sandwiches", value: 15, color: "#f59e0b" },
  { name: "Beverages", value: 10, color: "#8b5cf6" },
  { name: "Other", value: 5, color: "#6b7280" },
];

const paymentData = [
  { method: "Card", amount: 12500, percentage: 65 },
  { method: "Cash", amount: 4800, percentage: 25 },
  { method: "Mobile", amount: 1920, percentage: 10 },
];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("7d");
  const [compareWith, setCompareWith] = useState("lastWeek");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-500">Deep dive into your store performance</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={compareWith} onValueChange={setCompareWith}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Compare with" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lastWeek">Last week</SelectItem>
              <SelectItem value="lastMonth">Last month</SelectItem>
              <SelectItem value="lastYear">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Tabs value={period} onValueChange={setPeriod}>
            <TabsList>
              <TabsTrigger value="7d">7D</TabsTrigger>
              <TabsTrigger value="30d">30D</TabsTrigger>
              <TabsTrigger value="90d">90D</TabsTrigger>
              <TabsTrigger value="1y">1Y</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `$${v}`} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    name="This Week"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: "#3b82f6" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="lastWeek"
                    name="Last Week"
                    stroke="#9ca3af"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: "#9ca3af" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales by Hour</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="hour" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `$${v}`} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {categoryData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {paymentData.map((payment) => (
              <div key={payment.method} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{payment.method}</span>
                  <span className="font-medium">{formatCurrency(payment.amount)}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${payment.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-sm text-gray-500">Average Daily Revenue</p>
              <p className="text-2xl font-bold">$2,731</p>
              <p className="text-sm text-green-600">+8.3% vs last period</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Peak Sales Hour</p>
              <p className="text-2xl font-bold">8:00 AM</p>
              <p className="text-sm text-gray-600">$680 average</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Best Day</p>
              <p className="text-2xl font-bold">Saturday</p>
              <p className="text-sm text-gray-600">35% above average</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
