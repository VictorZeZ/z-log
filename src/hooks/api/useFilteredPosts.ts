import { useQuery } from "@tanstack/react-query";
import {
  getAllPublishedPosts,
  getPostsByCategory,
  getPostsByTag,
  searchPosts,
} from "@/lib/api/post";
import type { PostSortBy } from "@/types/api/post";

// The backend has separate, mutually-exclusive endpoints per filter type -
// there is no single query that combines a search term, a category, and
// tags at once. "mode" reflects that: exactly one filter is active at a time.
export type PostFilterMode = "all" | "search" | "category" | "tags";

type UseFilteredPostsParams = {
  mode: PostFilterMode;
  term: string;
  categorySlug: string;
  tags: string[];
  sortBy: PostSortBy;
  page: number;
  pageSize: number;
};

export function useFilteredPosts({
  mode,
  term,
  categorySlug,
  tags,
  sortBy,
  page,
  pageSize,
}: UseFilteredPostsParams) {
  return useQuery({
    queryKey: [
      "posts",
      "filtered",
      mode,
      term,
      categorySlug,
      tags,
      sortBy,
      page,
      pageSize,
    ],
    queryFn: () => {
      switch (mode) {
        case "search":
          return searchPosts(term, pageSize, page, sortBy);
        case "category":
          return getPostsByCategory(categorySlug, pageSize, page, sortBy);
        case "tags":
          return getPostsByTag(tags, pageSize, page, sortBy);
        default:
          return getAllPublishedPosts(pageSize, page, sortBy);
      }
    },
    enabled:
      mode === "all" ||
      (mode === "search" && term.trim().length > 0) ||
      (mode === "category" && categorySlug.length > 0) ||
      (mode === "tags" && tags.length > 0),
    placeholderData: (previousData) => previousData,
  });
}
