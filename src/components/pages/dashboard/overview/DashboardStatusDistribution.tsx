"use client";

import { Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { DashboardPanel } from "@/components/pages/dashboard/shared/DashboardPanel";
import {
  POST_STATUS_SERIES,
  postStatusChartConfig,
} from "@/components/pages/dashboard/shared/postStatus";
import { postStatusLabels } from "@/types/api/post";
import type { PostOverviewResponse } from "@/types/api/dashboard";

type DashboardStatusDistributionProps = {
  counts: PostOverviewResponse;
};

export function DashboardStatusDistribution({
  counts,
}: DashboardStatusDistributionProps) {
  const total = counts.totalCount;

  const slices =
    total > 0
      ? POST_STATUS_SERIES.map(({ key, color }) => ({
          key,
          value: counts[key],
          fill: color,
        }))
      : [{ key: "empty", value: 1, fill: "var(--slate-one)" }];

  return (
    <DashboardPanel
      title="Post distribution"
      description="Content by current status."
    >
      <div className="relative mx-auto size-44">
        <ChartContainer
          config={postStatusChartConfig}
          className="aspect-square size-full"
        >
          <PieChart>
            {total > 0 && (
              <ChartTooltip
                content={<ChartTooltipContent hideLabel nameKey="key" />}
              />
            )}
            <Pie
              data={slices}
              dataKey="value"
              nameKey="key"
              innerRadius="68%"
              outerRadius="100%"
              stroke="none"
              isAnimationActive={false}
            />
          </PieChart>
        </ChartContainer>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-space-grotesk text-3xl font-bold">
            {total.toLocaleString()}
          </span>
          <span className="text-slate-zero text-xs">Total posts</span>
        </div>
      </div>

      <ul className="flex flex-col gap-3">
        {POST_STATUS_SERIES.map(({ key, status, color }) => {
          const count = counts[key];
          const percent =
            total > 0 ? ((count / total) * 100).toFixed(1) : "0.0";

          return (
            <li key={key} className="flex items-center justify-between text-sm">
              <span className="text-slate-zero flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="size-2 rounded-full"
                  style={{ backgroundColor: color }}
                />
                {postStatusLabels[status]}
              </span>
              <span className="font-medium">
                {count.toLocaleString()}{" "}
                <span className="text-slate-zero text-xs font-normal">
                  {percent}%
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </DashboardPanel>
  );
}
