import { Ban, Eye, FileText, Users } from "lucide-react";
import type { PlatformStatsResponse } from "@/types/api/dashboard";
import { DashboardStatGrid } from "./DashboardStats";

type DashboardPlatformStatsProps = {
  platformStats: PlatformStatsResponse;
};

export function DashboardPlatformStats({
  platformStats,
}: DashboardPlatformStatsProps) {
  return (
    <DashboardStatGrid
      stats={[
        {
          label: "Total users",
          value: platformStats.totalUserCount,
          icon: Users,
        },
        {
          label: "Banned users",
          value: platformStats.bannedUserCount,
          icon: Ban,
        },
        {
          label: "Total posts",
          value: platformStats.totalPostCount,
          icon: FileText,
        },
        {
          label: "Total views",
          value: platformStats.totalViewCount,
          icon: Eye,
        },
      ]}
    />
  );
}
