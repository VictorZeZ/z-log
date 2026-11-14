import { useQuery } from "@tanstack/react-query";
import { getCategoriesReport } from "@/lib/api/dashboard";
import { dashboardQueryKey } from "@/hooks/api/useDashboardOverview";

export function useCategoriesReport(enabled: boolean, days: number) {
  return useQuery({
    queryKey: [...dashboardQueryKey, "categories", days],
    queryFn: () => getCategoriesReport(days),
    enabled,
    retry: false,
    placeholderData: (previousData) => previousData,
  });
}
