"use client";

import Cookies from "js-cookie";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/store/hooks";
import { useDashboard } from "@/hooks/api/useDashboard";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardStats } from "./DashboardStats";
import { DashboardActivityChart } from "./DashboardActivityChart";
import { DashboardAccountOverview } from "./DashboardAccountOverview";
import { DashboardRecentPosts } from "./DashboardRecentPosts";
import { DashboardQuickActions } from "./DashboardQuickActions";
import { DashboardSkeleton } from "./DashboardSkeleton";

export function Dashboard() {
  const router = useRouter();
  const currentUser = useAppSelector((state) => state.user.data);
  const isUserLoading = useAppSelector((state) => state.user.isLoading);

  const { data, isLoading, isError } = useDashboard(Boolean(currentUser));

  useEffect(() => {
    // Guard against the hydration-race window where Redux's isUserLoading
    // hasn't flipped true yet (LoadSession's effect hasn't dispatched),
    // even though a session cookie exists and is about to be restored.
    if (!isUserLoading && !currentUser && !Cookies.get("token")) {
      router.replace("/login");
    }
  }, [isUserLoading, currentUser, router]);

  if (isUserLoading || (Boolean(currentUser) && isLoading)) {
    return <DashboardSkeleton />;
  }

  if (!currentUser) {
    return null;
  }

  if (isError || !data) {
    return (
      <section className="mt-6 flex w-full max-w-2xl flex-col items-center gap-3 px-4 py-20 text-center sm:mt-22">
        <h1 className="font-space-grotesk text-2xl font-bold">
          Couldn&apos;t load your dashboard
        </h1>
        <p className="text-slate-zero">
          Something went wrong. Please try refreshing the page.
        </p>
      </section>
    );
  }

  return (
    <div className="flex w-full flex-col items-center gap-8 pb-8">
      <div className="mt-6 flex w-full flex-col gap-8 px-4 sm:mt-10 xl:w-6xl xl:px-0">
        <DashboardHeader profile={data.profile} />

        <DashboardStats content={data.myContent} />

        {data.authorInsights ? (
          <section className="grid w-full gap-4 xl:grid-cols-[1.7fr_1fr]">
            <DashboardActivityChart authorInsights={data.authorInsights} />
            <DashboardAccountOverview profile={data.profile} />
          </section>
        ) : (
          <section className="grid w-full xl:grid-cols-[1.7fr_1fr]">
            <div className="hidden xl:block" />
            <DashboardAccountOverview profile={data.profile} />
          </section>
        )}

        <section className="grid w-full gap-4 xl:grid-cols-[1.7fr_1fr]">
          <DashboardRecentPosts authorId={data.profile.id} />
          <DashboardQuickActions />
        </section>
      </div>
    </div>
  );
}
