import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Mock insights for development
const mockInsights = `**Your Business is Growing!**

Based on your recent sales data, your store is showing strong performance with a **12.5% increase in revenue** compared to last week. Here's what's driving your success:

**Key Observations:**
- Your morning coffee rush (7-9 AM) is your strongest revenue period
- Weekend traffic is consistently higher than weekdays
- Average ticket size has increased, suggesting successful upselling

**Recommendations:**
- Consider extending weekend hours to capture more sales
- Add a loyalty program to increase customer retention
- Bundle popular items to increase average ticket further
- Stock up on your top 5 products before the weekend rush`;

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // In production, this would call the Anthropic API
    // For now, return mock insights
    const insights = mockInsights;

    return NextResponse.json({ insights });
  } catch (error) {
    console.error("Insights error:", error);
    return NextResponse.json(
      { error: "Failed to generate insights" },
      { status: 500 }
    );
  }
}
