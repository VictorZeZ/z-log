import {
  CalendarDays,
  CheckCircle2,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import { userLevelLabels } from "@/types/api/account";
import type { DashboardProfileResponse } from "@/types/api/dashboard";
import { cn, formatDate } from "@/lib/utils";

type DashboardAccountOverviewProps = {
  profile: DashboardProfileResponse;
};

export function DashboardAccountOverview({
  profile,
}: DashboardAccountOverviewProps) {
  return (
    <div className="bg-slate-two rounded-3xl border p-5 shadow-md sm:p-6">
      <div className="mb-6">
        <h2 className="font-space-grotesk text-xl font-bold">
          Account overview
        </h2>
        <p className="text-slate-zero mt-1 text-sm">
          Your current workspace status.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="bg-slate-one/60 rounded-2xl p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-zero/15 text-indigo-zero flex size-11 items-center justify-center rounded-full font-bold">
                {profile.fullName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold">{profile.fullName}</p>
                <p className="text-slate-zero text-xs">
                  {userLevelLabels[profile.level]} account
                </p>
              </div>
            </div>

            {profile.isEmailConfirmed ? (
              <CheckCircle2 className="text-emerald-500" size={19} />
            ) : (
              <ShieldAlert className="text-amber-500" size={19} />
            )}
          </div>
        </div>

        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-slate-zero" size={18} />
            <span className="text-sm">Two-factor authentication</span>
          </div>
          <span
            className={cn(
              "text-xs font-semibold",
              profile.twoFactorEnabled
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-amber-600 dark:text-amber-400",
            )}
          >
            {profile.twoFactorEnabled ? "Enabled" : "Disabled"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CalendarDays className="text-slate-zero" size={18} />
            <span className="text-sm">Member since</span>
          </div>
          <span className="text-xs font-semibold">
            {formatDate(profile.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}
