"use client";

import Link from "next/link";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useDashboardOverview } from "@/hooks/api/useDashboardOverview";
import { DashboardPageHeading } from "@/components/pages/dashboard/shared/DashboardPageHeading";
import { DashboardError } from "@/components/pages/dashboard/shared/DashboardError";
import {
  DashboardScopeSwitch,
  type DashboardScope,
} from "@/components/pages/dashboard/DashboardScopeSwitch";
import { DashboardOverviewSkeleton } from "./DashboardOverviewSkeleton";
import { DashboardOverviewStats } from "./DashboardOverviewStats";

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
  const { data, isLoading, isError, refetch } = useDashboardOverview(true);

  if (isLoading) {
    return <DashboardOverviewSkeleton />;
  }

  if (isError || !data) {
    return <DashboardError onRetry={() => refetch()} />;
  }

  const { profile, myPosts, site } = data;
  const siteView = scope === "site" ? site : null;

  return (
    <>
      <DashboardPageHeading
        eyebrow={getTodayLabel()}
        title="Overview"
        description={DESCRIPTIONS[siteView ? "site" : "mine"]}
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
    </>
  );
}
