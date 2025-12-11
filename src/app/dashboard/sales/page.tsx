"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DollarSign, Search, Download, Plus, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { formatCurrency, formatDate, formatTime } from "@/lib/utils";

const recentSales = [
  {
    id: "1",
    items: ["Latte", "Croissant"],
    total: 8.5,
    payment: "Card",
    time: new Date(),
    customer: "Walk-in",
  },
  {
    id: "2",
    items: ["Cappuccino", "Muffin", "Cold Brew"],
    total: 14.25,
    payment: "Card",
    time: new Date(Date.now() - 900000),
    customer: "John D.",
  },
  {
    id: "3",
    items: ["Espresso"],
    total: 3.5,
    payment: "Cash",
    time: new Date(Date.now() - 1800000),
    customer: "Walk-in",
  },
  {
    id: "4",
    items: ["Latte", "Bagel & Cream Cheese"],
    total: 9.75,
    payment: "Mobile",
    time: new Date(Date.now() - 2700000),
    customer: "Sarah M.",
  },
  {
    id: "5",
    items: ["Cold Brew", "Cookie"],
    total: 7.0,
    payment: "Card",
    time: new Date(Date.now() - 3600000),
    customer: "Walk-in",
  },
];

export default function SalesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales</h1>
          <p className="text-gray-500">Track and manage your transactions</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Sale
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Today&apos;s Sales</p>
                <p className="text-2xl font-bold">$2,847</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm text-green-600">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              +12.5% from yesterday
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Transactions</p>
                <p className="text-2xl font-bold">156</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm text-green-600">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              +8.3% from yesterday
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg. Ticket</p>
                <p className="text-2xl font-bold">$18.25</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm text-green-600">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              +4.2% from yesterday
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Refunds</p>
                <p className="text-2xl font-bold">$24</p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-red-600" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm text-red-600">
              <ArrowDownRight className="w-4 h-4 mr-1" />
              2 refunds today
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Transactions</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Search transactions..." className="pl-10" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3 font-medium text-gray-500">Time</th>
                  <th className="pb-3 font-medium text-gray-500">Items</th>
                  <th className="pb-3 font-medium text-gray-500">Customer</th>
                  <th className="pb-3 font-medium text-gray-500">Payment</th>
                  <th className="pb-3 font-medium text-gray-500 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentSales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-gray-50">
                    <td className="py-4">
                      <p className="font-medium">{formatTime(sale.time)}</p>
                      <p className="text-sm text-gray-500">{formatDate(sale.time)}</p>
                    </td>
                    <td className="py-4">
                      <p className="font-medium">{sale.items.join(", ")}</p>
                      <p className="text-sm text-gray-500">{sale.items.length} items</p>
                    </td>
                    <td className="py-4 text-gray-600">{sale.customer}</td>
                    <td className="py-4">
                      <Badge
                        variant={
                          sale.payment === "Card"
                            ? "primary"
                            : sale.payment === "Cash"
                            ? "success"
                            : "info"
                        }
                      >
                        {sale.payment}
                      </Badge>
                    </td>
                    <td className="py-4 text-right font-medium">{formatCurrency(sale.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
