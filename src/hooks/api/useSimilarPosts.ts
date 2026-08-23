import { useQuery } from "@tanstack/react-query";
import { getPostsByTag } from "@/lib/api/post";

const PAGE_SIZE = 5;

export function useSimilarPosts(tags: string[]) {
  return useQuery({
    queryKey: ["posts", "similar", tags],
    queryFn: () => getPostsByTag(tags, PAGE_SIZE),
    enabled: tags.length > 0,
  });
}
