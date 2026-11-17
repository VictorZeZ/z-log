"use client";

import { usePostsReport } from "@/hooks/api/usePostsReport";
import { postStatusLabels } from "@/types/api/post";
import {
  DashboardReportChart,
  type ActivityChartControls,
  type ChartSeries,
} from "./DashboardReportChart";
import { POST_STATUS_SERIES } from "./postStatus";

const SERIES: ChartSeries[] = POST_STATUS_SERIES.map(
  ({ key, status, color }) => ({
    key,
    label: postStatusLabels[status],
    color,
  }),
);

type PostsActivityChartProps = ActivityChartControls & {
  // Undefined means the site-wide view.
  authorId?: string;
};

export function PostsActivityChart({
  authorId,
  ...controls
}: PostsActivityChartProps) {
  const { data, isLoading, isFetching, refetch } = usePostsReport(
    true,
    controls.days,
    authorId ? { authorId } : {},
  );

  return (
    <DashboardReportChart
      {...controls}
      title="Posts activity"
      description="Daily post counts by status."
      emptyMessage="No post activity in this period."
      series={SERIES}
      data={data?.days}
      total={data?.totalCount}
      totalLabel="posts"
      isLoading={isLoading}
      isFetching={isFetching}
      onRetry={() => refetch()}
    />
  );
}
