import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/lib/api/category";

export const categoriesQueryKey = ["categories"] as const;

export function useCategories() {
  return useQuery({
    queryKey: categoriesQueryKey,
    queryFn: getAllCategories,
    staleTime: 5 * 60 * 1000,
  });
}
