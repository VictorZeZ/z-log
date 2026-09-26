"use client";

import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartNoAxesColumn } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn, formatShortDate } from "@/lib/utils";
import type {
  DashboardScope,
  PostStatusDailyCount,
} from "@/types/api/dashboard";
import { DashboardActivityChartFilters } from "./DashboardActivityChartFilters";
import { buildDailySeries } from "./activityChartData";
import {
  STATUS_DEFINITIONS,
  chartConfig,
  type RangeDays,
  type StatusFilter,
} from "./activityChartConfig";

type DashboardActivityChartProps = {
  scope: DashboardScope;
  from: string;
  to: string;
  dailyBreakdown: PostStatusDailyCount[];
  rangeDays: RangeDays;
  onRangeChange: (value: RangeDays) => void;
  isFetching: boolean;
};

export function DashboardActivityChart({
  scope,
  from,
  to,
  dailyBreakdown,
  rangeDays,
  onRangeChange,
  isFetching,
}: DashboardActivityChartProps) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const visibleStatuses = STATUS_DEFINITIONS.filter(
    ({ key }) => statusFilter === "all" || key === statusFilter,
  );

  const points = buildDailySeries(dailyBreakdown);
  const hasData = points.some((point) =>
    visibleStatuses.some(({ key }) => point[key] > 0),
  );

  const emptyLabel =
    STATUS_DEFINITIONS.find(({ key }) => key === statusFilter)?.emptyLabel ??
    "posts";

  return (
    <div className="bg-slate-two rounded-3xl border p-5 shadow-md sm:p-6">
      <div className="mb-6">
        <h2 className="font-space-grotesk text-xl font-bold">
          Posts by status
        </h2>
        <p className="text-slate-zero mt-1 text-sm">
          {scope === "site" ? "All posts on the site" : "Your posts"} per day,{" "}
          {formatShortDate(`${from}T00:00:00`)} –{" "}
          {formatShortDate(`${to}T00:00:00`)}.
        </p>
      </div>

      <DashboardActivityChartFilters
        statusFilter={statusFilter}
        rangeDays={rangeDays}
        onStatusChange={setStatusFilter}
        onRangeChange={onRangeChange}
      />

      <div className={cn("duration-200", isFetching && "opacity-60")}>
        {hasData ? (
          <ChartContainer config={chartConfig} className="h-64 w-full">
            <BarChart
              data={points}
              margin={{ top: 8, right: 4, left: -24, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="4 4"
                className="stroke-gray-200 dark:stroke-gray-800"
                vertical={false}
              />

              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                className="text-xs"
                interval="preserveStartEnd"
                minTickGap={24}
              />
              <YAxis
                allowDecimals={false}
                axisLine={false}
                tickLine={false}
                className="text-xs"
              />

              <ChartTooltip content={<ChartTooltipContent />} />

              {visibleStatuses.map(({ key }) => (
                <Bar
                  key={key}
                  dataKey={key}
                  stackId="status"
                  fill={`var(--color-${key})`}
                  maxBarSize={24}
                />
              ))}
            </BarChart>
          </ChartContainer>
        ) : (
          <div className="flex h-64 w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed text-center">
            <span className="bg-indigo-zero/10 text-indigo-zero flex size-11 items-center justify-center rounded-2xl">
              <ChartNoAxesColumn size={22} />
            </span>
            <div>
              <p className="text-sm font-semibold">No data to display</p>
              <p className="text-slate-zero mt-1 text-xs">
                There are no {emptyLabel} in the last {rangeDays} days.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
