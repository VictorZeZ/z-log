import { LayoutDashboard, Plus } from "lucide-react";
import Link from "next/link";
import { userLevelLabels } from "@/types/api/account";
import type {
  DashboardProfileResponse,
  DashboardScope,
} from "@/types/api/dashboard";

type DashboardHeaderProps = {
  profile: DashboardProfileResponse;
  scope: DashboardScope;
  children?: React.ReactNode;
};

const DESCRIPTIONS: Record<DashboardScope, string> = {
  mine: "A clear overview of your publishing activity, content, and account.",
  site: "A clear overview of activity, content, and moderation across the entire site.",
};

export function DashboardHeader({
  profile,
  scope,
  children,
}: DashboardHeaderProps) {
  return (
    <section className="flex w-full flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div className="flex flex-col gap-3">
        <div className="bg-indigo-zero/20 text-indigo-zero flex w-fit items-center gap-2 rounded-full border-2 px-3 py-1 shadow-sm select-none">
          <LayoutDashboard size={17} />
          <span className="text-xs font-bold tracking-wide uppercase">
            {userLevelLabels[profile.level]} workspace
          </span>
        </div>

        <div>
          <h1 className="font-space-grotesk text-4xl font-bold tracking-tight sm:text-5xl">
            Dashboard
          </h1>
          <p className="text-slate-zero mt-2 max-w-2xl text-sm sm:text-base">
            {DESCRIPTIONS[scope]}
          </p>
        </div>
      </div>

      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center md:w-auto">
        {children}

        <Link
          href="/posts/create"
          className="bg-indigo-zero flex w-fit items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-md transition"
        >
          <Plus size={18} />
          New post
        </Link>
      </div>
    </section>
  );
}
