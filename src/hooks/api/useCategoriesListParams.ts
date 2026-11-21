"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MAX_CATEGORY_TERM_LENGTH } from "@/lib/validations/category";
import {
  CategorySortBy,
  type AdminCategoriesFilters,
} from "@/types/api/category";
import type { TriStateFilter } from "@/types/api/dashboard";
import { PostStatus } from "@/types/api/post";

export type CategoriesListState = AdminCategoriesFilters & { page: number };

type ParamValue = string | string[] | null;

const SORT_VALUES = Object.values(CategorySortBy);
const POST_STATUS_VALUES = Object.values(PostStatus);

function parseSortBy(value: string | null): CategorySortBy {
  return (
    SORT_VALUES.find((option) => option === value) ?? CategorySortBy.Newest
  );
}

function parseDeleted(value: string | null): TriStateFilter {
  return value === "Yes" || value === "No" ? value : "All";
}

function parsePostStatuses(values: string[]): PostStatus[] {
  return POST_STATUS_VALUES.filter((status) => values.includes(status));
}

export function useCategoriesListParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const state = useMemo<CategoriesListState>(
    () => ({
      term: (searchParams.get("term") ?? "")
        .trim()
        .slice(0, MAX_CATEGORY_TERM_LENGTH),
      sortBy: parseSortBy(searchParams.get("sort")),
      deleted: parseDeleted(searchParams.get("deleted")),
      postStatuses: parsePostStatuses(searchParams.getAll("statuses")),
      page: Math.max(1, Math.floor(Number(searchParams.get("page"))) || 1),
    }),
    [searchParams],
  );

  const replaceParams = useCallback(
    (updates: Record<string, ParamValue>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        params.delete(key);
        const values = Array.isArray(value) ? value : value ? [value] : [];
        values.forEach((item) => params.append(key, item));
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
    (changes: Partial<AdminCategoriesFilters>) => {
      const updates: Record<string, ParamValue> = { page: null };

      if (changes.term !== undefined) {
        updates.term = changes.term || null;
      }
      if (changes.sortBy !== undefined) {
        updates.sort =
          changes.sortBy === CategorySortBy.Newest ? null : changes.sortBy;
      }
      if (changes.deleted !== undefined) {
        updates.deleted = changes.deleted === "All" ? null : changes.deleted;
      }
      if (changes.postStatuses !== undefined) {
        updates.statuses = changes.postStatuses;
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
