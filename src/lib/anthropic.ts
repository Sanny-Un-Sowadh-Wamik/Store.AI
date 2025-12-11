import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export interface InsightRequest {
  salesData: {
    date: string;
    revenue: number;
    transactions: number;
    averageTicket: number;
  }[];
  businessType: string;
  currentMetrics: {
    totalRevenue: number;
    revenueChange: number;
    transactionCount: number;
    customerCount: number;
  };
  alerts?: {
    type: string;
    message: string;
  }[];
}

export async function generateInsights(data: InsightRequest): Promise<string> {
  const systemPrompt = `You are an expert retail analytics AI assistant for Store.AI, helping independent retail store owners understand their business performance. You analyze sales data and provide actionable, plain-English insights.

Your responses should be:
- Clear and jargon-free, suitable for small business owners
- Actionable with specific recommendations
- Focused on opportunities to increase revenue or reduce costs
- Empathetic to the challenges of running a small business

Format your response as a brief analysis (2-3 paragraphs) followed by 3-5 bullet points of specific recommendations.`;

  const userPrompt = `Analyze the following retail store data and provide insights:

Business Type: ${data.businessType}

Current Performance:
- Total Revenue: $${data.currentMetrics.totalRevenue.toLocaleString()}
- Revenue Change: ${data.currentMetrics.revenueChange > 0 ? "+" : ""}${data.currentMetrics.revenueChange.toFixed(1)}%
- Transactions: ${data.currentMetrics.transactionCount}
- Customer Count: ${data.currentMetrics.customerCount}

Recent Sales Trend (Last ${data.salesData.length} days):
${data.salesData.map((d) => `- ${d.date}: $${d.revenue.toLocaleString()} (${d.transactions} transactions, avg ticket: $${d.averageTicket.toFixed(2)})`).join("\n")}

${data.alerts && data.alerts.length > 0 ? `\nRecent Alerts:\n${data.alerts.map((a) => `- [${a.type.toUpperCase()}] ${a.message}`).join("\n")}` : ""}

Please provide your analysis and recommendations in plain English.`;

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: userPrompt,
      },
    ],
    system: systemPrompt,
  });

  const textBlock = message.content.find((block) => block.type === "text");
  return textBlock ? textBlock.text : "Unable to generate insights at this time.";
}

export async function generateAlertExplanation(
  alertType: string,
  alertMessage: string,
  contextData: Record<string, unknown>
): Promise<string> {
  const systemPrompt = `You are a helpful retail analytics assistant. Explain alerts in simple terms and suggest what actions the store owner might take. Keep responses concise (2-3 sentences).`;

  const userPrompt = `Explain this alert to a store owner:
Type: ${alertType}
Message: ${alertMessage}
Context: ${JSON.stringify(contextData)}

Provide a brief explanation and one recommended action.`;

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 256,
    messages: [
      {
        role: "user",
        content: userPrompt,
      },
    ],
    system: systemPrompt,
  });

  const textBlock = message.content.find((block) => block.type === "text");
  return textBlock ? textBlock.text : "Unable to explain alert at this time.";
}

export async function answerBusinessQuestion(
  question: string,
  businessContext: {
    businessType: string;
    recentSales: number;
    topProducts: string[];
  }
): Promise<string> {
  const systemPrompt = `You are a helpful retail business advisor for Store.AI. Answer questions about retail operations, inventory management, customer service, and sales strategies. Keep answers practical and actionable for small business owners.`;

  const userPrompt = `Business Context:
- Type: ${businessContext.businessType}
- Recent Revenue: $${businessContext.recentSales.toLocaleString()}
- Top Products: ${businessContext.topProducts.join(", ")}

Question: ${question}`;

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 512,
    messages: [
      {
        role: "user",
        content: userPrompt,
      },
    ],
    system: systemPrompt,
  });

  const textBlock = message.content.find((block) => block.type === "text");
  return textBlock ? textBlock.text : "Unable to answer your question at this time.";
}

export default anthropic;
