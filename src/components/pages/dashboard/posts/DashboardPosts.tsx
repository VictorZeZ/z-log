"use client";

import Link from "next/link";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { Shimmer } from "@shimmer-from-structure/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DashboardError } from "@/components/pages/dashboard/shared/DashboardError";
import { DashboardPageHeading } from "@/components/pages/dashboard/shared/DashboardPageHeading";
import { DASHBOARD_PANEL_GRID_CLASS_NAME } from "@/components/pages/dashboard/shared/layout";
import { PostsActivityChart } from "@/components/pages/dashboard/shared/PostsActivityChart";
import { PostsDistribution } from "@/components/pages/dashboard/shared/PostsDistribution";
import { dashboardQueryKey } from "@/hooks/api/useDashboardOverview";
import { useChangePostStatus } from "@/hooks/api/useChangePostStatus";
import { useDashboardOverview } from "@/hooks/api/useDashboardOverview";
import { useDeletePost } from "@/hooks/api/useDeletePost";
import { postsQueryKey } from "@/hooks/api/useDashboardPosts";
import { usePublishDraft } from "@/hooks/api/usePublishDraft";
import { handleApiError } from "@/lib/api/errorHandler";
import { MAX_REPORT_RANGE_DAYS } from "@/lib/api/dashboard";
import {
  PostStatus,
  type ChangePostStatusAction,
  type PostSummaryResponse,
} from "@/types/api/post";
import { DeletePostDialog } from "./DeletePostDialog";
import { PostsList } from "./PostsList";
import { PostsOverviewStats } from "./PostsOverviewStats";

const STATUS_CHANGE_MESSAGES: Record<ChangePostStatusAction, string> = {
  Approve: "Post approved.",
  Reject: "Post rejected.",
};

function PostsSummarySkeleton() {
  return (
    <Shimmer loading>
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-muted h-36 rounded-3xl" />
          ))}
        </div>
        <div className={DASHBOARD_PANEL_GRID_CLASS_NAME}>
          <div className="bg-muted h-96 rounded-3xl" />
          <div className="bg-muted h-96 rounded-3xl" />
        </div>
        <div className="bg-muted h-96 rounded-3xl" />
      </div>
    </Shimmer>
  );
}

export function DashboardPosts() {
  const queryClient = useQueryClient();
  const overview = useDashboardOverview(true);
  const {
    mutate: changeStatus,
    isPending: isChangingStatus,
    variables: statusVariables,
  } = useChangePostStatus();
  const {
    mutate: publishDraft,
    isPending: isPublishing,
    variables: publishingId,
  } = usePublishDraft();
  const {
    mutate: removePost,
    isPending: isDeleting,
    variables: deletingId,
  } = useDeletePost();

  const [days, setDays] = useState(MAX_REPORT_RANGE_DAYS);
  const [postToDelete, setPostToDelete] = useState<PostSummaryResponse | null>(
    null,
  );

  const busyPostId = isChangingStatus
    ? statusVariables?.postId
    : isPublishing
      ? publishingId
      : isDeleting
        ? deletingId
        : undefined;

  const refreshPosts = () => {
    queryClient.invalidateQueries({ queryKey: postsQueryKey });
    queryClient.invalidateQueries({ queryKey: dashboardQueryKey });
  };

  const handleChangeStatus = (
    post: PostSummaryResponse,
    action: ChangePostStatusAction,
  ) => {
    changeStatus(
      { postId: post.id, action },
      {
        onSuccess: () => toast.success(STATUS_CHANGE_MESSAGES[action]),
        onError: handleApiError,
        onSettled: refreshPosts,
      },
    );
  };

  const handlePublish = (post: PostSummaryResponse) => {
    publishDraft(post.id, {
      onSuccess: (data) =>
        toast.success(
          data.status === PostStatus.Published
            ? "Post published."
            : "Post submitted for review.",
        ),
      onError: handleApiError,
      onSettled: refreshPosts,
    });
  };

  const handleConfirmDelete = () => {
    if (!postToDelete) return;

    removePost(postToDelete.id, {
      onSuccess: () => toast.success("Post deleted."),
      onError: handleApiError,
      onSettled: refreshPosts,
    });
  };

  const renderBody = () => {
    if (overview.isLoading) {
      return <PostsSummarySkeleton />;
    }

    if (!overview.data) {
      return (
        <DashboardError
          title="Couldn't load your posts"
          onRetry={() => overview.refetch()}
        />
      );
    }

    const { profile, myPosts, site } = overview.data;
    const counts = site?.posts ?? myPosts;
    const authorId = site ? undefined : profile.id;

    return (
      <>
        <PostsOverviewStats counts={counts} authorId={authorId} />

        <div className={DASHBOARD_PANEL_GRID_CLASS_NAME}>
          <PostsActivityChart
            authorId={authorId}
            days={days}
            onDaysChange={setDays}
          />
          <PostsDistribution counts={counts} />
        </div>

        <PostsList
          viewer={profile}
          busyPostId={busyPostId}
          onApprove={(post) => handleChangeStatus(post, "Approve")}
          onReject={(post) => handleChangeStatus(post, "Reject")}
          onPublish={handlePublish}
          onDelete={setPostToDelete}
        />
      </>
    );
  };

  return (
    <>
      <DashboardPageHeading
        eyebrow="Content"
        title="Posts"
        description="Manage your content and keep an eye on what is waiting for review."
      >
        <Button asChild>
          <Link href="/posts/create">
            <Plus size={16} />
            New post
          </Link>
        </Button>
      </DashboardPageHeading>

      {renderBody()}

      <DeletePostDialog
        post={postToDelete}
        onOpenChange={(open) => !open && setPostToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
