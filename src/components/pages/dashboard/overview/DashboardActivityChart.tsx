"use client";

import { useState } from "react";
import { Shimmer } from "@shimmer-from-structure/react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DashboardPanel } from "@/components/pages/dashboard/shared/DashboardPanel";
import {
  POST_STATUS_SERIES,
  postStatusChartConfig,
} from "@/components/pages/dashboard/shared/postStatus";
import { usePostsReport } from "@/hooks/api/usePostsReport";
import { MAX_REPORT_RANGE_DAYS } from "@/lib/api/dashboard";
import { cn, formatShortDate } from "@/lib/utils";
import { postStatusLabels } from "@/types/api/post";

const RANGE_OPTIONS = [7, 14, MAX_REPORT_RANGE_DAYS];

type DashboardActivityChartProps = {
  // Undefined means the site-wide view.
  authorId?: string;
};

export function DashboardActivityChart({
  authorId,
}: DashboardActivityChartProps) {
  const [days, setDays] = useState(MAX_REPORT_RANGE_DAYS);
  const { data, isLoading, isFetching, refetch } = usePostsReport(
    true,
    days,
    authorId ? { authorId } : {},
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <Shimmer loading>
          <div className="bg-muted h-72 w-full rounded-2xl" />
        </Shimmer>
      );
    }

    if (!data) {
      return (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <p className="text-slate-zero text-sm">
            Couldn&apos;t load post activity.
          </p>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Try again
          </Button>
        </div>
      );
    }

    if (data.totalCount === 0) {
      return (
        <p className="text-slate-zero py-16 text-center text-sm">
          No post activity in this period.
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
          {POST_STATUS_SERIES.map(({ key, status, color }) => (
            <span
              key={key}
              className="text-slate-zero flex items-center gap-1.5"
            >
              <span
                aria-hidden="true"
                className="size-2 rounded-full"
                style={{ backgroundColor: color }}
              />
              {postStatusLabels[status]}
            </span>
          ))}
          <strong className="font-space-grotesk ml-auto text-base">
            {data.totalCount.toLocaleString()}{" "}
            <small className="text-slate-zero text-xs font-normal">posts</small>
          </strong>
        </div>

        <ChartContainer
          config={postStatusChartConfig}
          className="aspect-auto h-64 w-full"
        >
          <BarChart data={data.days} accessibilityLayer>
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
            {POST_STATUS_SERIES.map(({ key }) => (
              <Bar
                key={key}
                dataKey={key}
                stackId="status"
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
      title="Posts activity"
      description="Daily post counts by status."
      action={
        <Select
          value={String(days)}
          onValueChange={(value) => setDays(Number(value))}
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
      {renderContent()}
    </DashboardPanel>
  );
}
