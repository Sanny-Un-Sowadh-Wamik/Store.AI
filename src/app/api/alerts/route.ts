import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Mock alerts for development
const mockAlerts = [
  {
    id: "1",
    type: "OPPORTUNITY",
    severity: "SUCCESS",
    title: "Peak Hour Opportunity",
    message: "Your 7-9 AM rush generates 40% of daily revenue. Consider a breakfast bundle deal.",
    insight: "Adding a $5 coffee + pastry combo could increase morning revenue by 15%.",
    read: false,
    createdAt: new Date(),
  },
  {
    id: "2",
    type: "INVENTORY",
    severity: "WARNING",
    title: "Low Stock Alert",
    message: "Oat milk inventory is below reorder point. 3 days supply remaining.",
    read: false,
    actionUrl: "/dashboard/inventory",
    createdAt: new Date(Date.now() - 3600000),
  },
  {
    id: "3",
    type: "TREND",
    severity: "INFO",
    title: "Weekend Trend",
    message: "Saturday sales are consistently 35% higher than weekdays. Staff accordingly.",
    read: true,
    createdAt: new Date(Date.now() - 86400000),
  },
];

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const unreadOnly = request.nextUrl.searchParams.get("unread") === "true";
    const alerts = unreadOnly ? mockAlerts.filter((a) => !a.read) : mockAlerts;
    const unreadCount = mockAlerts.filter((a) => !a.read).length;

    return NextResponse.json({ alerts, unreadCount });
  } catch (error) {
    console.error("Alerts error:", error);
    return NextResponse.json(
      { error: "Failed to fetch alerts" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { alertId, read } = body;

    if (!alertId) {
      return NextResponse.json({ error: "Alert ID required" }, { status: 400 });
    }

    // Mock update
    const alert = mockAlerts.find((a) => a.id === alertId);
    if (alert) {
      alert.read = read;
    }

    return NextResponse.json({ alert });
  } catch (error) {
    console.error("Alert update error:", error);
    return NextResponse.json(
      { error: "Failed to update alert" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const alertId = request.nextUrl.searchParams.get("id");

    if (!alertId) {
      return NextResponse.json({ error: "Alert ID required" }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Alert delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete alert" },
      { status: 500 }
    );
  }
}
