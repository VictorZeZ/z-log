"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { formatShortDate } from "@/lib/utils";
import type { AuthorInsightsResponse } from "@/types/api/dashboard";

type DashboardActivityChartProps = {
  authorInsights: AuthorInsightsResponse;
};

const chartConfig = {
  count: { label: "Posts", color: "var(--chart-1)" },
} satisfies ChartConfig;

export function DashboardActivityChart({
  authorInsights,
}: DashboardActivityChartProps) {
  const data = authorInsights.postsPerDay.map((day) => ({
    ...day,
    label: formatShortDate(day.date),
  }));

  return (
    <div className="bg-slate-two rounded-3xl border p-5 shadow-md sm:p-6">
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <h2 className="font-space-grotesk text-xl font-bold">
            Publishing activity
          </h2>
        </div>
        <p className="text-slate-zero mt-1 text-sm">
          Posts published over the last 30 days.
        </p>
      </div>

      <ChartContainer config={chartConfig} className="h-64 w-full">
        <AreaChart
          data={data}
          margin={{ top: 8, right: 4, left: -24, bottom: 0 }}
        >
          <defs>
            <linearGradient id="postsPerDayFill" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="var(--color-count)"
                stopOpacity={0.24}
              />
              <stop
                offset="100%"
                stopColor="var(--color-count)"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

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
          />
          <YAxis
            allowDecimals={false}
            axisLine={false}
            tickLine={false}
            className="text-xs"
          />

          <ChartTooltip content={<ChartTooltipContent indicator="line" />} />

          <Area
            type="monotone"
            dataKey="count"
            stroke="var(--color-count)"
            strokeWidth={2.5}
            fill="url(#postsPerDayFill)"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
