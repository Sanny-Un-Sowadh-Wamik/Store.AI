import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { subDays, startOfDay, endOfDay } from "date-fns";

interface TopProduct {
  productId: string;
  _sum: {
    totalPrice: number | null;
    quantity: number | null;
  };
}

interface ProductDetail {
  id: string;
  name: string;
  category: string;
}

interface SaleItem {
  productId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const days = parseInt(request.nextUrl.searchParams.get("days") || "7");
    const limit = parseInt(request.nextUrl.searchParams.get("limit") || "50");
    const startDate = subDays(new Date(), days);

    const sales = await prisma.sale.findMany({
      where: {
        userId,
        createdAt: { gte: startDate },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        customer: true,
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    const todaySales = await prisma.sale.aggregate({
      where: {
        userId,
        createdAt: {
          gte: startOfDay(new Date()),
          lte: endOfDay(new Date()),
        },
      },
      _sum: { totalAmount: true },
      _count: true,
    });

    const topProducts = await prisma.saleItem.groupBy({
      by: ["productId"],
      where: {
        sale: {
          userId,
          createdAt: { gte: startDate },
        },
      },
      _sum: { totalPrice: true, quantity: true },
      orderBy: { _sum: { totalPrice: "desc" } },
      take: 10,
    });

    const productDetails = await prisma.product.findMany({
      where: {
        id: { in: topProducts.map((p: TopProduct) => p.productId) },
      },
    });

    const topProductsWithDetails = topProducts.map((p: TopProduct) => {
      const product = productDetails.find((pd: ProductDetail) => pd.id === p.productId);
      return {
        id: p.productId,
        name: product?.name || "Unknown",
        category: product?.category || "Other",
        revenue: p._sum.totalPrice || 0,
        quantity: p._sum.quantity || 0,
      };
    });

    return NextResponse.json({
      sales,
      todayTotal: todaySales._sum.totalAmount || 0,
      todayCount: todaySales._count,
      topProducts: topProductsWithDetails,
    });
  } catch (error) {
    console.error("Sales error:", error);
    return NextResponse.json(
      { error: "Failed to fetch sales" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { items, customerId, paymentMethod } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "At least one item is required" },
        { status: 400 }
      );
    }

    const totalAmount = items.reduce(
      (sum: number, item: SaleItem) => sum + item.totalPrice,
      0
    );

    const sale = await prisma.sale.create({
      data: {
        userId: session.user.id,
        customerId,
        totalAmount,
        paymentMethod: paymentMethod || "card",
        items: {
          create: items.map((item: SaleItem) => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.totalPrice,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    if (customerId) {
      await prisma.customer.update({
        where: { id: customerId },
        data: {
          totalSpent: { increment: totalAmount },
          visitCount: { increment: 1 },
          lastVisit: new Date(),
        },
      });
    }

    for (const item of items as SaleItem[]) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          quantity: { decrement: item.quantity },
        },
      });
    }

    return NextResponse.json({ sale }, { status: 201 });
  } catch (error) {
    console.error("Create sale error:", error);
    return NextResponse.json(
      { error: "Failed to create sale" },
      { status: 500 }
    );
  }
}
