import { UserLevel, isUserLevelAtLeast } from "@/types/api/account";
import { PostStatus, type PostSummaryResponse } from "@/types/api/post";

export type PostViewer = {
  id: string;
  level: UserLevel;
};

export type PostPermissions = {
  canApprove: boolean;
  canReject: boolean;
  canPublish: boolean;
  canDelete: boolean;
};

// Mirrors the backend rules: approve/reject need Admin and a non-draft post,
// publishing a draft is limited to its author and the Owner, and other
// people's drafts can only be deleted by the Owner.
export function getPostPermissions(
  post: PostSummaryResponse,
  viewer: PostViewer,
): PostPermissions {
  const isAuthor = post.authorId === viewer.id;
  const isAdmin = isUserLevelAtLeast(viewer.level, UserLevel.Admin);
  const isOwner = viewer.level === UserLevel.Owner;
  const isDraft = post.status === PostStatus.Draft;

  return {
    canApprove:
      isAdmin &&
      (post.status === PostStatus.PendingApproval ||
        post.status === PostStatus.Rejected),
    canReject:
      isAdmin &&
      (post.status === PostStatus.PendingApproval ||
        post.status === PostStatus.Published),
    canPublish: isDraft && (isAuthor || isOwner),
    canDelete: isAuthor || (isAdmin && (!isDraft || isOwner)),
  };
}
