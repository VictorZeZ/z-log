"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { MAX_POST_TERM_LENGTH } from "@/lib/validations/post";
import {
  PostSortBy,
  PostStatus,
  postSortByOptions,
  type DashboardPostsFilters,
  type PostFilter,
} from "@/types/api/post";

export type PostsListState = DashboardPostsFilters & { page: number };

const FILTER_VALUES: PostFilter[] = ["All", ...Object.values(PostStatus)];

function parseFilter(value: string | null): PostFilter {
  return FILTER_VALUES.find((option) => option === value) ?? "All";
}

function parseSortBy(value: string | null): PostSortBy {
  return (
    postSortByOptions.find((option) => String(option) === value) ??
    PostSortBy.Newest
  );
}

function parseId(value: string | null): string {
  return value !== null && z.uuid().safeParse(value).success ? value : "";
}

export function usePostsListParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const state = useMemo<PostsListState>(
    () => ({
      term: (searchParams.get("term") ?? "")
        .trim()
        .slice(0, MAX_POST_TERM_LENGTH),
      filter: parseFilter(searchParams.get("filter")),
      sortBy: parseSortBy(searchParams.get("sort")),
      categoryId: parseId(searchParams.get("category")),
      authorId: parseId(searchParams.get("author")),
      page: Math.max(1, Math.floor(Number(searchParams.get("page"))) || 1),
    }),
    [searchParams],
  );

  const replaceParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [searchParams, router, pathname],
  );

  // Any filter change goes back to the first page.
  const setFilters = useCallback(
    (changes: Partial<DashboardPostsFilters>) => {
      const updates: Record<string, string | null> = { page: null };

      if (changes.term !== undefined) {
        updates.term = changes.term || null;
      }
      if (changes.filter !== undefined) {
        updates.filter = changes.filter === "All" ? null : changes.filter;
      }
      if (changes.sortBy !== undefined) {
        updates.sort =
          changes.sortBy === PostSortBy.Newest ? null : String(changes.sortBy);
      }
      if (changes.categoryId !== undefined) {
        updates.category = changes.categoryId || null;
      }
      if (changes.authorId !== undefined) {
        updates.author = changes.authorId || null;
      }

      replaceParams(updates);
    },
    [replaceParams],
  );

  const setPage = useCallback(
    (page: number) => replaceParams({ page: page > 1 ? String(page) : null }),
    [replaceParams],
  );

  return { state, setFilters, setPage };
}
