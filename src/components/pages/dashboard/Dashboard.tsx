"use client";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/store/hooks";
import { useDashboardOverview } from "@/hooks/api/useDashboardOverview";
import { DashboardSkeleton } from "./DashboardSkeleton";
import { DashboardError } from "./DashboardError";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardScope, DashboardScopeSwitch } from "./DashboardScopeSwitch";
import { DashboardStats } from "./DashboardStats";

export function Dashboard() {
  const router = useRouter();
  const currentUser = useAppSelector((state) => state.user.data);
  const isUserLoading = useAppSelector((state) => state.user.isLoading);
  const [scope, setScope] = useState<DashboardScope>("mine");

  const { data, isLoading, isError, refetch } = useDashboardOverview(
    Boolean(currentUser),
  );

  useEffect(() => {
    // Guard against the hydration-race window where isUserLoading hasn't
    // flipped to true yet (LoadSession's effect hasn't run), even though a
    // session cookie exists and is about to be restored.
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
    return <DashboardError onRetry={() => refetch()} />;
  }

  const { profile, myPosts, site } = data;
  const siteView = scope === "site" ? site : null;

  return (
    <div className="mt-6 flex w-full flex-col gap-8 px-4 pb-8 sm:mt-10 xl:w-6xl xl:px-0">
      <DashboardHeader profile={profile} scope={siteView ? "site" : "mine"}>
        {site && (
          <DashboardScopeSwitch scope={scope} onScopeChange={setScope} />
        )}
      </DashboardHeader>

      <DashboardStats overview={siteView?.posts ?? myPosts} />
    </div>
  );
}
