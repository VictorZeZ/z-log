import { useQuery } from "@tanstack/react-query";
import { getPostsByAuthor } from "@/lib/api/post";

const PAGE_SIZE = 5;

export function useAuthorPosts(authorId: string) {
  return useQuery({
    queryKey: ["posts", "author", authorId],
    queryFn: () => getPostsByAuthor(authorId, PAGE_SIZE),
    enabled: Boolean(authorId),
  });
}
