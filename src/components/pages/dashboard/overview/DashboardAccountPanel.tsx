import { DashboardPanel } from "@/components/pages/dashboard/shared/DashboardPanel";
import { cn, formatDate } from "@/lib/utils";
import { userLevelLabels } from "@/types/api/account";
import type { DashboardProfileResponse } from "@/types/api/dashboard";

type DashboardAccountPanelProps = {
  profile: DashboardProfileResponse;
};

type AccountRow = {
  label: string;
  value: string;
  tone?: "positive" | "neutral";
};

const toneClassNames = {
  positive: "bg-emerald-zero/15 text-emerald-zero",
  neutral: "bg-slate-one text-slate-zero",
};

export function DashboardAccountPanel({ profile }: DashboardAccountPanelProps) {
  const rows: AccountRow[] = [
    { label: "Account level", value: userLevelLabels[profile.level] },
    { label: "Member since", value: formatDate(profile.createdAt) },
    {
      label: "Email",
      value: profile.isEmailConfirmed ? "Confirmed" : "Unconfirmed",
      tone: profile.isEmailConfirmed ? "positive" : "neutral",
    },
    {
      label: "Two-factor",
      value: profile.twoFactorEnabled ? "Enabled" : "Disabled",
      tone: profile.twoFactorEnabled ? "positive" : "neutral",
    },
  ];

  return (
    <DashboardPanel
      title="Account"
      description="Your profile and security at a glance."
    >
      <dl className="flex flex-col gap-4">
        {rows.map(({ label, value, tone }) => (
          <div
            key={label}
            className="flex items-center justify-between text-sm"
          >
            <dt className="text-slate-zero">{label}</dt>
            <dd
              className={cn(
                "font-medium",
                tone &&
                  cn(
                    "rounded-full px-2.5 py-1 text-xs font-semibold",
                    toneClassNames[tone],
                  ),
              )}
            >
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </DashboardPanel>
  );
}
