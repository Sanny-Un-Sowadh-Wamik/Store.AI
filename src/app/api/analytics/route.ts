import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { format, subDays } from "date-fns";

// Mock data for development
const generateMockData = (days: number) => {
  const data = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = subDays(new Date(), i);
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const baseRevenue = isWeekend ? 3500 : 2500;
    const variance = (Math.random() - 0.5) * 1000;
    data.push({
      date: format(date, "MMM d"),
      revenue: Math.round(baseRevenue + variance),
      transactions: Math.floor((baseRevenue + variance) / 15),
      customers: Math.floor((baseRevenue + variance) / 20),
    });
  }
  return data;
};

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const days = parseInt(request.nextUrl.searchParams.get("days") || "30");
    const chartData = generateMockData(days);

    const totalRevenue = chartData.reduce((sum, d) => sum + d.revenue, 0);
    const transactionCount = chartData.reduce((sum, d) => sum + d.transactions, 0);
    const customerCount = chartData.reduce((sum, d) => sum + d.customers, 0);
    const averageTicket = transactionCount > 0 ? totalRevenue / transactionCount : 0;

    // Simulate comparison with previous period
    const revenueChange = 12.5 + (Math.random() - 0.5) * 10;
    const transactionChange = 8.3 + (Math.random() - 0.5) * 8;
    const ticketChange = 4.2 + (Math.random() - 0.5) * 5;
    const customerChange = 6.7 + (Math.random() - 0.5) * 6;

    const summary = {
      totalRevenue,
      revenueChange,
      transactionCount,
      transactionChange,
      averageTicket,
      ticketChange,
      customerCount,
      customerChange,
    };

    return NextResponse.json({
      summary,
      chartData,
      period: { start: subDays(new Date(), days), end: new Date(), days },
    });
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
