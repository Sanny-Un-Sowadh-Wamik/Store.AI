"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  TrendingUp,
  Package,
  Zap,
  BarChart3,
  X,
  ChevronRight,
} from "lucide-react";
import { cn, formatDate, formatTime } from "@/lib/utils";
import type { Alert, AlertType, AlertSeverity } from "@/types";

interface AlertCardProps {
  alert: Alert;
  onDismiss?: (id: string) => void;
  onAction?: (id: string) => void;
}

const alertIcons: Record<AlertType, typeof AlertTriangle> = {
  anomaly: AlertTriangle,
  opportunity: TrendingUp,
  inventory: Package,
  trend: BarChart3,
  performance: Zap,
};

const severityStyles: Record<AlertSeverity, { badge: "default" | "success" | "warning" | "danger" | "info"; bg: string }> = {
  info: { badge: "info", bg: "bg-purple-50 border-purple-200" },
  warning: { badge: "warning", bg: "bg-yellow-50 border-yellow-200" },
  critical: { badge: "danger", bg: "bg-red-50 border-red-200" },
  success: { badge: "success", bg: "bg-green-50 border-green-200" },
};

export function AlertCard({ alert, onDismiss, onAction }: AlertCardProps) {
  const Icon = alertIcons[alert.type];
  const styles = severityStyles[alert.severity];

  return (
    <Card className={cn("transition-all hover:shadow-md", styles.bg, alert.read && "opacity-60")}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div
              className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center",
                alert.severity === "critical"
                  ? "bg-red-100 text-red-600"
                  : alert.severity === "warning"
                  ? "bg-yellow-100 text-yellow-600"
                  : alert.severity === "success"
                  ? "bg-green-100 text-green-600"
                  : "bg-purple-100 text-purple-600"
              )}
            >
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-medium text-gray-900">{alert.title}</h4>
                <Badge variant={styles.badge}>{alert.type}</Badge>
              </div>
              <p className="text-sm text-gray-600">{alert.message}</p>
              {alert.insight && (
                <p className="text-sm text-blue-600 mt-2 italic">{alert.insight}</p>
              )}
              <p className="text-xs text-gray-400 mt-2">
                {formatDate(alert.createdAt)} at {formatTime(alert.createdAt)}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {alert.actionUrl && onAction && (
              <Button variant="ghost" size="sm" onClick={() => onAction(alert.id)}>
                View <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
            {onDismiss && (
              <Button variant="ghost" size="icon" onClick={() => onDismiss(alert.id)}>
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
