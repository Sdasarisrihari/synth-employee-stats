
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: number;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  description,
  trend,
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline">
              <h3 className="text-2xl font-bold">{value}</h3>
              {trend !== undefined && (
                <span 
                  className={`ml-2 flex items-center text-xs font-medium ${
                    trend > 0 
                      ? 'text-dashboard-green' 
                      : trend < 0 
                        ? 'text-dashboard-red' 
                        : 'text-muted-foreground'
                  }`}
                >
                  {trend > 0 ? (
                    <ArrowUp className="mr-1 h-3 w-3" />
                  ) : trend < 0 ? (
                    <ArrowDown className="mr-1 h-3 w-3" />
                  ) : null}
                  {Math.abs(trend)}%
                </span>
              )}
            </div>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          <div className="rounded-md p-2 bg-muted/50">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
