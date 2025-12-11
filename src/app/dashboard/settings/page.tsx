"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Building2, Bell, CreditCard, Shield, Sparkles } from "lucide-react";

const plans = [
  { id: "starter", name: "Starter", price: 49, current: true },
  { id: "growth", name: "Growth", price: 99, current: false },
  { id: "professional", name: "Professional", price: 199, current: false },
  { id: "enterprise", name: "Enterprise", price: 499, current: false },
];

export default function SettingsPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500">Manage your account and preferences</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile" className="flex items-center">
            <User className="w-4 h-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="business" className="flex items-center">
            <Building2 className="w-4 h-4 mr-2" />
            Business
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center">
            <CreditCard className="w-4 h-4 mr-2" />
            Billing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Input label="Full name" defaultValue={session?.user?.name || ""} />
                <Input label="Email" type="email" defaultValue={session?.user?.email || ""} />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <Input label="Phone number" type="tel" placeholder="+1 (555) 123-4567" />
                <Input label="Timezone" defaultValue="America/New_York" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Input label="Current password" type="password" />
                <div />
                <Input label="New password" type="password" />
                <Input label="Confirm new password" type="password" />
              </div>
              <Button>Update Password</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="business">
          <Card>
            <CardHeader>
              <CardTitle>Business Details</CardTitle>
              <CardDescription>Information about your store</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Business name"
                  defaultValue={session?.user?.businessName || "My Store"}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business type
                  </label>
                  <Select defaultValue="coffee_shop">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="coffee_shop">Coffee Shop</SelectItem>
                      <SelectItem value="boutique">Boutique</SelectItem>
                      <SelectItem value="convenience_store">Convenience Store</SelectItem>
                      <SelectItem value="restaurant">Restaurant</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <Input label="Address" placeholder="123 Main St" />
                <Input label="City" placeholder="New York" />
                <Input label="State/Province" placeholder="NY" />
                <Input label="ZIP/Postal Code" placeholder="10001" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                {
                  title: "Daily Summary",
                  description: "Receive a daily email with your store's performance",
                },
                {
                  title: "Inventory Alerts",
                  description: "Get notified when items are running low",
                },
                {
                  title: "AI Insights",
                  description: "Receive new AI-generated insights and recommendations",
                },
                {
                  title: "Anomaly Detection",
                  description: "Alert when unusual patterns are detected",
                },
                {
                  title: "Weekly Report",
                  description: "Get a comprehensive weekly performance report",
                },
              ].map((notification) => (
                <div
                  key={notification.title}
                  className="flex items-center justify-between py-3 border-b last:border-0"
                >
                  <div>
                    <p className="font-medium text-gray-900">{notification.title}</p>
                    <p className="text-sm text-gray-500">{notification.description}</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-5 w-5"
                  />
                </div>
              ))}
              <Button>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Current Plan</CardTitle>
                  <CardDescription>Manage your subscription</CardDescription>
                </div>
                <Badge variant="primary" className="flex items-center">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Starter
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`p-4 rounded-lg border-2 ${
                      plan.current
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <h4 className="font-medium">{plan.name}</h4>
                    <p className="text-2xl font-bold mt-1">
                      ${plan.price}
                      <span className="text-sm font-normal text-gray-500">/mo</span>
                    </p>
                    {plan.current ? (
                      <Badge variant="success" className="mt-2">
                        Current
                      </Badge>
                    ) : (
                      <Button variant="outline" size="sm" className="mt-2">
                        Upgrade
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Manage your payment information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium">•••• •••• •••• 4242</p>
                    <p className="text-sm text-gray-500">Expires 12/25</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Update
                </Button>
              </div>
              <Button variant="outline">Add Payment Method</Button>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { date: "Dec 1, 2024", amount: 49, status: "Paid" },
                  { date: "Nov 1, 2024", amount: 49, status: "Paid" },
                  { date: "Oct 1, 2024", amount: 49, status: "Paid" },
                ].map((invoice, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div>
                      <p className="font-medium">{invoice.date}</p>
                      <p className="text-sm text-gray-500">Starter Plan</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${invoice.amount}</p>
                      <Badge variant="success">{invoice.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
