import { useMutation } from "@tanstack/react-query";
import { updateCategory } from "@/lib/api/category";

export function useUpdateCategory() {
  return useMutation({
    mutationFn: updateCategory,
  });
}
