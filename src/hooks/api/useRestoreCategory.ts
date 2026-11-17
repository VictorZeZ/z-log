import { useMutation } from "@tanstack/react-query";
import { restoreCategory } from "@/lib/api/category";

export function useRestoreCategory() {
  return useMutation({
    mutationFn: restoreCategory,
  });
}
