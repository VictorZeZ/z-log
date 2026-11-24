import { useQuery } from "@tanstack/react-query";
import { getDashboardPosts } from "@/lib/api/post";
import type { DashboardPostsParams } from "@/types/api/post";

export const postsQueryKey = ["posts"] as const;

export function useDashboardPosts(params: DashboardPostsParams) {
  return useQuery({
    queryKey: [...postsQueryKey, "dashboard", params],
    queryFn: () => getDashboardPosts(params),
    retry: false,
    placeholderData: (previousData) => previousData,
  });
}
