"use client";

import Link from "next/link";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useDashboardOverview } from "@/hooks/api/useDashboardOverview";
import { DashboardPageHeading } from "@/components/pages/dashboard/shared/DashboardPageHeading";
import { DashboardError } from "@/components/pages/dashboard/shared/DashboardError";
import { DASHBOARD_PANEL_GRID_CLASS_NAME } from "@/components/pages/dashboard/shared/layout";
import type { ActivityMetric } from "@/components/pages/dashboard/shared/activityMetric";
import {
  DashboardScopeSwitch,
  type DashboardScope,
} from "@/components/pages/dashboard/DashboardScopeSwitch";
import { DashboardOverviewSkeleton } from "./DashboardOverviewSkeleton";
import { DashboardOverviewStats } from "./DashboardOverviewStats";
import { DashboardActivityChart } from "./DashboardActivityChart";
import { DashboardDistribution } from "./DashboardDistribution";
import { DashboardRecentPosts } from "./DashboardRecentPosts";
import { DashboardAccountPanel } from "./DashboardAccountPanel";
import { DashboardPendingPanel } from "./DashboardPendingPanel";

const DESCRIPTIONS: Record<DashboardScope, string> = {
  mine: "A clear overview of your publishing activity and content.",
  site: "A clear overview of activity, content, and moderation across the entire site.",
};

function getTodayLabel(): string {
  return new Date()
    .toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
    .toUpperCase();
}

export function DashboardOverview() {
  const [scope, setScope] = useState<DashboardScope>("mine");
  const [metric, setMetric] = useState<ActivityMetric>("posts");
  const { data, isLoading, isError, refetch } = useDashboardOverview(true);

  if (isLoading) {
    return <DashboardOverviewSkeleton />;
  }

  if (isError || !data) {
    return <DashboardError onRetry={() => refetch()} />;
  }

  const { profile, myPosts, site } = data;
  const siteView = scope === "site" ? site : null;
  const activeScope: DashboardScope = siteView ? "site" : "mine";
  // Users and categories data only exists in the site view.
  const activeMetric: ActivityMetric = siteView ? metric : "posts";

  return (
    <>
      <DashboardPageHeading
        eyebrow={getTodayLabel()}
        title="Overview"
        description={DESCRIPTIONS[activeScope]}
      >
        {site && (
          <DashboardScopeSwitch scope={scope} onScopeChange={setScope} />
        )}

        <Link
          href="/posts/create"
          className="bg-indigo-zero flex w-fit items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-md transition"
        >
          <Plus size={18} />
          New post
        </Link>
      </DashboardPageHeading>

      <DashboardOverviewStats
        profileId={profile.id}
        myPosts={myPosts}
        site={siteView}
      />

      <div className={DASHBOARD_PANEL_GRID_CLASS_NAME}>
        <DashboardActivityChart
          metric={activeMetric}
          onMetricChange={siteView ? setMetric : undefined}
          authorId={siteView ? undefined : profile.id}
        />
        <DashboardDistribution
          metric={activeMetric}
          myPosts={myPosts}
          site={siteView}
        />
      </div>

      <div className={DASHBOARD_PANEL_GRID_CLASS_NAME}>
        <DashboardRecentPosts scope={activeScope} profileId={profile.id} />
        {siteView ? (
          <DashboardPendingPanel />
        ) : (
          <DashboardAccountPanel profile={profile} />
        )}
      </div>
    </>
  );
}
