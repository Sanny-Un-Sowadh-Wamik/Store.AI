import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { subDays, format } from "date-fns";

interface DailyMetric {
  totalRevenue: number;
  transactionCount: number;
  customerCount: number;
  date: Date;
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const days = parseInt(request.nextUrl.searchParams.get("days") || "30");
    const startDate = subDays(new Date(), days);

    const metrics = await prisma.dailyMetrics.findMany({
      where: {
        userId,
        date: { gte: startDate },
      },
      orderBy: { date: "asc" },
    });

    const previousStartDate = subDays(startDate, days);
    const previousMetrics = await prisma.dailyMetrics.findMany({
      where: {
        userId,
        date: {
          gte: previousStartDate,
          lt: startDate,
        },
      },
    });

    const currentTotals = {
      totalRevenue: metrics.reduce((sum: number, m: DailyMetric) => sum + m.totalRevenue, 0),
      transactionCount: metrics.reduce((sum: number, m: DailyMetric) => sum + m.transactionCount, 0),
      customerCount: metrics.reduce((sum: number, m: DailyMetric) => sum + m.customerCount, 0),
    };

    const previousTotals = {
      totalRevenue: previousMetrics.reduce((sum: number, m: DailyMetric) => sum + m.totalRevenue, 0),
      transactionCount: previousMetrics.reduce((sum: number, m: DailyMetric) => sum + m.transactionCount, 0),
      customerCount: previousMetrics.reduce((sum: number, m: DailyMetric) => sum + m.customerCount, 0),
    };

    const calculateChange = (current: number, previous: number) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return ((current - previous) / previous) * 100;
    };

    const averageTicket = currentTotals.transactionCount > 0
      ? currentTotals.totalRevenue / currentTotals.transactionCount
      : 0;
    const previousAverageTicket = previousTotals.transactionCount > 0
      ? previousTotals.totalRevenue / previousTotals.transactionCount
      : 0;

    const summary = {
      totalRevenue: currentTotals.totalRevenue,
      revenueChange: calculateChange(currentTotals.totalRevenue, previousTotals.totalRevenue),
      transactionCount: currentTotals.transactionCount,
      transactionChange: calculateChange(currentTotals.transactionCount, previousTotals.transactionCount),
      averageTicket,
      ticketChange: calculateChange(averageTicket, previousAverageTicket),
      customerCount: currentTotals.customerCount,
      customerChange: calculateChange(currentTotals.customerCount, previousTotals.customerCount),
    };

    const chartData = metrics.map((m: DailyMetric) => ({
      date: format(m.date, "MMM d"),
      revenue: m.totalRevenue,
      transactions: m.transactionCount,
      customers: m.customerCount,
    }));

    return NextResponse.json({
      summary,
      chartData,
      period: { start: startDate, end: new Date(), days },
    });
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
