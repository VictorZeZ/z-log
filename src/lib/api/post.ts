import { apiClient } from "@/lib/api/client";
import type { PagedResult } from "@/types/api/common";
import type {
  DeletePostResponse,
  GetPostBySlugResponse,
  PostSummaryResponse,
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

export async function getPostsByTag(
  tags: string[],
  pageSize: number,
  page = 1,
): Promise<PagedResult<PostSummaryResponse>> {
  const params = new URLSearchParams();
  tags.forEach((tag) => params.append("tags", tag));
  params.set("paging.page", String(page));
  params.set("paging.pageSize", String(pageSize));

  return apiClient<PagedResult<PostSummaryResponse>>(
    `/posts/related?${params.toString()}`,
    {
      method: "GET",
    },
  );
}

export async function getPostsByAuthor(
  authorId: string,
  pageSize: number,
  page = 1,
): Promise<PagedResult<PostSummaryResponse>> {
  const params = new URLSearchParams();
  params.set("paging.page", String(page));
  params.set("paging.pageSize", String(pageSize));

  return apiClient<PagedResult<PostSummaryResponse>>(
    `/posts/author/${encodeURIComponent(authorId)}?${params.toString()}`,
    { method: "GET" },
  );
}

export async function getAllPublishedPosts(
  pageSize: number,
  page = 1,
): Promise<PagedResult<PostSummaryResponse>> {
  const params = new URLSearchParams();
  params.set("paging.page", String(page));
  params.set("paging.pageSize", String(pageSize));

  return apiClient<PagedResult<PostSummaryResponse>>(
    `/posts?${params.toString()}`,
    {
      method: "GET",
    },
  );
}

export async function searchPosts(
  term: string,
  pageSize: number,
  page = 1,
): Promise<PagedResult<PostSummaryResponse>> {
  const params = new URLSearchParams();
  params.set("term", term);
  params.set("paging.page", String(page));
  params.set("paging.pageSize", String(pageSize));

  return apiClient<PagedResult<PostSummaryResponse>>(
    `/posts/search?${params.toString()}`,
    {
      method: "GET",
    },
  );
}

export async function getPostsByCategory(
  categorySlug: string,
  pageSize: number,
  page = 1,
): Promise<PagedResult<PostSummaryResponse>> {
  const params = new URLSearchParams();
  params.set("paging.page", String(page));
  params.set("paging.pageSize", String(pageSize));

  return apiClient<PagedResult<PostSummaryResponse>>(
    `/posts/category/${encodeURIComponent(categorySlug)}?${params.toString()}`,
    { method: "GET" },
  );
}
