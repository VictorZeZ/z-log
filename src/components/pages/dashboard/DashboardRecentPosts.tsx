"use client";

import Link from "next/link";
import { ArrowUpRight, ChevronRight, PenLine } from "lucide-react";
import { Shimmer } from "@shimmer-from-structure/react";
import { useAuthorPosts } from "@/hooks/api/useAuthorPosts";
import { formatDate, cn } from "@/lib/utils";
import {
  PostStatus,
  postStatusLabels,
} from "@/types/api/post";

const MAX_RESULTS = 4;

const STATUS_STYLES: Record<PostStatus, string> = {
  [PostStatus.Published]:
    "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  [PostStatus.PendingApproval]:
    "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  [PostStatus.Draft]:
    "bg-slate-500/10 text-slate-600 dark:text-slate-300",
  [PostStatus.Rejected]:
    "bg-red-500/10 text-red-700 dark:text-red-400",
};

type DashboardRecentPostsProps = {
  authorId: string;
};

export function DashboardRecentPosts({
  authorId,
}: DashboardRecentPostsProps) {
  const { data, isLoading } = useAuthorPosts(authorId);
  const posts = (data?.items ?? []).slice(0, MAX_RESULTS);

  return (
    <div className="bg-slate-two overflow-hidden rounded-3xl border shadow-md">
      <div className="flex items-center justify-between gap-4 border-b p-5 sm:p-6">
        <div>
          <h2 className="font-space-grotesk text-xl font-bold">
            Recent posts
          </h2>

          <p className="text-slate-zero mt-1 text-sm">
            Your latest content at a glance.
          </p>
        </div>

        <Link
          href="/search"
          className="text-indigo-zero flex items-center gap-1 text-sm font-semibold"
        >
          View all
          <ArrowUpRight size={16} />
        </Link>
      </div>

      <Shimmer loading={isLoading}>
        {isLoading ? (
          <div className="divide-y">
            {Array.from({ length: MAX_RESULTS }).map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-5 sm:px-6"
              >
                <div className="bg-muted size-10 shrink-0 rounded-2xl" />

                <div className="flex flex-1 flex-col gap-2">
                  <div className="bg-muted h-4 w-2/3 rounded" />
                  <div className="bg-muted h-3 w-24 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <p className="text-slate-zero p-6 text-center text-sm">
            You haven't written anything yet.
          </p>
        ) : (
          <div className="divide-y">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/post/${post.slug}`}
                className="hover:bg-slate-one/50 flex items-center gap-4 p-5 transition sm:px-6"
              >
                <div className="bg-slate-one hidden size-10 shrink-0 items-center justify-center rounded-2xl sm:flex">
                  <PenLine
                    size={17}
                    className="text-slate-zero"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">
                    {post.title}
                  </p>

                  <p className="text-slate-zero mt-1 text-xs">
                    {formatDate(post.createdAt)}
                  </p>
                </div>

                <div className="hidden items-center gap-3 sm:flex">
                  <span className="text-slate-zero text-xs">
                    {post.viewCount.toLocaleString()} views
                  </span>

                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
                      STATUS_STYLES[post.status],
                    )}
                  >
                    {postStatusLabels[post.status]}
                  </span>
                </div>

                <ChevronRight
                  className="text-slate-zero shrink-0 sm:hidden"
                  size={18}
                />
              </Link>
            ))}
          </div>
        )}
      </Shimmer>
    </div>
  );
}
