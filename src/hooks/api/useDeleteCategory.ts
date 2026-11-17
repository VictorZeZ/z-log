import { useMutation } from "@tanstack/react-query";
import { deleteCategory } from "@/lib/api/category";

export function useDeleteCategory() {
  return useMutation({
    mutationFn: deleteCategory,
  });
}
