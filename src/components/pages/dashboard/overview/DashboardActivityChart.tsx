"use client";

import { useState } from "react";
import { CategoriesActivityChart } from "@/components/pages/dashboard/shared/CategoriesActivityChart";
import { DashboardPillTabs } from "@/components/pages/dashboard/shared/DashboardPillTabs";
import { PostsActivityChart } from "@/components/pages/dashboard/shared/PostsActivityChart";
import { UsersActivityChart } from "@/components/pages/dashboard/shared/UsersActivityChart";
import {
  ACTIVITY_METRIC_OPTIONS,
  type ActivityMetric,
} from "@/components/pages/dashboard/shared/activityMetric";
import { MAX_REPORT_RANGE_DAYS } from "@/lib/api/dashboard";

type DashboardActivityChartProps = {
  metric: ActivityMetric;
  // Undefined hides the switch (personal view only has post data).
  onMetricChange?: (metric: ActivityMetric) => void;
  // Undefined means the site-wide view.
  authorId?: string;
};

export function DashboardActivityChart({
  metric,
  onMetricChange,
  authorId,
}: DashboardActivityChartProps) {
  const [days, setDays] = useState(MAX_REPORT_RANGE_DAYS);

  const controls = {
    days,
    onDaysChange: setDays,
    toolbar: onMetricChange ? (
      <DashboardPillTabs
        options={ACTIVITY_METRIC_OPTIONS}
        value={metric}
        onChange={onMetricChange}
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
