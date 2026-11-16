import { useQuery } from "@tanstack/react-query";
import { getPendingApprovalPosts } from "@/lib/api/post";

export function usePendingPosts(pageSize: number) {
  return useQuery({
    queryKey: ["posts", "pending", pageSize],
    queryFn: () => getPendingApprovalPosts(pageSize),
  });
}
