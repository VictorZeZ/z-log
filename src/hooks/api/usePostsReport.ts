import { useQuery } from "@tanstack/react-query";
import { getPostsReport } from "@/lib/api/dashboard";
import { dashboardQueryKey } from "@/hooks/api/useDashboardOverview";
import type { PostsReportFilters } from "@/types/api/dashboard";

export function usePostsReport(
  enabled: boolean,
  days: number,
  filters: PostsReportFilters = {},
) {
  return useQuery({
    queryKey: [
      ...dashboardQueryKey,
      "posts",
      days,
      filters.categoryId ?? null,
      filters.authorId ?? null,
    ],
    queryFn: () => getPostsReport(days, filters),
    enabled,
    retry: false,
    placeholderData: (previousData) => previousData,
  });
}
