import { useMutation } from "@tanstack/react-query";
import { deletePost } from "@/lib/api/post";

export function useDeletePost() {
  return useMutation({
    mutationFn: deletePost,
  });
}
