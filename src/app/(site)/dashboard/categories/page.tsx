import { Suspense } from "react";
import { DashboardCategories } from "@/components/pages/dashboard/categories/DashboardCategories";

export default function DashboardCategoriesPage() {
  return (
    <Suspense>
      <DashboardCategories />
    </Suspense>
  );
}
