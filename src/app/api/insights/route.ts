import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { generateInsights, type InsightRequest } from "@/lib/anthropic";
import prisma from "@/lib/prisma";
import { subDays, format } from "date-fns";

interface DailyMetric {
  totalRevenue: number;
  transactionCount: number;
  customerCount: number;
  averageTicket: number;
  date: Date;
}

interface AlertRecord {
  type: string;
  message: string;
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const days = parseInt(request.nextUrl.searchParams.get("days") || "7");

    const startDate = subDays(new Date(), days);

    const metrics = await prisma.dailyMetrics.findMany({
      where: {
        userId,
        date: { gte: startDate },
      },
      orderBy: { date: "asc" },
    });

    const alerts = await prisma.alert.findMany({
      where: {
        userId,
        createdAt: { gte: startDate },
      },
      take: 5,
      orderBy: { createdAt: "desc" },
    });

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const totalRevenue = metrics.reduce((sum: number, m: DailyMetric) => sum + m.totalRevenue, 0);
    const transactionCount = metrics.reduce((sum: number, m: DailyMetric) => sum + m.transactionCount, 0);
    const customerCount = metrics.reduce((sum: number, m: DailyMetric) => sum + m.customerCount, 0);

    const previousMetrics = await prisma.dailyMetrics.findMany({
      where: {
        userId,
        date: {
          gte: subDays(startDate, days),
          lt: startDate,
        },
      },
    });

    const previousRevenue = previousMetrics.reduce((sum: number, m: DailyMetric) => sum + m.totalRevenue, 0);
    const revenueChange = previousRevenue > 0
      ? ((totalRevenue - previousRevenue) / previousRevenue) * 100
      : 0;

    const insightData: InsightRequest = {
      salesData: metrics.map((m: DailyMetric) => ({
        date: format(m.date, "MMM d"),
        revenue: m.totalRevenue,
        transactions: m.transactionCount,
        averageTicket: m.averageTicket,
      })),
      businessType: user.businessType,
      currentMetrics: {
        totalRevenue,
        revenueChange,
        transactionCount,
        customerCount,
      },
      alerts: alerts.map((a: AlertRecord) => ({
        type: a.type,
        message: a.message,
      })),
    };

    const insights = await generateInsights(insightData);

    await prisma.insight.create({
      data: {
        userId,
        type: "RECOMMENDATION",
        title: "Weekly Performance Analysis",
        summary: insights.substring(0, 200),
        details: insights,
        recommendations: [],
        confidence: 0.85,
        dataPoints: insightData.currentMetrics,
      },
    });

    return NextResponse.json({ insights });
  } catch (error) {
    console.error("Insights error:", error);
    return NextResponse.json(
      { error: "Failed to generate insights" },
      { status: 500 }
    );
  }
}
