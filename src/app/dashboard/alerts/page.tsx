"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AlertCard } from "@/components/alerts/alert-card";
import { Bell, Settings, Check } from "lucide-react";
import type { Alert } from "@/types";

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
    type: "anomaly",
    severity: "critical",
    title: "Unusual Sales Drop",
    message: "Sales dropped 45% compared to same time last week. Investigate potential issues.",
    createdAt: new Date(Date.now() - 7200000),
    read: false,
  },
  {
    id: "4",
    type: "trend",
    severity: "info",
    title: "Weekend Trend",
    message: "Saturday sales are consistently 35% higher than weekdays. Staff accordingly.",
    createdAt: new Date(Date.now() - 86400000),
    read: true,
  },
  {
    id: "5",
    type: "performance",
    severity: "success",
    title: "Record Sales Day",
    message: "Yesterday was your best sales day this month! Revenue was $3,456.",
    createdAt: new Date(Date.now() - 172800000),
    read: true,
  },
];

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [filter, setFilter] = useState("all");

  const unreadCount = alerts.filter((a) => !a.read).length;

  const filteredAlerts = alerts.filter((alert) => {
    if (filter === "unread") return !alert.read;
    if (filter === "all") return true;
    return alert.type === filter;
  });

  const handleDismiss = (id: string) => {
    setAlerts(alerts.filter((a) => a.id !== id));
  };

  const handleMarkAllRead = () => {
    setAlerts(alerts.map((a) => ({ ...a, read: true })));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Alerts</h1>
          <p className="text-gray-500">
            Stay informed about important events and opportunities
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={handleMarkAllRead} disabled={unreadCount === 0}>
            <Check className="w-4 h-4 mr-2" />
            Mark all read
          </Button>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-gray-500" />
                  <CardTitle>All Alerts</CardTitle>
                  {unreadCount > 0 && (
                    <Badge variant="danger">{unreadCount} new</Badge>
                  )}
                </div>
                <Tabs value={filter} onValueChange={setFilter}>
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="unread">Unread</TabsTrigger>
                    <TabsTrigger value="opportunity">Opportunities</TabsTrigger>
                    <TabsTrigger value="inventory">Inventory</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredAlerts.length === 0 ? (
                <div className="text-center py-12">
                  <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No alerts to display</p>
                </div>
              ) : (
                filteredAlerts.map((alert) => (
                  <AlertCard
                    key={alert.id}
                    alert={alert}
                    onDismiss={handleDismiss}
                    onAction={(id) => console.log("Action:", id)}
                  />
                ))
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Alert Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total alerts</span>
                <span className="font-semibold">{alerts.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Unread</span>
                <span className="font-semibold text-red-600">{unreadCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">This week</span>
                <span className="font-semibold">12</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">By Type</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { type: "Opportunities", count: 5, color: "bg-green-500" },
                { type: "Inventory", count: 3, color: "bg-yellow-500" },
                { type: "Anomalies", count: 2, color: "bg-red-500" },
                { type: "Trends", count: 4, color: "bg-purple-500" },
                { type: "Performance", count: 3, color: "bg-blue-500" },
              ].map((item) => (
                <div key={item.type} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="text-sm text-gray-600">{item.type}</span>
                  </div>
                  <span className="text-sm font-medium">{item.count}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Alert Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p className="text-gray-600">
                Customize which alerts you receive and how you&apos;re notified.
              </p>
              <Button variant="outline" className="w-full">
                <Settings className="w-4 h-4 mr-2" />
                Configure Alerts
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
