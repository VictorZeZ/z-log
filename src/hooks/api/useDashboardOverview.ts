import { useQuery } from "@tanstack/react-query";
import { getDashboardOverview } from "@/lib/api/dashboard";

export const dashboardQueryKey = ["dashboard"] as const;

export function useDashboardOverview(enabled: boolean) {
  return useQuery({
    queryKey: [...dashboardQueryKey, "overview"],
    queryFn: getDashboardOverview,
    enabled,
    retry: false,
  });
}
