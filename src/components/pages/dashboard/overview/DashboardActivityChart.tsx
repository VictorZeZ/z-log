"use client";

import { useState } from "react";
import { CategoriesActivityChart } from "@/components/pages/dashboard/shared/CategoriesActivityChart";
import { DashboardPillTabs } from "@/components/pages/dashboard/shared/DashboardPillTabs";
import { PostsActivityChart } from "@/components/pages/dashboard/shared/PostsActivityChart";
import { UsersActivityChart } from "@/components/pages/dashboard/shared/UsersActivityChart";
import { MAX_REPORT_RANGE_DAYS } from "@/lib/api/dashboard";

type ActivityMetric = "posts" | "users" | "categories";

const METRIC_OPTIONS = [
  { value: "posts", label: "Posts" },
  { value: "users", label: "Users" },
  { value: "categories", label: "Categories" },
] as const;

type DashboardActivityChartProps = {
  // Undefined means the site-wide view.
  authorId?: string;
};

export function DashboardActivityChart({
  authorId,
}: DashboardActivityChartProps) {
  const [days, setDays] = useState(MAX_REPORT_RANGE_DAYS);
  const [selectedMetric, setSelectedMetric] = useState<ActivityMetric>("posts");

  // The users and categories reports are admin-only and have no personal view.
  const isSiteView = authorId === undefined;
  const metric = isSiteView ? selectedMetric : "posts";

  const controls = {
    days,
    onDaysChange: setDays,
    toolbar: isSiteView ? (
      <DashboardPillTabs
        options={METRIC_OPTIONS}
        value={metric}
        onChange={setSelectedMetric}
        ariaLabel="Chart data"
      />
    ) : undefined,
  };

  if (metric === "users") {
    return <UsersActivityChart {...controls} />;
  }

  if (metric === "categories") {
    return <CategoriesActivityChart {...controls} />;
  }

  return <PostsActivityChart authorId={authorId} {...controls} />;
}
