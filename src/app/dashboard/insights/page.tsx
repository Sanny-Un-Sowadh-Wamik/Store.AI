"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Send, RefreshCw, Lightbulb, TrendingUp, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const recentInsights = [
  {
    id: "1",
    type: "recommendation",
    title: "Optimize Morning Rush",
    summary:
      "Your 7-9 AM window generates 40% of daily revenue. A breakfast bundle could increase morning sales by 15%.",
    date: "Today",
    confidence: 92,
  },
  {
    id: "2",
    type: "trend",
    title: "Weekend Performance",
    summary:
      "Saturday sales are consistently 35% higher than weekday average. Consider extended weekend hours.",
    date: "Yesterday",
    confidence: 88,
  },
  {
    id: "3",
    type: "anomaly",
    title: "Unusual Tuesday Dip",
    summary:
      "Last Tuesday saw a 22% drop in afternoon sales. Weather data shows it was the coldest day of the month.",
    date: "2 days ago",
    confidence: 85,
  },
];

export default function InsightsPage() {
  const [question, setQuestion] = useState("");
  const [isAsking, setIsAsking] = useState(false);
  const [conversation, setConversation] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);

  const handleAskQuestion = async () => {
    if (!question.trim()) return;

    setConversation((prev) => [...prev, { role: "user", content: question }]);
    setIsAsking(true);
    setQuestion("");

    setTimeout(() => {
      setConversation((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Based on your store's data, here's what I found about "${question}":

Your coffee sales have been growing steadily, with lattes being your top performer. I'd recommend:

1. **Expand latte variations** - seasonal flavors could boost sales by 10-15%
2. **Bundle with pastries** - your croissant sales spike when paired with coffee
3. **Loyalty program** - your repeat customers spend 40% more on average

Would you like me to dive deeper into any of these recommendations?`,
        },
      ]);
      setIsAsking(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">AI Insights</h1>
        <p className="text-gray-500">Get intelligent recommendations powered by Claude</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-blue-100 bg-gradient-to-br from-blue-50 to-white">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle>Ask Store.AI</CardTitle>
                  <CardDescription>
                    Ask questions about your business in plain English
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conversation.length > 0 && (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {conversation.map((msg, i) => (
                      <div
                        key={i}
                        className={cn(
                          "p-4 rounded-lg",
                          msg.role === "user"
                            ? "bg-blue-600 text-white ml-12"
                            : "bg-white border border-gray-200 mr-12"
                        )}
                      >
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    ))}
                    {isAsking && (
                      <div className="bg-white border border-gray-200 p-4 rounded-lg mr-12">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
                          <div
                            className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          />
                          <div
                            className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                            style={{ animationDelay: "0.4s" }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <div className="flex space-x-2">
                  <Input
                    placeholder="Ask anything about your business..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAskQuestion()}
                    disabled={isAsking}
                  />
                  <Button onClick={handleAskQuestion} disabled={isAsking || !question.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "How can I increase sales?",
                    "What's my best selling product?",
                    "When should I restock?",
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setQuestion(suggestion)}
                      className="text-xs px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Insights</CardTitle>
              <Button variant="ghost" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentInsights.map((insight) => (
                <div
                  key={insight.id}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div
                        className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center",
                          insight.type === "recommendation"
                            ? "bg-blue-100 text-blue-600"
                            : insight.type === "trend"
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                        )}
                      >
                        {insight.type === "recommendation" ? (
                          <Lightbulb className="w-4 h-4" />
                        ) : insight.type === "trend" ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <AlertTriangle className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{insight.title}</h4>
                        <p className="text-xs text-gray-500">{insight.date}</p>
                      </div>
                    </div>
                    <Badge variant="primary">{insight.confidence}% confident</Badge>
                  </div>
                  <p className="text-sm text-gray-600">{insight.summary}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Insights generated</span>
                <span className="font-semibold">127</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Actions taken</span>
                <span className="font-semibold">43</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Revenue impact</span>
                <span className="font-semibold text-green-600">+$4,230</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Insight Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: "Sales Optimization", count: 45, color: "bg-blue-500" },
                { name: "Inventory", count: 32, color: "bg-green-500" },
                { name: "Customer Behavior", count: 28, color: "bg-purple-500" },
                { name: "Staffing", count: 12, color: "bg-orange-500" },
                { name: "Anomalies", count: 10, color: "bg-red-500" },
              ].map((category) => (
                <div key={category.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${category.color}`} />
                    <span className="text-sm text-gray-600">{category.name}</span>
                  </div>
                  <span className="text-sm font-medium">{category.count}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
