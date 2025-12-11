"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Search, Plus, Star, TrendingUp, AlertTriangle } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

const customers = [
  {
    id: "1",
    name: "Sarah Mitchell",
    email: "sarah.m@email.com",
    totalSpent: 892.5,
    visitCount: 45,
    lastVisit: new Date(Date.now() - 86400000),
    segment: "VIP",
  },
  {
    id: "2",
    name: "John Davidson",
    email: "john.d@email.com",
    totalSpent: 456.25,
    visitCount: 23,
    lastVisit: new Date(Date.now() - 172800000),
    segment: "Regular",
  },
  {
    id: "3",
    name: "Emily Chen",
    email: "emily.c@email.com",
    totalSpent: 234.0,
    visitCount: 12,
    lastVisit: new Date(Date.now() - 604800000),
    segment: "Regular",
  },
  {
    id: "4",
    name: "Michael Brown",
    email: "michael.b@email.com",
    totalSpent: 1245.75,
    visitCount: 67,
    lastVisit: new Date(),
    segment: "VIP",
  },
  {
    id: "5",
    name: "Jessica Wilson",
    email: "jessica.w@email.com",
    totalSpent: 89.5,
    visitCount: 5,
    lastVisit: new Date(Date.now() - 2592000000),
    segment: "At Risk",
  },
  {
    id: "6",
    name: "David Lee",
    email: "david.l@email.com",
    totalSpent: 45.0,
    visitCount: 2,
    lastVisit: new Date(Date.now() - 259200000),
    segment: "New",
  },
];

const segmentCounts = {
  vip: customers.filter((c) => c.segment === "VIP").length,
  regular: customers.filter((c) => c.segment === "Regular").length,
  new: customers.filter((c) => c.segment === "New").length,
  atRisk: customers.filter((c) => c.segment === "At Risk").length,
};

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-500">Track and engage with your customer base</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Customer
        </Button>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Customers</p>
                <p className="text-2xl font-bold">{customers.length}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">VIP Customers</p>
                <p className="text-2xl font-bold text-purple-600">{segmentCounts.vip}</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">New This Month</p>
                <p className="text-2xl font-bold text-green-600">{segmentCounts.new}</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">At Risk</p>
                <p className="text-2xl font-bold text-red-600">{segmentCounts.atRisk}</p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Customers</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Search customers..." className="pl-10" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3 font-medium text-gray-500">Customer</th>
                  <th className="pb-3 font-medium text-gray-500">Total Spent</th>
                  <th className="pb-3 font-medium text-gray-500">Visits</th>
                  <th className="pb-3 font-medium text-gray-500">Last Visit</th>
                  <th className="pb-3 font-medium text-gray-500">Segment</th>
                  <th className="pb-3 font-medium text-gray-500"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="py-4">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>
                            {customer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-sm text-gray-500">{customer.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 font-medium">{formatCurrency(customer.totalSpent)}</td>
                    <td className="py-4 text-gray-600">{customer.visitCount}</td>
                    <td className="py-4 text-gray-600">{formatDate(customer.lastVisit)}</td>
                    <td className="py-4">
                      <Badge
                        variant={
                          customer.segment === "VIP"
                            ? "info"
                            : customer.segment === "Regular"
                            ? "primary"
                            : customer.segment === "New"
                            ? "success"
                            : "warning"
                        }
                      >
                        {customer.segment}
                      </Badge>
                    </td>
                    <td className="py-4">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </td>
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
