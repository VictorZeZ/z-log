// The backend now serializes this by name (e.g. "Published"), confirmed by
// the dashboard's topPosts sample response - no more numeric-order guessing.
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
