"use client";

import Link from "next/link";
import { Shimmer } from "@shimmer-from-structure/react";
import { Button } from "@/components/ui/button";
import { DashboardPanel } from "@/components/pages/dashboard/shared/DashboardPanel";
import { usePendingPosts } from "@/hooks/api/usePendingPosts";
import { formatRelativeTime } from "@/lib/utils";

const PENDING_SIZE = 5;

export function DashboardPendingPanel() {
  const { data, isLoading, isError, refetch } = usePendingPosts(PENDING_SIZE);

  const renderContent = () => {
    if (isLoading) {
      return (
        <Shimmer loading>
          <div className="flex flex-col gap-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-muted h-12 w-full rounded" />
            ))}
          </div>
        </Shimmer>
      );
    }

    if (isError || !data) {
      return (
        <div className="flex flex-col items-center gap-3 py-10 text-center">
          <p className="text-slate-zero text-sm">
            Couldn&apos;t load the review queue.
          </p>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Try again
          </Button>
        </div>
      );
    }

    if (data.items.length === 0) {
      return (
        <p className="text-slate-zero py-10 text-center text-sm">
          Nothing is waiting for review.
        </p>
      );
    }

    const remaining = data.totalCount - data.items.length;

    return (
      <div className="flex flex-col gap-4">
        <ul className="flex flex-col">
          {data.items.map((post) => (
            <li
              key={post.id}
              className="border-t py-3 first:border-t-0 first:pt-0"
            >
              <Link
                href={`/post/${post.slug}`}
                className="flex flex-col gap-0.5"
              >
                <span className="truncate text-sm font-medium">
                  {post.title}
                </span>
                <span className="text-slate-zero text-xs">
                  {post.authorFullName} · {formatRelativeTime(post.createdAt)}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {remaining > 0 && (
          <p className="text-slate-zero text-xs">
            +{remaining.toLocaleString()} more waiting
          </p>
        )}
      </div>
    );
  };

  return (
    <DashboardPanel
      title="Pending review"
      description="Posts waiting for a moderation decision."
      action={
        data && (
          <span className="bg-amber-zero/15 text-amber-zero rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap">
            {data.totalCount.toLocaleString()} waiting
          </span>
        )
      }
    >
      {renderContent()}
    </DashboardPanel>
  );
}
