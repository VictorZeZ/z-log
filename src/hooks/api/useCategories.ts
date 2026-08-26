import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/lib/api/category";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
    staleTime: 5 * 60 * 1000,
  });
}
