"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  useFilteredPosts,
  type PostFilterMode,
} from "@/hooks/api/useFilteredPosts";
import { PostSortBy } from "@/types/api/post";
import { SearchFilters } from "./SearchFilters";
import { SearchResults } from "./SearchResults";
import { SearchPagination } from "./SearchPagination";

const PAGE_SIZE = 9;

function parseMode(value: string | null): PostFilterMode {
  return value === "search" || value === "category" || value === "tags"
    ? value
    : "all";
}

function parseSortBy(value: string | null): PostSortBy {
  const parsed = Number(value);
  if (parsed === PostSortBy.Oldest || parsed === PostSortBy.MostViewed) {
    return parsed;
  }
  return PostSortBy.Newest;
}

export function SearchPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const mode = parseMode(searchParams.get("mode"));
  const term = searchParams.get("term") ?? "";
  const categorySlug = searchParams.get("category") ?? "";
  const tagsParam = searchParams.get("tags") ?? "";
  const sortBy = parseSortBy(searchParams.get("sort"));
  const tags = useMemo(
    () =>
      tagsParam
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
        .slice(0, 10),
    [tagsParam],
  );
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [searchParams, router, pathname],
  );

  const buildPageHref = useCallback(
    (targetPage: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (targetPage > 1) {
        params.set("page", String(targetPage));
      } else {
        params.delete("page");
      }
      const query = params.toString();
      return query ? `${pathname}?${query}` : pathname;
    },
    [searchParams, pathname],
  );

  const handleModeChange = (nextMode: PostFilterMode) => {
    updateParams({
      mode: nextMode === "all" ? null : nextMode,
      term: null,
      category: null,
      tags: null,
      page: null,
    });
  };

  const handleTermChange = (value: string) =>
    updateParams({ term: value || null, page: null });
  const handleCategoryChange = (value: string) =>
    updateParams({ category: value || null, page: null });
  const handleTagsChange = (value: string) =>
    updateParams({ tags: value || null, page: null });
  const handleSortByChange = (value: PostSortBy) =>
    updateParams({
      sort: value === PostSortBy.Newest ? null : String(value),
      page: null,
    });
  const handlePageChange = (nextPage: number) => {
    router.replace(buildPageHref(nextPage), { scroll: false });
  };

  const { data, isLoading, isFetching, isError } = useFilteredPosts({
    mode,
    term,
    categorySlug,
    tags,
    sortBy,
    page,
    pageSize: PAGE_SIZE,
  });

  const awaitingInput =
    (mode === "search" && term.trim().length === 0) ||
    (mode === "category" && categorySlug.length === 0) ||
    (mode === "tags" && tags.length === 0);

  const totalPages = data
    ? Math.max(1, Math.ceil(data.totalCount / PAGE_SIZE))
    : 1;

  return (
    <div className="mt-6 flex w-full flex-col gap-6 px-4 sm:mt-10 xl:w-6xl xl:px-0">
      <div>
        <h1 className="font-space-grotesk text-4xl font-bold text-slate-900 dark:text-slate-200">
          Browse posts
        </h1>
        <p className="text-slate-zero">
          Search, filter by category or tag, and page through everything that's
          been published.
        </p>
      </div>

      <SearchFilters
        mode={mode}
        term={term}
        categorySlug={categorySlug}
        tagsInput={tagsParam}
        sortBy={sortBy}
        onModeChange={handleModeChange}
        onTermChange={handleTermChange}
        onCategoryChange={handleCategoryChange}
        onTagsChange={handleTagsChange}
        onSortByChange={handleSortByChange}
      />

      <SearchResults
        posts={data?.items ?? []}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        awaitingInput={awaitingInput}
      />

      {totalPages > 1 && (
        <SearchPagination
          page={page}
          totalPages={totalPages}
          buildHref={buildPageHref}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
