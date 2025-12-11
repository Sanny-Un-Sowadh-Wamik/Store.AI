// Mock Prisma client for development without database
// Replace with actual PrismaClient when database is configured

interface MockUser {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  businessName: string;
  businessType: string;
  plan: string;
  createdAt: Date;
  updatedAt: Date;
}

interface MockPrisma {
  user: {
    findUnique: (args: { where: { email?: string; id?: string } }) => Promise<MockUser | null>;
    findFirst: (args: { where: { email?: string; id?: string } }) => Promise<MockUser | null>;
    create: (args: { data: Partial<MockUser> }) => Promise<MockUser>;
  };
  dailyMetrics: {
    findMany: (args: unknown) => Promise<unknown[]>;
    deleteMany: (args: unknown) => Promise<{ count: number }>;
    createMany: (args: unknown) => Promise<{ count: number }>;
  };
  alert: {
    findMany: (args: unknown) => Promise<unknown[]>;
    count: (args: unknown) => Promise<number>;
    update: (args: unknown) => Promise<unknown>;
    delete: (args: unknown) => Promise<unknown>;
    findFirst: (args: unknown) => Promise<unknown | null>;
    deleteMany: (args: unknown) => Promise<{ count: number }>;
    createMany: (args: unknown) => Promise<{ count: number }>;
  };
  insight: {
    create: (args: unknown) => Promise<unknown>;
  };
  sale: {
    findMany: (args: unknown) => Promise<unknown[]>;
    aggregate: (args: unknown) => Promise<{ _sum: { totalAmount: number | null }; _count: number }>;
    create: (args: unknown) => Promise<unknown>;
  };
  saleItem: {
    groupBy: (args: unknown) => Promise<unknown[]>;
  };
  product: {
    findMany: (args: unknown) => Promise<unknown[]>;
    update: (args: unknown) => Promise<unknown>;
    upsert: (args: unknown) => Promise<unknown>;
  };
  customer: {
    update: (args: unknown) => Promise<unknown>;
    deleteMany: (args: unknown) => Promise<{ count: number }>;
    createMany: (args: unknown) => Promise<{ count: number }>;
  };
}

// In-memory store for development
const users: MockUser[] = [];

const mockPrisma: MockPrisma = {
  user: {
    findUnique: async ({ where }) => {
      if (where.email) {
        return users.find((u) => u.email === where.email) || null;
      }
      if (where.id) {
        return users.find((u) => u.id === where.id) || null;
      }
      return null;
    },
    findFirst: async ({ where }) => {
      if (where.email) {
        return users.find((u) => u.email === where.email) || null;
      }
      return null;
    },
    create: async ({ data }) => {
      const user: MockUser = {
        id: `user_${Date.now()}`,
        email: data.email || "",
        passwordHash: data.passwordHash || "",
        name: data.name || "",
        businessName: data.businessName || "",
        businessType: data.businessType || "OTHER",
        plan: data.plan || "STARTER",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      users.push(user);
      return user;
    },
  },
  dailyMetrics: {
    findMany: async () => [],
    deleteMany: async () => ({ count: 0 }),
    createMany: async () => ({ count: 0 }),
  },
  alert: {
    findMany: async () => [],
    count: async () => 0,
    update: async () => ({}),
    delete: async () => ({}),
    findFirst: async () => null,
    deleteMany: async () => ({ count: 0 }),
    createMany: async () => ({ count: 0 }),
  },
  insight: {
    create: async () => ({}),
  },
  sale: {
    findMany: async () => [],
    aggregate: async () => ({ _sum: { totalAmount: null }, _count: 0 }),
    create: async () => ({}),
  },
  saleItem: {
    groupBy: async () => [],
  },
  product: {
    findMany: async () => [],
    update: async () => ({}),
    upsert: async () => ({}),
  },
  customer: {
    update: async () => ({}),
    deleteMany: async () => ({ count: 0 }),
    createMany: async () => ({ count: 0 }),
  },
};

// Try to use real Prisma if available, otherwise use mock
let prisma: MockPrisma;

try {
  // Attempt to load the real Prisma client
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { PrismaClient } = require("@prisma/client");
  const globalForPrisma = globalThis as unknown as { prisma: typeof PrismaClient | undefined };
  prisma = globalForPrisma.prisma ?? new PrismaClient();
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
  }
} catch {
  // Fall back to mock if Prisma is not available
  console.warn("Prisma client not available, using mock data");
  prisma = mockPrisma;
}

export { prisma };
export default prisma;
