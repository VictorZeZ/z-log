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

// NOTE: shape inferred from how it's consumed (p.ToSummaryResponse()) in the
// provided backend source - the actual PostSummaryResponse DTO definition
// wasn't included, so verify these fields against the real backend response.
export type PostSummaryResponse = {
  id: string;
  title: string;
  summary: string;
  slug: string;
  titleImageUrl: string | null;
  categoryName: string;
  authorId: string;
  authorFullName: string;
  createdAt: string;
};
