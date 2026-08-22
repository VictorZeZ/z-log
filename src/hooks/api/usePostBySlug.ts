import { useQuery } from "@tanstack/react-query";
import { getPostBySlug } from "@/lib/api/post";

export function postBySlugQueryKey(slug: string) {
  return ["post", slug] as const;
}

export function usePostBySlug(slug: string) {
  return useQuery({
    queryKey: postBySlugQueryKey(slug),
    queryFn: () => getPostBySlug(slug),
    enabled: Boolean(slug),
    retry: false,
  });
}
