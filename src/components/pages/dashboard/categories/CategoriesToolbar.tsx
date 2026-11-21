"use client";

import { useCallback } from "react";
import {
  DashboardPillTabs,
  type DashboardPillOption,
} from "@/components/pages/dashboard/shared/DashboardPillTabs";
import { POST_STATUS_SERIES } from "@/components/pages/dashboard/shared/postStatus";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CategorySortBy,
  categorySortByLabels,
  type AdminCategoriesFilters,
} from "@/types/api/category";
import type {
  CategoryOverviewResponse,
  TriStateFilter,
} from "@/types/api/dashboard";
import { PostStatus, postStatusLabels } from "@/types/api/post";
import { CategoriesSearchInput } from "./CategoriesSearchInput";

const SORT_OPTIONS = Object.values(CategorySortBy);
const POST_STATUSES = POST_STATUS_SERIES.map(({ status }) => status);

type CategoriesToolbarProps = {
  filters: AdminCategoriesFilters;
  counts?: CategoryOverviewResponse;
  onChange: (changes: Partial<AdminCategoriesFilters>) => void;
};

export function CategoriesToolbar({
  filters,
  counts,
  onChange,
}: CategoriesToolbarProps) {
  const handleTermChange = useCallback(
    (term: string) => onChange({ term }),
    [onChange],
  );

  const deletedOptions: DashboardPillOption<TriStateFilter>[] = [
    { value: "All", label: "All", count: counts?.totalCount },
    { value: "No", label: "Active", count: counts?.activeCount },
    { value: "Yes", label: "Deleted", count: counts?.deletedCount },
  ];

  const handleStatusToggle = (status: PostStatus, checked: boolean) => {
    onChange({
      postStatuses: POST_STATUSES.filter((option) =>
        option === status ? checked : filters.postStatuses.includes(option),
      ),
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <CategoriesSearchInput
          term={filters.term}
          onTermChange={handleTermChange}
        />

        <Select
          value={filters.sortBy}
          onValueChange={(value) =>
            onChange({ sortBy: value as CategorySortBy })
          }
        >
          <SelectTrigger
            className="w-full sm:w-44"
            aria-label="Sort categories"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option} value={option}>
                {categorySortByLabels[option]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <DashboardPillTabs
        options={deletedOptions}
        value={filters.deleted}
        onChange={(deleted) => onChange({ deleted })}
        ariaLabel="Category status"
      />

      <div
        role="group"
        aria-labelledby="category-post-statuses-label"
        className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm"
      >
        <span id="category-post-statuses-label" className="text-slate-zero">
          Count posts with status
        </span>
        {POST_STATUSES.map((status) => (
          <label
            key={status}
            className="flex cursor-pointer items-center gap-1.5"
          >
            <input
              type="checkbox"
              checked={filters.postStatuses.includes(status)}
              onChange={(event) =>
                handleStatusToggle(status, event.target.checked)
              }
              className="accent-indigo-zero size-4"
            />
            {postStatusLabels[status]}
          </label>
        ))}
        {filters.postStatuses.length === 0 && (
          <span className="text-slate-zero text-xs">
            None selected: every status is counted.
          </span>
        )}
      </div>
    </div>
  );
}
