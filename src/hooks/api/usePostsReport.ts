import { useQuery } from "@tanstack/react-query";
import { getPostsReport } from "@/lib/api/dashboard";
import { dashboardQueryKey } from "@/hooks/api/useDashboardOverview";

export function usePostsReport(
  enabled: boolean,
  days: number,
  categoryId?: string,
) {
  return useQuery({
    queryKey: [...dashboardQueryKey, "posts", days, categoryId ?? null],
    queryFn: () => getPostsReport(days, categoryId),
    enabled,
    retry: false,
    placeholderData: (previousData) => previousData,
  });
}
