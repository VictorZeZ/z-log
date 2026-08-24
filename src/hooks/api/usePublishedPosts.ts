import { useQuery } from "@tanstack/react-query";
import { getAllPublishedPosts } from "@/lib/api/post";

export function usePublishedPosts(pageSize: number) {
  return useQuery({
    queryKey: ["posts", "published", pageSize],
    queryFn: () => getAllPublishedPosts(pageSize),
  });
}
