"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Bell, BarChart3, TrendingUp, Shield, Zap } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Natural Language Insights",
    description:
      "Claude AI analyzes your data and explains trends in plain English. No more confusing charts — just clear, actionable advice.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Bell,
    title: "Automated Alerts",
    description:
      "Get real-time notifications about anomalies, opportunities, and trends. Never miss a chance to optimize your business.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: BarChart3,
    title: "Visual Analytics",
    description:
      "Beautiful, easy-to-understand dashboards that show you exactly how your business is performing at a glance.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: TrendingUp,
    title: "Sales Forecasting",
    description:
      "AI-powered predictions help you plan inventory, staffing, and promotions based on expected demand.",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "Your data is encrypted and never shared. We're SOC 2 compliant and take security seriously.",
    color: "bg-red-100 text-red-600",
  },
  {
    icon: Zap,
    title: "Quick Setup",
    description:
      "Connect your POS system in minutes. No technical expertise required — we handle the integration.",
    color: "bg-yellow-100 text-yellow-600",
  },
];

export function Features() {
  return (
    <section className="py-24 bg-gray-50" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Grow Your Store
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Powerful features designed specifically for independent retail stores, coffee shops,
            boutiques, and restaurants.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
