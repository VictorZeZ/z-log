import { UserLevel, isUserLevelAtLeast } from "@/types/api/account";
import {
  PostStatus,
  type ChangePostStatusAction,
  type PostSummaryResponse,
} from "@/types/api/post";

export type PostViewer = {
  id: string;
  level: UserLevel;
};

export type PostPermissions = {
  statusActions: ChangePostStatusAction[];
  canPublish: boolean;
  canDelete: boolean;
};

// Mirrors the backend rules: status changes need Admin (returning to draft
// needs Owner) and a post in a matching status, publishing a draft is limited
// to its author and the Owner, and other people's drafts can only be deleted
// by the Owner.
export function getPostPermissions(
  post: PostSummaryResponse,
  viewer: PostViewer,
): PostPermissions {
  const isAuthor = post.authorId === viewer.id;
  const isAdmin = isUserLevelAtLeast(viewer.level, UserLevel.Admin);
  const isOwner = viewer.level === UserLevel.Owner;
  const { status } = post;
  const isDraft = status === PostStatus.Draft;

  const statusRules: [ChangePostStatusAction, boolean][] = [
    [
      "Approve",
      isAdmin &&
        (status === PostStatus.PendingApproval ||
          status === PostStatus.Rejected),
    ],
    [
      "Reject",
      isAdmin &&
        (status === PostStatus.PendingApproval ||
          status === PostStatus.Published),
    ],
    [
      "ReturnToPending",
      isAdmin &&
        (status === PostStatus.Published || status === PostStatus.Rejected),
    ],
    ["ReturnToDraft", isOwner && !isDraft],
  ];

  return {
    statusActions: statusRules
      .filter(([, allowed]) => allowed)
      .map(([action]) => action),
    canPublish: isDraft && (isAuthor || isOwner),
    canDelete: isAuthor || (isAdmin && (!isDraft || isOwner)),
  };
}
