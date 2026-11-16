"use client";

import Link from "next/link";
import { Shimmer } from "@shimmer-from-structure/react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DashboardPanel } from "@/components/pages/dashboard/shared/DashboardPanel";
import { postStatusPillClassNames } from "@/components/pages/dashboard/shared/postStatus";
import type { DashboardScope } from "@/components/pages/dashboard/DashboardScopeSwitch";
import { useAuthorPosts } from "@/hooks/api/useAuthorPosts";
import { usePublishedPosts } from "@/hooks/api/usePublishedPosts";
import { cn, formatDate } from "@/lib/utils";
import {
  PostStatus,
  postStatusLabels,
  type PostSummaryResponse,
} from "@/types/api/post";

const SITE_POSTS_SIZE = 5;

const headClassName =
  "text-slate-zero text-xs font-bold tracking-wider uppercase";

type RecentPostsPanelProps = {
  title: string;
  description: string;
  posts: PostSummaryResponse[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  emptyAction?: React.ReactNode;
};

function RecentPostsPanel({
  title,
  description,
  posts,
  isLoading,
  isError,
  onRetry,
  emptyAction,
}: RecentPostsPanelProps) {
  const renderContent = () => {
    if (isLoading) {
      return (
        <Shimmer loading>
          <div className="flex flex-col gap-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="bg-muted h-10 w-full rounded" />
            ))}
          </div>
        </Shimmer>
      );
    }

    if (isError) {
      return (
        <div className="flex flex-col items-center gap-3 py-10 text-center">
          <p className="text-slate-zero text-sm">Couldn&apos;t load posts.</p>
          <Button variant="outline" size="sm" onClick={onRetry}>
            Try again
          </Button>
        </div>
      );
    }

    if (posts.length === 0) {
      return (
        <div className="flex flex-col items-center gap-3 py-10 text-center">
          <p className="text-slate-zero text-sm">No posts yet.</p>
          {emptyAction}
        </div>
      );
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className={headClassName}>Post</TableHead>
            <TableHead className={headClassName}>Author</TableHead>
            <TableHead className={headClassName}>Status</TableHead>
            <TableHead className={cn(headClassName, "text-right")}>
              Views
            </TableHead>
            <TableHead className={headClassName}>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell className="max-w-64">
                <Link
                  href={`/post/${post.slug}`}
                  className="flex flex-col gap-0.5"
                >
                  <span className="truncate font-medium">{post.title}</span>
                  <span className="text-slate-zero truncate text-xs">
                    /{post.slug}
                  </span>
                </Link>
              </TableCell>
              <TableCell>{post.authorFullName}</TableCell>
              <TableCell>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 text-xs font-semibold",
                    postStatusPillClassNames[post.status],
                  )}
                >
                  {postStatusLabels[post.status]}
                </span>
              </TableCell>
              <TableCell className="text-right">
                {post.status === PostStatus.Published
                  ? post.viewCount.toLocaleString()
                  : "—"}
              </TableCell>
              <TableCell>{formatDate(post.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <DashboardPanel title={title} description={description}>
      {renderContent()}
    </DashboardPanel>
  );
}

function MyRecentPosts({ profileId }: { profileId: string }) {
  const { data, isLoading, isError, refetch } = useAuthorPosts(profileId);

  return (
    <RecentPostsPanel
      title="Recent posts"
      description="Your latest content, including drafts."
      posts={data?.items ?? []}
      isLoading={isLoading}
      isError={isError}
      onRetry={() => refetch()}
      emptyAction={
        <Button asChild size="sm">
          <Link href="/posts/create">Write your first post</Link>
        </Button>
      }
    />
  );
}

function SiteRecentPosts() {
  const { data, isLoading, isError, refetch } =
    usePublishedPosts(SITE_POSTS_SIZE);

  return (
    <RecentPostsPanel
      title="Latest published"
      description="The newest published posts across the site."
      posts={data?.items ?? []}
      isLoading={isLoading}
      isError={isError}
      onRetry={() => refetch()}
    />
  );
}

type DashboardRecentPostsProps = {
  scope: DashboardScope;
  profileId: string;
};

export function DashboardRecentPosts({
  scope,
  profileId,
}: DashboardRecentPostsProps) {
  return scope === "site" ? (
    <SiteRecentPosts />
  ) : (
    <MyRecentPosts profileId={profileId} />
  );
}
