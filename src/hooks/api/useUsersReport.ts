import { useQuery } from "@tanstack/react-query";
import { getUsersReport } from "@/lib/api/dashboard";
import { dashboardQueryKey } from "@/hooks/api/useDashboardOverview";

export function useUsersReport(enabled: boolean, days: number) {
  return useQuery({
    queryKey: [...dashboardQueryKey, "users", days],
    queryFn: () => getUsersReport(days),
    enabled,
    retry: false,
    placeholderData: (previousData) => previousData,
  });
}
