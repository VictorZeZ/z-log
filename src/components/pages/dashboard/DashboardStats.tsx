import { CircleAlert, Eye, FilePenLine, FileText } from "lucide-react";
import type { PostOverviewResponse } from "@/types/api/dashboard";

type DashboardStatsProps = {
  overview: PostOverviewResponse;
};

export function DashboardStats({ overview }: DashboardStatsProps) {
  const stats = [
    {
      label: "Published posts",
      value: overview.publishedCount,
      icon: FileText,
    },
    { label: "Drafts", value: overview.draftCount, icon: FilePenLine },
    {
      label: "Pending review",
      value: overview.pendingApprovalCount,
      icon: CircleAlert,
    },
    { label: "Total views", value: overview.totalViewCount, icon: Eye },
  ];

  return (
    <section className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="bg-slate-two flex min-h-36 flex-col justify-between rounded-3xl border p-5 shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-slate-zero text-sm font-medium">{label}</span>
            <span className="bg-indigo-zero/10 text-indigo-zero flex size-9 items-center justify-center rounded-2xl">
              <Icon size={18} />
            </span>
          </div>
          <p className="font-space-grotesk text-3xl font-bold">
            {value.toLocaleString()}
          </p>
        </div>
      ))}
    </section>
  );
}
