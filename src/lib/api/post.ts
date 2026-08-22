import { apiClient } from "@/lib/api/client";
import type {
  DeletePostResponse,
  GetPostBySlugResponse,
} from "@/types/api/post";

export async function getPostBySlug(
  slug: string,
): Promise<GetPostBySlugResponse> {
  return apiClient<GetPostBySlugResponse>(
    `/posts/${encodeURIComponent(slug)}`,
    {
      method: "GET",
    },
  );
}

export async function deletePost(postId: string): Promise<DeletePostResponse> {
  return apiClient<DeletePostResponse>(`/posts/${encodeURIComponent(postId)}`, {
    method: "DELETE",
  });
}
