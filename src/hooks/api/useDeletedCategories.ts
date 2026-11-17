import { useQuery } from "@tanstack/react-query";
import { getDeletedCategories } from "@/lib/api/category";
import { categoriesQueryKey } from "@/hooks/api/useCategories";

export function useDeletedCategories(enabled: boolean) {
  return useQuery({
    queryKey: [...categoriesQueryKey, "deleted"],
    queryFn: getDeletedCategories,
    enabled,
    retry: false,
  });
}
