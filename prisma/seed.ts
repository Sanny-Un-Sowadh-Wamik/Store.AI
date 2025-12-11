import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { subDays } from "date-fns";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create demo user
  const passwordHash = await hash("demo123", 12);

  const user = await prisma.user.upsert({
    where: { email: "demo@store.ai" },
    update: {},
    create: {
      email: "demo@store.ai",
      passwordHash,
      name: "Demo User",
      businessName: "The Coffee Corner",
      businessType: "COFFEE_SHOP",
      plan: "GROWTH",
    },
  });

  console.log("Created user:", user.email);

  // Create products
  const products = await Promise.all([
    prisma.product.upsert({
      where: { userId_sku: { userId: user.id, sku: "COF-LAT" } },
      update: {},
      create: {
        userId: user.id,
        name: "Latte",
        sku: "COF-LAT",
        category: "Coffee",
        price: 5.0,
        cost: 1.5,
        quantity: 100,
        reorderPoint: 20,
      },
    }),
    prisma.product.upsert({
      where: { userId_sku: { userId: user.id, sku: "COF-CAP" } },
      update: {},
      create: {
        userId: user.id,
        name: "Cappuccino",
        sku: "COF-CAP",
        category: "Coffee",
        price: 4.5,
        cost: 1.25,
        quantity: 100,
        reorderPoint: 20,
      },
    }),
    prisma.product.upsert({
      where: { userId_sku: { userId: user.id, sku: "COF-CB" } },
      update: {},
      create: {
        userId: user.id,
        name: "Cold Brew",
        sku: "COF-CB",
        category: "Coffee",
        price: 4.5,
        cost: 1.0,
        quantity: 80,
        reorderPoint: 15,
      },
    }),
    prisma.product.upsert({
      where: { userId_sku: { userId: user.id, sku: "PST-CRO" } },
      update: {},
      create: {
        userId: user.id,
        name: "Croissant",
        sku: "PST-CRO",
        category: "Pastry",
        price: 3.0,
        cost: 1.0,
        quantity: 50,
        reorderPoint: 10,
      },
    }),
    prisma.product.upsert({
      where: { userId_sku: { userId: user.id, sku: "PST-BAG" } },
      update: {},
      create: {
        userId: user.id,
        name: "Bagel & Cream Cheese",
        sku: "PST-BAG",
        category: "Pastry",
        price: 4.0,
        cost: 1.5,
        quantity: 40,
        reorderPoint: 10,
      },
    }),
  ]);

  console.log("Created", products.length, "products");

  // Create daily metrics for last 30 days
  const metricsData = [];
  for (let i = 29; i >= 0; i--) {
    const date = subDays(new Date(), i);
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const baseRevenue = isWeekend ? 3500 : 2500;
    const variance = (Math.random() - 0.5) * 1000;

    metricsData.push({
      userId: user.id,
      date,
      totalRevenue: baseRevenue + variance,
      transactionCount: Math.floor((baseRevenue + variance) / 15),
      averageTicket: 15 + Math.random() * 5,
      customerCount: Math.floor((baseRevenue + variance) / 20),
      topProducts: JSON.stringify([
        { name: "Latte", quantity: Math.floor(Math.random() * 50 + 30) },
        { name: "Cappuccino", quantity: Math.floor(Math.random() * 40 + 20) },
        { name: "Cold Brew", quantity: Math.floor(Math.random() * 30 + 15) },
      ]),
    });
  }

  // Delete existing metrics and insert new ones
  await prisma.dailyMetrics.deleteMany({ where: { userId: user.id } });
  await prisma.dailyMetrics.createMany({ data: metricsData });

  console.log("Created", metricsData.length, "daily metrics");

  // Create alerts
  await prisma.alert.deleteMany({ where: { userId: user.id } });
  await prisma.alert.createMany({
    data: [
      {
        userId: user.id,
        type: "OPPORTUNITY",
        severity: "SUCCESS",
        title: "Peak Hour Opportunity",
        message: "Your 7-9 AM rush generates 40% of daily revenue. Consider a breakfast bundle deal.",
        insight: "Adding a $5 coffee + pastry combo could increase morning revenue by 15%.",
        read: false,
      },
      {
        userId: user.id,
        type: "INVENTORY",
        severity: "WARNING",
        title: "Low Stock Alert",
        message: "Oat milk inventory is below reorder point. 3 days supply remaining.",
        read: false,
        actionUrl: "/dashboard/inventory",
      },
      {
        userId: user.id,
        type: "TREND",
        severity: "INFO",
        title: "Weekend Trend",
        message: "Saturday sales are consistently 35% higher than weekdays. Staff accordingly.",
        read: true,
      },
    ],
  });

  console.log("Created alerts");

  // Create customers
  await prisma.customer.deleteMany({ where: { userId: user.id } });
  await prisma.customer.createMany({
    data: [
      {
        userId: user.id,
        name: "Sarah Mitchell",
        email: "sarah.m@email.com",
        totalSpent: 892.5,
        visitCount: 45,
        lastVisit: subDays(new Date(), 1),
        segment: "VIP",
      },
      {
        userId: user.id,
        name: "John Davidson",
        email: "john.d@email.com",
        totalSpent: 456.25,
        visitCount: 23,
        lastVisit: subDays(new Date(), 2),
        segment: "REGULAR",
      },
      {
        userId: user.id,
        name: "Emily Chen",
        email: "emily.c@email.com",
        totalSpent: 234.0,
        visitCount: 12,
        lastVisit: subDays(new Date(), 7),
        segment: "REGULAR",
      },
      {
        userId: user.id,
        name: "Michael Brown",
        email: "michael.b@email.com",
        totalSpent: 1245.75,
        visitCount: 67,
        lastVisit: new Date(),
        segment: "VIP",
      },
    ],
  });

  console.log("Created customers");

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
