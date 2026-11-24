import type { PagedResult } from "@/types/api/common";

// Serialized by name (e.g. "Published").
export enum PostStatus {
  Draft = "Draft",
  PendingApproval = "PendingApproval",
  Published = "Published",
  Rejected = "Rejected",
}

export const postStatusLabels: Record<PostStatus, string> = {
  [PostStatus.Draft]: "Draft",
  [PostStatus.PendingApproval]: "Pending review",
  [PostStatus.Published]: "Published",
  [PostStatus.Rejected]: "Rejected",
};

// Confirmed against blog.Domain/Posts/Enums/PostSortBy.cs.
export enum PostSortBy {
  Newest = 0,
  Oldest = 1,
  MostViewed = 2,
}

export const postSortByLabels: Record<PostSortBy, string> = {
  [PostSortBy.Newest]: "Newest",
  [PostSortBy.Oldest]: "Oldest",
  [PostSortBy.MostViewed]: "Most viewed",
};

export const postSortByOptions: readonly PostSortBy[] = [
  PostSortBy.Newest,
  PostSortBy.Oldest,
  PostSortBy.MostViewed,
];

export type GetPostBySlugResponse = {
  id: string;
  title: string;
  titleImageUrl: string | null;
  content: string;
  slug: string;
  tags: string[];
  status: PostStatus;
  viewCount: number;
  authorId: string;
  authorFullName: string;
  categoryName: string;
  createdAt: string;
  updatedAt: string | null;
};

export type DeletePostResponse = {
  success: boolean;
};

// Confirmed against the real PostSummaryResponse DTO.
export type PostSummaryResponse = {
  id: string;
  title: string;
  summary: string;
  titleImageUrl: string | null;
  slug: string;
  tags: string[];
  status: PostStatus;
  viewCount: number;
  authorId: string;
  authorFullName: string;
  categoryName: string;
  createdAt: string;
};

// Client-side shape used to build the multipart request - not a 1:1 mirror
// of CreatePostCommand, since AuthorId comes from the auth token server-side.
export type CreatePostRequest = {
  categoryId: string;
  title: string;
  summary: string;
  content: string;
  tags: string[];
  titleImage: File | null;
};

export type CreatePostResponse = {
  id: string;
  title: string;
  summary: string;
  slug: string;
  status: PostStatus;
};

export type CreateDraftRequest = CreatePostRequest;
export type CreateDraftResponse = CreatePostResponse;

// Mirrors the PostFilter enum of the dashboard posts endpoint.
export type PostFilter = "All" | PostStatus;

export type DashboardPostsFilters = {
  term: string;
  filter: PostFilter;
  sortBy: PostSortBy;
  // Empty string means every category.
  categoryId: string;
};

export type DashboardPostsParams = DashboardPostsFilters & {
  page: number;
  pageSize: number;
};

export type DashboardPostsResult = PagedResult<PostSummaryResponse> & {
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type ChangePostStatusAction = "Approve" | "Reject";

export type ChangePostStatusRequest = {
  postId: string;
  action: ChangePostStatusAction;
};

export type ChangePostStatusResponse = {
  id: string;
  title: string;
  status: PostStatus;
};

export type PublishDraftResponse = {
  id: string;
  title: string;
  slug: string;
  status: PostStatus;
};
