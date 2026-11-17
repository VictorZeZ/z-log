"use client";

import type { ReactNode } from "react";
import { Shimmer } from "@shimmer-from-structure/react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DashboardPanel } from "@/components/pages/dashboard/shared/DashboardPanel";
import { MAX_REPORT_RANGE_DAYS } from "@/lib/api/dashboard";
import { cn, formatShortDate } from "@/lib/utils";

const RANGE_OPTIONS = [7, 14, MAX_REPORT_RANGE_DAYS];

export type ChartSeries = {
  key: string;
  label: string;
  color: string;
};

export type ActivityChartControls = {
  days: number;
  onDaysChange: (days: number) => void;
  toolbar?: ReactNode;
};

type DashboardReportChartProps = ActivityChartControls & {
  title: string;
  description: string;
  emptyMessage: string;
  series: readonly ChartSeries[];
  data?: { date: string }[];
  total?: number;
  totalLabel: string;
  isLoading: boolean;
  isFetching: boolean;
  onRetry: () => void;
};

export function DashboardReportChart({
  title,
  description,
  emptyMessage,
  series,
  data,
  total,
  totalLabel,
  days,
  onDaysChange,
  toolbar,
  isLoading,
  isFetching,
  onRetry,
}: DashboardReportChartProps) {
  const chartConfig: ChartConfig = Object.fromEntries(
    series.map(({ key, label, color }) => [key, { label, color }]),
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <Shimmer loading>
          <div className="bg-muted h-72 w-full rounded-2xl" />
        </Shimmer>
      );
    }

    if (!data || total === undefined) {
      return (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <p className="text-slate-zero text-sm">
            Couldn&apos;t load this chart.
          </p>
          <Button variant="outline" size="sm" onClick={onRetry}>
            Try again
          </Button>
        </div>
      );
    }

    if (total === 0) {
      return (
        <p className="text-slate-zero py-16 text-center text-sm">
          {emptyMessage}
        </p>
      );
    }

    return (
      <div
        className={cn(
          "flex flex-col gap-4 duration-200",
          isFetching && "opacity-60",
        )}
      >
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
          {series.map(({ key, label, color }) => (
            <span
              key={key}
              className="text-slate-zero flex items-center gap-1.5"
            >
              <span
                aria-hidden="true"
                className="size-2 rounded-full"
                style={{ backgroundColor: color }}
              />
              {label}
            </span>
          ))}
          <strong className="font-space-grotesk ml-auto text-base">
            {total.toLocaleString()}{" "}
            <small className="text-slate-zero text-xs font-normal">
              {totalLabel}
            </small>
          </strong>
        </div>

        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-64 w-full"
        >
          <BarChart data={data} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={16}
              tickFormatter={formatShortDate}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
              width={28}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => formatShortDate(String(value))}
                />
              }
            />
            {series.map(({ key }) => (
              <Bar
                key={key}
                dataKey={key}
                stackId="series"
                fill={`var(--color-${key})`}
                isAnimationActive={false}
              />
            ))}
          </BarChart>
        </ChartContainer>
      </div>
    );
  };

  return (
    <DashboardPanel
      title={title}
      description={description}
      action={
        <Select
          value={String(days)}
          onValueChange={(value) => onDaysChange(Number(value))}
        >
          <SelectTrigger size="sm" className="w-36" aria-label="Date range">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {RANGE_OPTIONS.map((option) => (
              <SelectItem key={option} value={String(option)}>
                Last {option} days
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      }
    >
      {toolbar}
      {renderContent()}
    </DashboardPanel>
  );
}
