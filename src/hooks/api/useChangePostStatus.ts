import { useMutation } from "@tanstack/react-query";
import { changePostStatus } from "@/lib/api/post";

export function useChangePostStatus() {
  return useMutation({
    mutationFn: changePostStatus,
  });
}
