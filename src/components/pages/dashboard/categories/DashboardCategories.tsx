"use client";

import { useState } from "react";
import { Plus, Tag, Tags, Trash2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { Shimmer } from "@shimmer-from-structure/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CategoriesActivityChart } from "@/components/pages/dashboard/shared/CategoriesActivityChart";
import { CategoriesDistribution } from "@/components/pages/dashboard/shared/CategoriesDistribution";
import { DashboardError } from "@/components/pages/dashboard/shared/DashboardError";
import { DashboardPageHeading } from "@/components/pages/dashboard/shared/DashboardPageHeading";
import { DashboardStatCard } from "@/components/pages/dashboard/shared/DashboardStatCard";
import { DASHBOARD_PANEL_GRID_CLASS_NAME } from "@/components/pages/dashboard/shared/layout";
import { categoriesQueryKey } from "@/hooks/api/useCategories";
import {
  dashboardQueryKey,
  useDashboardOverview,
} from "@/hooks/api/useDashboardOverview";
import { useDeleteCategory } from "@/hooks/api/useDeleteCategory";
import { useRestoreCategory } from "@/hooks/api/useRestoreCategory";
import { handleApiError } from "@/lib/api/errorHandler";
import { MAX_REPORT_RANGE_DAYS } from "@/lib/api/dashboard";
import type {
  AdminCategoryResponse,
  GetAllCategoriesResponse,
} from "@/types/api/category";
import { CategoriesList } from "./CategoriesList";
import {
  CategoryFormDialog,
  type CategoryFormTarget,
} from "./CategoryFormDialog";
import { DeleteCategoryDialog } from "./DeleteCategoryDialog";

function CategoriesSummarySkeleton() {
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
      </div>
    </Shimmer>
  );
}

export function DashboardCategories() {
  const queryClient = useQueryClient();
  const overview = useDashboardOverview(true);
  const { mutate: removeCategory } = useDeleteCategory();
  const {
    mutate: restoreCategory,
    isPending: isRestoring,
    variables: restoringId,
  } = useRestoreCategory();

  const [days, setDays] = useState(MAX_REPORT_RANGE_DAYS);
  const [formTarget, setFormTarget] = useState<CategoryFormTarget | null>(null);
  const [categoryToDelete, setCategoryToDelete] =
    useState<GetAllCategoriesResponse | null>(null);

  const counts = overview.data?.site?.categories;

  const refreshCategories = () => {
    queryClient.invalidateQueries({ queryKey: categoriesQueryKey });
    queryClient.invalidateQueries({ queryKey: dashboardQueryKey });
  };

  const handleConfirmDelete = () => {
    if (!categoryToDelete) return;

    removeCategory(categoryToDelete.id, {
      onSuccess: () => toast.success("Category deleted."),
      onError: handleApiError,
      onSettled: refreshCategories,
    });
  };

  const handleRestore = (category: AdminCategoryResponse) => {
    restoreCategory(category.id, {
      onSuccess: () => toast.success("Category restored."),
      onError: handleApiError,
      onSettled: refreshCategories,
    });
  };

  const renderSummary = () => {
    if (overview.isLoading) {
      return <CategoriesSummarySkeleton />;
    }

    if (!counts) {
      return (
        <DashboardError
          title="Couldn't load category totals"
          onRetry={() => overview.refetch()}
        />
      );
    }

    return (
      <>
        <section className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
          <DashboardStatCard
            label="Total categories"
            value={counts.totalCount}
            icon={Tags}
            footer="All categories"
          />
          <DashboardStatCard
            label="Active categories"
            value={counts.activeCount}
            icon={Tag}
            footer="Available to readers"
          />
          <DashboardStatCard
            label="Deleted"
            value={counts.deletedCount}
            icon={Trash2}
            footer="Not visible publicly"
          />
        </section>

        <div className={DASHBOARD_PANEL_GRID_CLASS_NAME}>
          <CategoriesActivityChart days={days} onDaysChange={setDays} />
          <CategoriesDistribution
            activeCount={counts.activeCount}
            deletedCount={counts.deletedCount}
          />
        </div>
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

      {renderSummary()}

      <CategoriesList
        counts={counts}
        restoringId={isRestoring ? restoringId : undefined}
        onRename={setFormTarget}
        onDelete={setCategoryToDelete}
        onRestore={handleRestore}
      />

      <CategoryFormDialog
        target={formTarget}
        onOpenChange={(open) => !open && setFormTarget(null)}
        onSaved={refreshCategories}
      />

      <DeleteCategoryDialog
        category={categoryToDelete}
        onOpenChange={(open) => !open && setCategoryToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
