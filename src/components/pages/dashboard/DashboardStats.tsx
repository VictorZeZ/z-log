import { CircleAlert, Eye, FilePenLine, FileText } from "lucide-react";
import type { MyContentResponse } from "@/types/api/dashboard";

type DashboardStatsProps = {
  content: MyContentResponse;
};

export function DashboardStats({ content }: DashboardStatsProps) {
  const stats = [
    { label: "Published posts", value: content.publishedCount, icon: FileText },
    { label: "Drafts", value: content.draftCount, icon: FilePenLine },
    { label: "Total views", value: content.totalViewCount, icon: Eye },
    {
      label: "Pending review",
      value: content.pendingApprovalCount,
      icon: CircleAlert,
    },
  ];

  return (
    <section className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="bg-slate-two flex min-h-36 flex-col justify-between rounded-3xl border p-5 shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-slate-zero text-sm font-medium">
                {stat.label}
              </span>
              <span className="bg-indigo-zero/10 text-indigo-zero flex size-9 items-center justify-center rounded-2xl">
                <Icon size={18} />
              </span>
            </div>
            <p className="font-space-grotesk text-3xl font-bold">
              {stat.value.toLocaleString()}
            </p>
          </div>
        );
      })}
    </section>
  );
}
