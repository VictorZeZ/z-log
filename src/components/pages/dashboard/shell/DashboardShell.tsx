"use client";

import Cookies from "js-cookie";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/store/hooks";
import { dashboardNavGroups } from "@/lib/navigation";
import { UserLevel, isUserLevelAtLeast } from "@/types/api/account";
import { DashboardNav } from "./DashboardNav";
import { DashboardMobileNav } from "./DashboardMobileNav";

const ADMIN_ROUTES = dashboardNavGroups
  .filter((group) => group.adminOnly)
  .flatMap((group) => group.items.map((item) => item.href));

export function DashboardShell({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAppSelector((state) => state.user.data);
  const isUserLoading = useAppSelector((state) => state.user.isLoading);

  const isElevated = Boolean(
    user && isUserLevelAtLeast(user.level, UserLevel.Admin),
  );
  const isForbiddenRoute =
    !isElevated && ADMIN_ROUTES.some((route) => pathname.startsWith(route));

  useEffect(() => {
    // Guard against the hydration-race window where isUserLoading hasn't
    // flipped to true yet (LoadSession's effect hasn't run), even though a
    // session cookie exists and is about to be restored.
    if (!isUserLoading && !user && !Cookies.get("token")) {
      router.replace("/login");
    }
  }, [isUserLoading, user, router]);

  useEffect(() => {
    if (user && isForbiddenRoute) {
      router.replace("/dashboard");
    }
  }, [user, isForbiddenRoute, router]);

  if (isUserLoading || !user || isForbiddenRoute) {
    return null;
  }

  return (
    <div className="mt-6 flex w-full max-w-7xl flex-col gap-6 px-4 pb-8 sm:mt-10 lg:flex-row lg:gap-8 xl:px-0">
      <aside className="hidden w-60 shrink-0 lg:block">
        <div className="bg-slate-two sticky top-20 rounded-3xl border p-3 shadow-md">
          <DashboardNav />
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col gap-8">
        <div className="lg:hidden">
          <DashboardMobileNav />
        </div>
        {children}
      </div>
    </div>
  );
}
