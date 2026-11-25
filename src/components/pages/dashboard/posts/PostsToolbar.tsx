"use client";

import { useCallback } from "react";
import {
  DashboardPillTabs,
  type DashboardPillOption,
} from "@/components/pages/dashboard/shared/DashboardPillTabs";
import { DashboardSearchInput } from "@/components/pages/dashboard/shared/DashboardSearchInput";
import { POST_STATUS_SERIES } from "@/components/pages/dashboard/shared/postStatus";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/hooks/api/useCategories";
import { MAX_POST_TERM_LENGTH } from "@/lib/validations/post";
import {
  PostSortBy,
  postSortByLabels,
  postSortByOptions,
  postStatusLabels,
  type DashboardPostsFilters,
  type PostFilter,
} from "@/types/api/post";
import { PostsAuthorFilter } from "./PostsAuthorFilter";

const ALL_CATEGORIES = "all";

const FILTER_OPTIONS: DashboardPillOption<PostFilter>[] = [
  { value: "All", label: "All" },
  ...POST_STATUS_SERIES.map(({ status }) => ({
    value: status,
    label: postStatusLabels[status],
  })),
];

type PostsToolbarProps = {
  filters: DashboardPostsFilters;
  viewerId: string;
  canFilterByAuthor: boolean;
  onChange: (changes: Partial<DashboardPostsFilters>) => void;
};

export function PostsToolbar({
  filters,
  viewerId,
  canFilterByAuthor,
  onChange,
}: PostsToolbarProps) {
  const { data: categories } = useCategories();

  const handleTermChange = useCallback(
    (term: string) => onChange({ term }),
    [onChange],
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 xl:flex-row xl:items-center xl:justify-between">
        <DashboardSearchInput
          term={filters.term}
          onTermChange={handleTermChange}
          maxLength={MAX_POST_TERM_LENGTH}
          placeholder="Search posts by title or content…"
          ariaLabel="Search posts"
        />

        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          {canFilterByAuthor && (
            <PostsAuthorFilter
              authorId={filters.authorId}
              viewerId={viewerId}
              onChange={(authorId) => onChange({ authorId })}
            />
          )}

          <Select
            value={filters.categoryId || ALL_CATEGORIES}
            onValueChange={(value) =>
              onChange({ categoryId: value === ALL_CATEGORIES ? "" : value })
            }
          >
            <SelectTrigger
              className="w-full sm:w-44"
              aria-label="Filter by category"
            >
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_CATEGORIES}>All categories</SelectItem>
              {categories?.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={String(filters.sortBy)}
            onValueChange={(value) =>
              onChange({ sortBy: Number(value) as PostSortBy })
            }
          >
            <SelectTrigger className="w-full sm:w-40" aria-label="Sort posts">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {postSortByOptions.map((option) => (
                <SelectItem key={option} value={String(option)}>
                  {postSortByLabels[option]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <DashboardPillTabs
        options={FILTER_OPTIONS}
        value={filters.filter}
        onChange={(filter) => onChange({ filter })}
        ariaLabel="Post status"
      />
    </div>
  );
}
