"use client";

import { useEffect, useState } from "react";
import { Shimmer } from "@shimmer-from-structure/react";
import { SearchPagination } from "@/components/pages/search/SearchPagination";
import { Button } from "@/components/ui/button";
import { useAdminCategories } from "@/hooks/api/useAdminCategories";
import { getErrorMessage } from "@/lib/api/errorMessages";
import { cn } from "@/lib/utils";
import {
  CategorySortBy,
  type AdminCategoryResponse,
} from "@/types/api/category";
import { ApiError } from "@/types/api/common";
import type { CategoryOverviewResponse } from "@/types/api/dashboard";
import { CategoryCard } from "./CategoryCard";
import { CategoriesToolbar, type CategoriesFilters } from "./CategoriesToolbar";

const PAGE_SIZE = 12;
const SKELETON_COUNT = 6;
const GRID_CLASS_NAME =
  "grid w-full grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4";

const DEFAULT_FILTERS: CategoriesFilters = {
  deleted: "All",
  sortBy: CategorySortBy.Newest,
  postStatuses: [],
};

const buildHref = () => "#";

type CategoriesListProps = {
  counts?: CategoryOverviewResponse;
  restoringId?: string;
  onRename: (category: AdminCategoryResponse) => void;
  onDelete: (category: AdminCategoryResponse) => void;
  onRestore: (category: AdminCategoryResponse) => void;
};

export function CategoriesList({
  counts,
  restoringId,
  onRename,
  onDelete,
  onRestore,
}: CategoriesListProps) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, error, refetch } = useAdminCategories({
    page,
    pageSize: PAGE_SIZE,
    ...filters,
  });

  useEffect(() => {
    if (data && data.totalPages > 0 && page > data.totalPages) {
      setPage(data.totalPages);
    }
  }, [data, page]);

  const handleFiltersChange = (changes: Partial<CategoriesFilters>) => {
    setFilters((previous) => ({ ...previous, ...changes }));
    setPage(1);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <Shimmer loading>
          <div className={GRID_CLASS_NAME}>
            {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
              <div key={index} className="bg-muted h-56 rounded-3xl" />
            ))}
          </div>
        </Shimmer>
      );
    }

    if (!data) {
      return (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <p className="text-slate-zero text-sm">
            {error instanceof ApiError
              ? getErrorMessage(error)
              : "Couldn't load categories."}
          </p>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Try again
          </Button>
        </div>
      );
    }

    if (data.items.length === 0) {
      return (
        <p className="text-slate-zero py-16 text-center text-sm">
          No categories match these filters.
        </p>
      );
    }

    const firstItem = (data.page - 1) * data.pageSize + 1;
    const lastItem = firstItem + data.items.length - 1;

    return (
      <>
        <div
          className={cn(
            GRID_CLASS_NAME,
            "duration-200",
            isFetching && "opacity-60",
          )}
        >
          {data.items.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              isRestoring={restoringId === category.id}
              onRename={onRename}
              onDelete={onDelete}
              onRestore={onRestore}
            />
          ))}
        </div>

        <div className="flex flex-col items-center gap-3">
          <p className="text-slate-zero text-xs">
            Showing {firstItem.toLocaleString()}–{lastItem.toLocaleString()} of{" "}
            {data.totalCount.toLocaleString()} categories
          </p>

          {data.totalPages > 1 && (
            <SearchPagination
              page={data.page}
              totalPages={data.totalPages}
              hasPreviousPage={data.hasPreviousPage}
              hasNextPage={data.hasNextPage}
              buildHref={buildHref}
              onPageChange={setPage}
            />
          )}
        </div>
      </>
    );
  };

  return (
    <section className="flex w-full flex-col gap-4">
      <CategoriesToolbar
        filters={filters}
        counts={counts}
        onChange={handleFiltersChange}
      />
      {renderContent()}
    </section>
  );
}
