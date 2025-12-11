# Store.AI

AI-Powered Retail Analytics Platform for Independent Stores

## Overview

Store.AI transforms your sales data into actionable insights using Claude AI. Designed specifically for independent retail stores with $500K-$5M annual revenue, including coffee shops, boutiques, convenience stores, and restaurants.

### Key Features

- **Natural Language Insights** - Claude AI explains trends in plain English, no data science degree required
- **Automated Alerts** - Real-time notifications for anomalies and opportunities
- **Visual Analytics** - Beautiful dashboards showing your store's performance
- **Sales Tracking** - Monitor transactions, revenue, and top products
- **Inventory Management** - Track stock levels and get low-stock alerts
- **Customer Insights** - Understand your customer segments and behavior

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **AI**: Anthropic Claude API
- **Authentication**: NextAuth.js
- **Charts**: Recharts
- **UI Components**: Radix UI

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Anthropic API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-org/store-ai.git
cd store-ai
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/storeai"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
ANTHROPIC_API_KEY="your-anthropic-api-key"
```

4. Set up the database:
```bash
npm run db:generate
npm run db:push
```

5. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   └── pricing/           # Pricing page
├── components/            # React components
│   ├── alerts/           # Alert components
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard components
│   ├── landing/          # Landing page components
│   └── ui/               # Reusable UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and configurations
│   ├── anthropic.ts      # Claude AI integration
│   ├── auth.ts           # NextAuth configuration
│   ├── prisma.ts         # Prisma client
│   └── utils.ts          # Helper functions
└── types/                 # TypeScript type definitions
```

## Pricing Plans

| Plan | Price | Features |
|------|-------|----------|
| Starter | $49/mo | 1 location, basic analytics, weekly AI insights |
| Growth | $99/mo | 3 locations, advanced analytics, daily AI insights |
| Professional | $199/mo | 10 locations, premium analytics, unlimited AI insights |
| Enterprise | $499/mo | Unlimited locations, custom solutions, dedicated support |

## API Routes

- `POST /api/auth/register` - User registration
- `GET /api/analytics` - Fetch analytics data
- `GET /api/alerts` - Fetch alerts
- `GET /api/insights` - Generate AI insights
- `GET /api/sales` - Fetch sales data

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software. All rights reserved.

## Support

For support, email support@store.ai or open an issue in this repository.
