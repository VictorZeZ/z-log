"use client";

import { useState } from "react";
import { Archive, Plus, Tag, Tags } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { Shimmer } from "@shimmer-from-structure/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CategoriesActivityChart } from "@/components/pages/dashboard/shared/CategoriesActivityChart";
import { CategoriesDistribution } from "@/components/pages/dashboard/shared/CategoriesDistribution";
import { DashboardPageHeading } from "@/components/pages/dashboard/shared/DashboardPageHeading";
import {
  DashboardPillTabs,
  type DashboardPillOption,
} from "@/components/pages/dashboard/shared/DashboardPillTabs";
import { DashboardStatCard } from "@/components/pages/dashboard/shared/DashboardStatCard";
import { DASHBOARD_PANEL_GRID_CLASS_NAME } from "@/components/pages/dashboard/shared/layout";
import { categoriesQueryKey, useCategories } from "@/hooks/api/useCategories";
import { dashboardQueryKey } from "@/hooks/api/useDashboardOverview";
import { useDeleteCategory } from "@/hooks/api/useDeleteCategory";
import { useDeletedCategories } from "@/hooks/api/useDeletedCategories";
import { useRestoreCategory } from "@/hooks/api/useRestoreCategory";
import { handleApiError } from "@/lib/api/errorHandler";
import { MAX_REPORT_RANGE_DAYS } from "@/lib/api/dashboard";
import type { GetAllCategoriesResponse } from "@/types/api/category";
import { ArchiveCategoryDialog } from "./ArchiveCategoryDialog";
import { CategoryCard } from "./CategoryCard";
import {
  CategoryFormDialog,
  type CategoryFormTarget,
} from "./CategoryFormDialog";

type CategoryView = "active" | "archived";

export function DashboardCategories() {
  const queryClient = useQueryClient();
  const active = useCategories();
  const archived = useDeletedCategories(true);
  const { mutate: removeCategory } = useDeleteCategory();
  const {
    mutate: restoreCategory,
    isPending: isRestoring,
    variables: restoringId,
  } = useRestoreCategory();

  const [view, setView] = useState<CategoryView>("active");
  const [days, setDays] = useState(MAX_REPORT_RANGE_DAYS);
  const [formTarget, setFormTarget] = useState<CategoryFormTarget | null>(null);
  const [categoryToArchive, setCategoryToArchive] =
    useState<GetAllCategoriesResponse | null>(null);

  const activeCategories = active.data ?? [];
  const archivedCategories = archived.data ?? [];
  const isLoading = active.isLoading || archived.isLoading;
  const isError = active.isError || archived.isError;

  const viewOptions: DashboardPillOption<CategoryView>[] = [
    { value: "active", label: "Active", count: activeCategories.length },
    { value: "archived", label: "Archived", count: archivedCategories.length },
  ];

  const refreshCategories = () => {
    queryClient.invalidateQueries({ queryKey: categoriesQueryKey });
    queryClient.invalidateQueries({ queryKey: dashboardQueryKey });
  };

  const handleConfirmArchive = () => {
    if (!categoryToArchive) return;

    removeCategory(categoryToArchive.id, {
      onSuccess: () => toast.success("Category archived."),
      onError: handleApiError,
      onSettled: refreshCategories,
    });
  };

  const handleRestore = (categoryId: string) => {
    restoreCategory(categoryId, {
      onSuccess: () => toast.success("Category restored."),
      onError: handleApiError,
      onSettled: refreshCategories,
    });
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <Shimmer loading>
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="bg-muted h-36 rounded-3xl" />
              ))}
            </div>
            <div className={DASHBOARD_PANEL_GRID_CLASS_NAME}>
              <div className="bg-muted h-96 rounded-3xl" />
              <div className="bg-muted h-96 rounded-3xl" />
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-muted h-56 rounded-3xl" />
              ))}
            </div>
          </div>
        </Shimmer>
      );
    }

    if (isError) {
      return (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <p className="text-slate-zero text-sm">
            Couldn&apos;t load categories.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              active.refetch();
              archived.refetch();
            }}
          >
            Try again
          </Button>
        </div>
      );
    }

    const isActiveView = view === "active";
    const visibleCount = isActiveView
      ? activeCategories.length
      : archivedCategories.length;

    return (
      <>
        <section className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
          <DashboardStatCard
            label="Total categories"
            value={activeCategories.length + archivedCategories.length}
            icon={Tags}
            footer="All categories"
          />
          <DashboardStatCard
            label="Active categories"
            value={activeCategories.length}
            icon={Tag}
            footer="Available to readers"
          />
          <DashboardStatCard
            label="Archived"
            value={archivedCategories.length}
            icon={Archive}
            footer="Not visible publicly"
          />
        </section>

        <div className={DASHBOARD_PANEL_GRID_CLASS_NAME}>
          <CategoriesActivityChart days={days} onDaysChange={setDays} />
          <CategoriesDistribution
            activeCount={activeCategories.length}
            deletedCount={archivedCategories.length}
          />
        </div>

        <DashboardPillTabs
          options={viewOptions}
          value={view}
          onChange={setView}
          ariaLabel="Category status"
        />

        {visibleCount === 0 ? (
          <p className="text-slate-zero py-16 text-center text-sm">
            {isActiveView
              ? "No active categories yet."
              : "No archived categories."}
          </p>
        ) : (
          <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
            {isActiveView
              ? activeCategories.map((category) => (
                  <CategoryCard
                    key={category.id}
                    variant="active"
                    category={category}
                    onRename={() => setFormTarget(category)}
                    onDelete={() => setCategoryToArchive(category)}
                  />
                ))
              : archivedCategories.map((category) => (
                  <CategoryCard
                    key={category.id}
                    variant="archived"
                    category={category}
                    archivedAt={category.deletedAt}
                    isRestoring={isRestoring && restoringId === category.id}
                    onRestore={() => handleRestore(category.id)}
                  />
                ))}
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <DashboardPageHeading
        eyebrow="Content organization"
        title="Categories"
        description="Organize your publication with clear content topics."
      >
        <Button onClick={() => setFormTarget("new")}>
          <Plus size={16} />
          New category
        </Button>
      </DashboardPageHeading>

      {renderContent()}

      <CategoryFormDialog
        target={formTarget}
        onOpenChange={(open) => !open && setFormTarget(null)}
        onSaved={refreshCategories}
      />

      <ArchiveCategoryDialog
        category={categoryToArchive}
        onOpenChange={(open) => !open && setCategoryToArchive(null)}
        onConfirm={handleConfirmArchive}
      />
    </>
  );
}
