"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PricingPlan } from "@/types";

const plans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 49,
    description: "Perfect for small stores just getting started with analytics.",
    features: [
      "1 store location",
      "Basic sales analytics",
      "Weekly AI insights",
      "Email alerts",
      "30-day data history",
      "Email support",
    ],
    cta: "Start Free Trial",
  },
  {
    id: "growth",
    name: "Growth",
    price: 99,
    description: "For growing businesses that need deeper insights.",
    features: [
      "Up to 3 store locations",
      "Advanced analytics",
      "Daily AI insights",
      "Real-time alerts",
      "90-day data history",
      "Inventory tracking",
      "Customer segments",
      "Priority support",
    ],
    highlighted: true,
    cta: "Start Free Trial",
  },
  {
    id: "professional",
    name: "Professional",
    price: 199,
    description: "Full-featured solution for serious retailers.",
    features: [
      "Up to 10 store locations",
      "Premium analytics suite",
      "Unlimited AI insights",
      "Custom alerts",
      "1-year data history",
      "Advanced forecasting",
      "API access",
      "Phone support",
    ],
    cta: "Start Free Trial",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 499,
    description: "Custom solutions for large retail operations.",
    features: [
      "Unlimited locations",
      "White-label options",
      "Custom AI training",
      "Dedicated account manager",
      "Unlimited data history",
      "Custom integrations",
      "SLA guarantee",
      "24/7 support",
    ],
    cta: "Contact Sales",
  },
];

export function Pricing() {
  return (
    <section className="py-24 bg-white" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Start with a 14-day free trial. No credit card required. Choose the plan that fits your
            business.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={cn(
                "relative flex flex-col",
                plan.highlighted && "border-blue-500 shadow-xl scale-105"
              )}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-4 py-1">Most Popular</Badge>
                </div>
              )}
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription className="min-h-[48px]">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-500">/month</span>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/auth/register" className="mt-auto">
                  <Button
                    className="w-full"
                    variant={plan.highlighted ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
