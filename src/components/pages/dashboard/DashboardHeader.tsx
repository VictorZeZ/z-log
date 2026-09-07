import { LayoutDashboard, Plus } from "lucide-react";
import { userLevelLabels } from "@/types/api/account";
import type { DashboardProfileResponse } from "@/types/api/dashboard";

type DashboardHeaderProps = {
  profile: DashboardProfileResponse;
};

export function DashboardHeader({ profile }: DashboardHeaderProps) {
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
            A clear overview of your publishing activity, content, and account.
          </p>
        </div>
      </div>

      <button
        type="button"
        disabled
        title="Coming soon"
        className="bg-indigo-zero flex w-fit items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-md transition disabled:pointer-events-none disabled:opacity-50"
      >
        <Plus size={18} />
        New post
      </button>
    </section>
  );
}
