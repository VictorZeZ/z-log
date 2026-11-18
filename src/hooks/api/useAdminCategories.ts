import { useQuery } from "@tanstack/react-query";
import { getAdminCategories } from "@/lib/api/category";
import { categoriesQueryKey } from "@/hooks/api/useCategories";
import type { AdminCategoriesParams } from "@/types/api/category";

export function useAdminCategories(params: AdminCategoriesParams) {
  return useQuery({
    queryKey: [...categoriesQueryKey, "admin", params],
    queryFn: () => getAdminCategories(params),
    retry: false,
    placeholderData: (previousData) => previousData,
  });
}
