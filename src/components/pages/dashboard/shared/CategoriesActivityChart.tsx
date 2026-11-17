"use client";

import { useCategoriesReport } from "@/hooks/api/useCategoriesReport";
import {
  DashboardReportChart,
  type ActivityChartControls,
  type ChartSeries,
} from "./DashboardReportChart";

const SERIES: ChartSeries[] = [
  { key: "createdCount", label: "Created", color: "var(--indigo-zero)" },
  { key: "deletedCount", label: "Archived", color: "var(--slate-zero)" },
];

export function CategoriesActivityChart(controls: ActivityChartControls) {
  const { data, isLoading, isFetching, refetch } = useCategoriesReport(
    true,
    controls.days,
  );

  return (
    <DashboardReportChart
      {...controls}
      title="Categories activity"
      description="Daily categories created and archived."
      emptyMessage="No category activity in this period."
      series={SERIES}
      data={data?.days}
      total={data ? data.createdCount + data.deletedCount : undefined}
      totalLabel="changes"
      isLoading={isLoading}
      isFetching={isFetching}
      onRetry={() => refetch()}
    />
  );
}
