import { useMutation } from "@tanstack/react-query";
import { createCategory } from "@/lib/api/category";

export function useCreateCategory() {
  return useMutation({
    mutationFn: createCategory,
  });
}
