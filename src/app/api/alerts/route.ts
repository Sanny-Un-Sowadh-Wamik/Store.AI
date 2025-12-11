import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const limit = parseInt(request.nextUrl.searchParams.get("limit") || "10");
    const unreadOnly = request.nextUrl.searchParams.get("unread") === "true";

    const alerts = await prisma.alert.findMany({
      where: {
        userId: session.user.id,
        ...(unreadOnly && { read: false }),
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    const unreadCount = await prisma.alert.count({
      where: {
        userId: session.user.id,
        read: false,
      },
    });

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

    const alert = await prisma.alert.findFirst({
      where: {
        id: alertId,
        userId: session.user.id,
      },
    });

    if (!alert) {
      return NextResponse.json({ error: "Alert not found" }, { status: 404 });
    }

    const updatedAlert = await prisma.alert.update({
      where: { id: alertId },
      data: { read },
    });

    return NextResponse.json({ alert: updatedAlert });
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

    const alert = await prisma.alert.findFirst({
      where: {
        id: alertId,
        userId: session.user.id,
      },
    });

    if (!alert) {
      return NextResponse.json({ error: "Alert not found" }, { status: 404 });
    }

    await prisma.alert.delete({
      where: { id: alertId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Alert delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete alert" },
      { status: 500 }
    );
  }
}
