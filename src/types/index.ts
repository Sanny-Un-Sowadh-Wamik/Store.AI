export interface User {
  id: string;
  email: string;
  name: string;
  businessName: string;
  businessType: BusinessType;
  plan: SubscriptionPlan;
  createdAt: Date;
}

export type BusinessType = "coffee_shop" | "boutique" | "convenience_store" | "restaurant" | "other";

export type SubscriptionPlan = "starter" | "growth" | "professional" | "enterprise";

export interface SalesData {
  id: string;
  date: Date;
  amount: number;
  transactionCount: number;
  averageTicket: number;
  topProducts: ProductSale[];
}

export interface ProductSale {
  id: string;
  name: string;
  quantity: number;
  revenue: number;
  category: string;
}

export interface DashboardMetrics {
  totalRevenue: number;
  revenueChange: number;
  transactionCount: number;
  transactionChange: number;
  averageTicket: number;
  ticketChange: number;
  customerCount: number;
  customerChange: number;
}

export interface ChartData {
  date: string;
  revenue: number;
  transactions: number;
  customers: number;
}

export interface Alert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  title: string;
  message: string;
  insight?: string;
  createdAt: Date;
  read: boolean;
  actionUrl?: string;
}

export type AlertType = "anomaly" | "opportunity" | "trend" | "inventory" | "performance";

export type AlertSeverity = "info" | "warning" | "critical" | "success";

export interface AIInsight {
  id: string;
  type: InsightType;
  title: string;
  summary: string;
  details: string;
  recommendations: string[];
  confidence: number;
  createdAt: Date;
  dataPoints: Record<string, number | string>;
}

export type InsightType = "trend" | "anomaly" | "forecast" | "recommendation" | "comparison";

export interface PricingPlan {
  id: SubscriptionPlan;
  name: string;
  price: number;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

export interface AnalyticsQuery {
  startDate: Date;
  endDate: Date;
  metrics: string[];
  groupBy?: "day" | "week" | "month";
  filters?: Record<string, string | number>;
}

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  reorderPoint: number;
  cost: number;
  price: number;
  category: string;
  lastRestocked: Date;
}

export interface Customer {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  totalSpent: number;
  visitCount: number;
  lastVisit: Date;
  segment: CustomerSegment;
}

export type CustomerSegment = "new" | "regular" | "vip" | "at_risk" | "churned";
