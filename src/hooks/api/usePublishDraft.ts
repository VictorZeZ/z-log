import { useMutation } from "@tanstack/react-query";
import { publishDraft } from "@/lib/api/post";

export function usePublishDraft() {
  return useMutation({
    mutationFn: publishDraft,
  });
}
