"use client";

import { Ban, CircleAlert, Eye, FileText } from "lucide-react";
import {
  DashboardStatCard,
  type DashboardStatCardProps,
} from "@/components/pages/dashboard/shared/DashboardStatCard";
import { usePostsReport } from "@/hooks/api/usePostsReport";
import { MAX_REPORT_RANGE_DAYS } from "@/lib/api/dashboard";
import type { PostOverviewResponse } from "@/types/api/dashboard";

type PostsOverviewStatsProps = {
  counts: PostOverviewResponse;
  // Undefined means the site-wide view.
  authorId?: string;
};

function lastDaysLabel(count: number): string {
  return `${count.toLocaleString()} in the last ${MAX_REPORT_RANGE_DAYS} days`;
}

export function PostsOverviewStats({
  counts,
  authorId,
}: PostsOverviewStatsProps) {
  const { data: report } = usePostsReport(
    true,
    MAX_REPORT_RANGE_DAYS,
    authorId ? { authorId } : {},
  );

  const stats: DashboardStatCardProps[] = [
    {
      label: "Published",
      value: counts.publishedCount,
      icon: FileText,
      series: report?.days.map((day) => day.publishedCount),
      footer: report && lastDaysLabel(report.statusTotals.publishedCount),
    },
    {
      label: "Pending review",
      value: counts.pendingApprovalCount,
      icon: CircleAlert,
      series: report?.days.map((day) => day.pendingApprovalCount),
      footer: report && lastDaysLabel(report.statusTotals.pendingApprovalCount),
    },
    {
      label: "Rejected",
      value: counts.rejectedCount,
      icon: Ban,
      series: report?.days.map((day) => day.rejectedCount),
      footer: report && lastDaysLabel(report.statusTotals.rejectedCount),
    },
    {
      label: "Total views",
      value: counts.totalViewCount,
      icon: Eye,
      footer: "All time",
    },
  ];

  return (
    <section className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <DashboardStatCard key={stat.label} {...stat} />
      ))}
    </section>
  );
}
