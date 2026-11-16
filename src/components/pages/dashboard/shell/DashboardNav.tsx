"use client";

import { usePathname } from "next/navigation";
import { NavItem } from "@/components/layout/SiteNav/NavItem";
import { useAppSelector } from "@/lib/store/hooks";
import { dashboardNavGroups } from "@/lib/navigation";
import {
  UserLevel,
  isUserLevelAtLeast,
  userLevelLabels,
} from "@/types/api/account";

const OVERVIEW_HREF = "/dashboard";

type DashboardNavProps = {
  onNavigate?: () => void;
};

function isActive(pathname: string, href: string): boolean {
  return href === OVERVIEW_HREF ? pathname === href : pathname.startsWith(href);
}

export function DashboardNav({ onNavigate }: DashboardNavProps) {
  const pathname = usePathname();
  const user = useAppSelector((state) => state.user.data);

  if (!user) {
    return null;
  }

  const isElevated = isUserLevelAtLeast(user.level, UserLevel.Admin);

  return (
    <div className="flex flex-col gap-5">
      <nav aria-label="Dashboard" className="flex flex-col gap-5">
        {dashboardNavGroups
          .filter((group) => !group.adminOnly || isElevated)
          .map((group) => (
            <div key={group.label} className="flex flex-col gap-1">
              <p className="text-slate-zero px-3 pb-1 text-[11px] font-bold tracking-widest uppercase">
                {group.label}
              </p>
              {group.items.map((item) => (
                <NavItem
                  key={item.href}
                  label={
                    item.comingSoon ? `${item.title} (Coming soon)` : item.title
                  }
                  icon={item.icon}
                  href={item.href}
                  active={isActive(pathname, item.href)}
                  disabled={item.comingSoon}
                  onClick={onNavigate}
                />
              ))}
            </div>
          ))}
      </nav>

      <div className="flex items-center gap-3 border-t px-3 pt-4">
        <div className="bg-indigo-zero/15 text-indigo-zero flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-bold">
          {user.fullName.charAt(0).toUpperCase()}
        </div>
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-medium">{user.fullName}</span>
          <span className="text-slate-zero text-xs">
            {userLevelLabels[user.level]}
          </span>
        </div>
      </div>
    </div>
  );
}
