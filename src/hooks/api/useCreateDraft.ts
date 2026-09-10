import { useMutation } from "@tanstack/react-query";
import { createDraft } from "@/lib/api/post";

export function useCreateDraft() {
  return useMutation({
    mutationFn: createDraft,
  });
}
