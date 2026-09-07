// NOTE: ordering assumed to mirror the post lifecycle (draft -> pending ->
// published/rejected). This wasn't available in the provided backend source
// (blog.Domain/Posts/Enums/PostStatus.cs) - verify these numeric values
// against the actual C# enum and correct if they differ.
export enum PostStatus {
  Draft = 0,
  PendingApproval = 1,
  Published = 2,
  Rejected = 3,
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
