"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, RefreshCw, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIInsightsProps {
  insights: string | null;
  isLoading?: boolean;
  onRefresh?: () => void;
}

export function AIInsights({ insights, isLoading = false, onRefresh }: AIInsightsProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="border-blue-100 bg-gradient-to-br from-blue-50 to-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <CardTitle className="text-lg">AI Insights</CardTitle>
            <p className="text-xs text-gray-500">Powered by Claude</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="primary">Live</Badge>
          {onRefresh && (
            <Button variant="ghost" size="icon" onClick={onRefresh} disabled={isLoading}>
              <RefreshCw className={cn("w-4 h-4", isLoading && "animate-spin")} />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6" />
          </div>
        ) : insights ? (
          <div className="space-y-4">
            <div
              className={cn(
                "prose prose-sm max-w-none text-gray-700",
                !expanded && "line-clamp-6"
              )}
            >
              <div dangerouslySetInnerHTML={{ __html: formatInsights(insights) }} />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="text-blue-600 hover:text-blue-700"
            >
              {expanded ? "Show less" : "Read more"}
              <ChevronRight
                className={cn("w-4 h-4 ml-1 transition-transform", expanded && "rotate-90")}
              />
            </Button>
          </div>
        ) : (
          <p className="text-gray-500 text-sm">
            No insights available yet. Add some sales data to get AI-powered recommendations.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function formatInsights(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>)/gs, "<ul>$1</ul>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(.+)$/gm, (match) => {
      if (match.startsWith("<")) return match;
      return `<p>${match}</p>`;
    });
}
