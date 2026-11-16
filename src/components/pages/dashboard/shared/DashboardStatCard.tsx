import type { LucideIcon } from "lucide-react";
import { DashboardSparkline } from "./DashboardSparkline";

export type DashboardStatCardProps = {
  label: string;
  value: number;
  icon: LucideIcon;
  footer?: string;
  series?: number[];
};

export function DashboardStatCard({
  label,
  value,
  icon: Icon,
  footer,
  series,
}: DashboardStatCardProps) {
  return (
    <div className="bg-slate-two flex min-h-36 flex-col justify-between gap-3 rounded-3xl border p-5 shadow-md">
      <div className="flex items-center justify-between">
        <span className="text-slate-zero text-sm font-medium">{label}</span>
        <span className="bg-indigo-zero/10 text-indigo-zero flex size-9 items-center justify-center rounded-2xl">
          <Icon size={18} />
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <p className="font-space-grotesk text-3xl font-bold">
          {value.toLocaleString()}
        </p>
        <div className="flex min-h-8 items-end justify-between gap-2">
          <span className="text-slate-zero text-xs">{footer}</span>
          {series && <DashboardSparkline series={series} />}
        </div>
      </div>
    </div>
  );
}
