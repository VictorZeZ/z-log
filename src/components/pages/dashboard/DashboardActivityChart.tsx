"use client";

import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartNoAxesColumn } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { DashboardScope } from "@/types/api/dashboard";
import { DashboardActivityChartFilters } from "./DashboardActivityChartFilters";
import {
  STATUS_DEFINITIONS,
  chartConfig,
  type StatusCounts,
  type StatusFilter,
  type StatusKey,
} from "./activityChartConfig";

type DashboardActivityChartProps = {
  scope: DashboardScope;
  counts: StatusCounts;
};

export function DashboardActivityChart({
  scope,
  counts,
}: DashboardActivityChartProps) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const chartData = STATUS_DEFINITIONS.filter(
    ({ key }) => statusFilter === "all" || key === statusFilter,
  ).map(({ key, countKey }) => ({
    status: key,
    count: counts[countKey],
    fill: `var(--color-${key})`,
  }));

  const hasData = chartData.some((item) => item.count > 0);

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
          {scope === "site" ? "All posts on the site" : "Your posts"} by status.
        </p>
      </div>

      <DashboardActivityChartFilters
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      {hasData ? (
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <BarChart
            data={chartData}
            margin={{ top: 8, right: 4, left: -24, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              className="stroke-gray-200 dark:stroke-gray-800"
              vertical={false}
            />

            <XAxis
              dataKey="status"
              axisLine={false}
              tickLine={false}
              className="text-xs"
              tickFormatter={(value: string) =>
                chartConfig[value as StatusKey].label
              }
            />
            <YAxis
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              className="text-xs"
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="status" />}
            />

            <Bar dataKey="count" radius={8} maxBarSize={72} />
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
              There are no {emptyLabel} yet.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
