import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Mock sales data for development
const mockSales = [
  {
    id: "1",
    items: [{ product: { name: "Latte" } }, { product: { name: "Croissant" } }],
    totalAmount: 8.5,
    paymentMethod: "Card",
    createdAt: new Date(),
    customer: null,
  },
  {
    id: "2",
    items: [
      { product: { name: "Cappuccino" } },
      { product: { name: "Muffin" } },
      { product: { name: "Cold Brew" } },
    ],
    totalAmount: 14.25,
    paymentMethod: "Card",
    createdAt: new Date(Date.now() - 900000),
    customer: { name: "John D." },
  },
  {
    id: "3",
    items: [{ product: { name: "Espresso" } }],
    totalAmount: 3.5,
    paymentMethod: "Cash",
    createdAt: new Date(Date.now() - 1800000),
    customer: null,
  },
];

const mockTopProducts = [
  { id: "1", name: "Latte", category: "Coffee", revenue: 1710, quantity: 342 },
  { id: "2", name: "Cappuccino", category: "Coffee", revenue: 1301, quantity: 289 },
  { id: "3", name: "Cold Brew", category: "Coffee", revenue: 1053, quantity: 234 },
  { id: "4", name: "Croissant", category: "Pastry", revenue: 594, quantity: 198 },
  { id: "5", name: "Bagel", category: "Pastry", revenue: 624, quantity: 156 },
];

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({
      sales: mockSales,
      todayTotal: 2847,
      todayCount: 156,
      topProducts: mockTopProducts,
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
    const { items } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "At least one item is required" },
        { status: 400 }
      );
    }

    // Mock sale creation
    const sale = {
      id: `sale_${Date.now()}`,
      items,
      totalAmount: items.reduce((sum: number, item: { totalPrice: number }) => sum + item.totalPrice, 0),
      createdAt: new Date(),
    };

    return NextResponse.json({ sale }, { status: 201 });
  } catch (error) {
    console.error("Create sale error:", error);
    return NextResponse.json(
      { error: "Failed to create sale" },
      { status: 500 }
    );
  }
}
