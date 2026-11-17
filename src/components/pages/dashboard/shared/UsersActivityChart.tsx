"use client";

import { useUsersReport } from "@/hooks/api/useUsersReport";
import {
  DashboardReportChart,
  type ActivityChartControls,
} from "./DashboardReportChart";
import { USER_LEVEL_SERIES } from "./userLevelSeries";

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
      series={USER_LEVEL_SERIES}
      data={data?.days}
      total={data?.registeredCount}
      totalLabel="registrations"
      isLoading={isLoading}
      isFetching={isFetching}
      onRetry={() => refetch()}
    />
  );
}
