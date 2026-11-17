"use client";

import { useUsersReport } from "@/hooks/api/useUsersReport";
import { UserLevel, userLevelLabels } from "@/types/api/account";
import {
  DashboardReportChart,
  type ActivityChartControls,
  type ChartSeries,
} from "./DashboardReportChart";

const SERIES: ChartSeries[] = [
  {
    key: "normalCount",
    label: userLevelLabels[UserLevel.Normal],
    color: "var(--slate-zero)",
  },
  {
    key: "authorCount",
    label: userLevelLabels[UserLevel.Author],
    color: "var(--blue-zero)",
  },
  {
    key: "adminCount",
    label: userLevelLabels[UserLevel.Admin],
    color: "var(--indigo-zero)",
  },
  {
    key: "ownerCount",
    label: userLevelLabels[UserLevel.Owner],
    color: "var(--amber-zero)",
  },
];

export function UsersActivityChart(controls: ActivityChartControls) {
  const { data, isLoading, isFetching, refetch } = useUsersReport(
    true,
    controls.days,
  );

  return (
    <DashboardReportChart
      {...controls}
      title="Users activity"
      description="Daily registrations by account level."
      emptyMessage="No registrations in this period."
      series={SERIES}
      data={data?.days}
      total={data?.registeredCount}
      totalLabel="registrations"
      isLoading={isLoading}
      isFetching={isFetching}
      onRetry={() => refetch()}
    />
  );
}
