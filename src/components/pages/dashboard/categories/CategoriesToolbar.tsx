"use client";

import { useCallback } from "react";
import {
  DashboardPillTabs,
  type DashboardPillOption,
} from "@/components/pages/dashboard/shared/DashboardPillTabs";
import { DashboardSearchInput } from "@/components/pages/dashboard/shared/DashboardSearchInput";
import { POST_STATUS_SERIES } from "@/components/pages/dashboard/shared/postStatus";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MAX_CATEGORY_TERM_LENGTH } from "@/lib/validations/category";
import { cn } from "@/lib/utils";
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
        <DashboardSearchInput
          term={filters.term}
          onTermChange={handleTermChange}
          maxLength={MAX_CATEGORY_TERM_LENGTH}
          placeholder="Search categories by name…"
          ariaLabel="Search categories"
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
        className="flex flex-wrap items-center gap-2"
      >
        <span
          id="category-post-statuses-label"
          className="text-slate-zero text-sm"
        >
          Count posts with status
        </span>

        {POST_STATUS_SERIES.map(({ status, color }) => {
          const checked = filters.postStatuses.includes(status);

          return (
            <label
              key={status}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-sm duration-150 select-none",
                checked
                  ? "bg-indigo-zero/15 text-indigo-zero border-indigo-zero/30"
                  : "text-slate-zero hover:bg-slate-one",
              )}
            >
              <Checkbox
                checked={checked}
                onCheckedChange={(value) =>
                  handleStatusToggle(status, value === true)
                }
              />
              <span
                aria-hidden="true"
                className="size-2 rounded-full"
                style={{ backgroundColor: color }}
              />
              {postStatusLabels[status]}
            </label>
          );
        })}

        {filters.postStatuses.length === 0 && (
          <span className="text-slate-zero text-xs">
            None selected: every status is counted.
          </span>
        )}
      </div>
    </div>
  );
}
