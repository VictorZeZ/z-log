import { apiClient } from "@/lib/api/client";
import type { PagedResult } from "@/types/api/common";
import {
  PostSortBy,
  type ChangePostStatusRequest,
  type ChangePostStatusResponse,
  type CreateDraftRequest,
  type CreateDraftResponse,
  type CreatePostRequest,
  type CreatePostResponse,
  type DashboardPostsParams,
  type DashboardPostsResult,
  type DeletePostResponse,
  type GetPostBySlugResponse,
  type PostSummaryResponse,
  type PublishDraftResponse,
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
  sortBy: PostSortBy = PostSortBy.Newest,
): Promise<PagedResult<PostSummaryResponse>> {
  const params = new URLSearchParams();
  tags.forEach((tag) => params.append("tags", tag));
  params.set("paging.page", String(page));
  params.set("paging.pageSize", String(pageSize));
  params.set("sortBy", String(sortBy));

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
  sortBy: PostSortBy = PostSortBy.Newest,
): Promise<PagedResult<PostSummaryResponse>> {
  const params = new URLSearchParams();
  params.set("paging.page", String(page));
  params.set("paging.pageSize", String(pageSize));
  params.set("sortBy", String(sortBy));

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
  sortBy: PostSortBy = PostSortBy.Newest,
): Promise<PagedResult<PostSummaryResponse>> {
  const params = new URLSearchParams();
  params.set("term", term);
  params.set("paging.page", String(page));
  params.set("paging.pageSize", String(pageSize));
  params.set("sortBy", String(sortBy));

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
  sortBy: PostSortBy = PostSortBy.Newest,
): Promise<PagedResult<PostSummaryResponse>> {
  const params = new URLSearchParams();
  params.set("paging.page", String(page));
  params.set("paging.pageSize", String(pageSize));
  params.set("sortBy", String(sortBy));

  return apiClient<PagedResult<PostSummaryResponse>>(
    `/posts/category/${encodeURIComponent(categorySlug)}?${params.toString()}`,
    { method: "GET" },
  );
}

function buildPostFormData(payload: CreatePostRequest): FormData {
  const formData = new FormData();
  formData.set("categoryId", payload.categoryId);
  formData.set("title", payload.title);
  formData.set("summary", payload.summary);
  formData.set("content", payload.content);
  payload.tags.forEach((tag) => formData.append("tags", tag));
  if (payload.titleImage) {
    formData.set("titleImage", payload.titleImage);
  }
  return formData;
}

export async function createPost(
  payload: CreatePostRequest,
): Promise<CreatePostResponse> {
  return apiClient<CreatePostResponse>("/posts", {
    method: "POST",
    body: buildPostFormData(payload),
  });
}

export async function createDraft(
  payload: CreateDraftRequest,
): Promise<CreateDraftResponse> {
  return apiClient<CreateDraftResponse>("/posts/drafts", {
    method: "POST",
    body: buildPostFormData(payload),
  });
}

export async function getPendingApprovalPosts(
  pageSize: number,
  page = 1,
): Promise<PagedResult<PostSummaryResponse>> {
  const params = new URLSearchParams();
  params.set("paging.page", String(page));
  params.set("paging.pageSize", String(pageSize));

  return apiClient<PagedResult<PostSummaryResponse>>(
    `/admin/posts/pending?${params.toString()}`,
    { method: "GET" },
  );
}

export async function getDashboardPosts({
  term,
  filter,
  sortBy,
  categoryId,
  page,
  pageSize,
}: DashboardPostsParams): Promise<DashboardPostsResult> {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    filter,
    sortBy: String(sortBy),
  });
  if (term) {
    params.set("term", term);
  }
  if (categoryId) {
    params.set("categoryId", categoryId);
  }

  return apiClient<DashboardPostsResult>(
    `/dashboard/posts/list?${params.toString()}`,
    { method: "GET" },
  );
}

export async function changePostStatus({
  postId,
  action,
}: ChangePostStatusRequest): Promise<ChangePostStatusResponse> {
  return apiClient<ChangePostStatusResponse>(
    `/admin/posts/${encodeURIComponent(postId)}/status`,
    {
      method: "PUT",
      body: { action },
    },
  );
}

export async function publishDraft(
  postId: string,
): Promise<PublishDraftResponse> {
  return apiClient<PublishDraftResponse>(
    `/posts/drafts/${encodeURIComponent(postId)}/publish`,
    { method: "POST" },
  );
}
