"use client";

import {
  CircleAlert,
  Eye,
  FilePenLine,
  FileText,
  Tags,
  Users,
} from "lucide-react";
import { MAX_REPORT_RANGE_DAYS } from "@/lib/api/dashboard";
import { useCategoriesReport } from "@/hooks/api/useCategoriesReport";
import { usePostsReport } from "@/hooks/api/usePostsReport";
import { useUsersReport } from "@/hooks/api/useUsersReport";
import {
  DashboardStatCard,
  type DashboardStatCardProps,
} from "@/components/pages/dashboard/shared/DashboardStatCard";
import type {
  PostOverviewResponse,
  SiteOverviewResponse,
} from "@/types/api/dashboard";

type DashboardOverviewStatsProps = {
  profileId: string;
  myPosts: PostOverviewResponse;
  // Null means the personal view.
  site: SiteOverviewResponse | null;
};

function lastDaysLabel(count: number): string {
  return `${count.toLocaleString()} in the last ${MAX_REPORT_RANGE_DAYS} days`;
}

export function DashboardOverviewStats({
  profileId,
  myPosts,
  site,
}: DashboardOverviewStatsProps) {
  const postsReport = usePostsReport(
    true,
    MAX_REPORT_RANGE_DAYS,
    site ? {} : { authorId: profileId },
  );
  const usersReport = useUsersReport(site !== null, MAX_REPORT_RANGE_DAYS);
  const categoriesReport = useCategoriesReport(
    site !== null,
    MAX_REPORT_RANGE_DAYS,
  );

  // placeholderData keeps the previous scope's report while the new one loads.
  const posts = postsReport.isPlaceholderData ? undefined : postsReport.data;
  const users = usersReport.isPlaceholderData ? undefined : usersReport.data;
  const categories = categoriesReport.isPlaceholderData
    ? undefined
    : categoriesReport.data;

  const stats: DashboardStatCardProps[] = site
    ? [
        {
          label: "Total posts",
          value: site.posts.totalCount,
          icon: FileText,
          series: posts?.days.map((day) => day.totalCount),
          footer: posts && lastDaysLabel(posts.totalCount),
        },
        {
          label: "Total views",
          value: site.posts.totalViewCount,
          icon: Eye,
          footer: "All time",
        },
        {
          label: "Total users",
          value: site.users.totalCount,
          icon: Users,
          series: users?.days.map((day) => day.registeredCount),
          footer: users && lastDaysLabel(users.registeredCount),
        },
        {
          label: "Active categories",
          value: site.categories.activeCount,
          icon: Tags,
          series: categories?.days.map((day) => day.createdCount),
          footer: categories && lastDaysLabel(categories.createdCount),
        },
      ]
    : [
        {
          label: "Published posts",
          value: myPosts.publishedCount,
          icon: FileText,
          series: posts?.days.map((day) => day.publishedCount),
          footer: posts && lastDaysLabel(posts.statusTotals.publishedCount),
        },
        {
          label: "Drafts",
          value: myPosts.draftCount,
          icon: FilePenLine,
          series: posts?.days.map((day) => day.draftCount),
          footer: posts && lastDaysLabel(posts.statusTotals.draftCount),
        },
        {
          label: "Pending review",
          value: myPosts.pendingApprovalCount,
          icon: CircleAlert,
          series: posts?.days.map((day) => day.pendingApprovalCount),
          footer:
            posts && lastDaysLabel(posts.statusTotals.pendingApprovalCount),
        },
        {
          label: "Total views",
          value: myPosts.totalViewCount,
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
