"use client";

import { useEffect } from "react";
import { Shimmer } from "@shimmer-from-structure/react";
import { SearchPagination } from "@/components/pages/search/SearchPagination";
import { Button } from "@/components/ui/button";
import { useDashboardPosts } from "@/hooks/api/useDashboardPosts";
import { usePostsListParams } from "@/hooks/api/usePostsListParams";
import { getErrorMessage } from "@/lib/api/errorMessages";
import { cn } from "@/lib/utils";
import { UserLevel, isUserLevelAtLeast } from "@/types/api/account";
import { ApiError } from "@/types/api/common";
import type { PostSummaryResponse } from "@/types/api/post";
import type { PostViewer } from "./postPermissions";
import { PostsTable } from "./PostsTable";
import { PostsToolbar } from "./PostsToolbar";

const PAGE_SIZE = 10;
const SKELETON_COUNT = 5;

const buildHref = () => "#";

type PostsListProps = {
  viewer: PostViewer;
  busyPostId?: string;
  onApprove: (post: PostSummaryResponse) => void;
  onReject: (post: PostSummaryResponse) => void;
  onPublish: (post: PostSummaryResponse) => void;
  onDelete: (post: PostSummaryResponse) => void;
};

export function PostsList({
  viewer,
  busyPostId,
  onApprove,
  onReject,
  onPublish,
  onDelete,
}: PostsListProps) {
  const { state, setFilters, setPage } = usePostsListParams();
  const canFilterByAuthor = isUserLevelAtLeast(viewer.level, UserLevel.Admin);
  const authorId = canFilterByAuthor ? state.authorId : "";
  const { term, filter, categoryId, page } = state;
  const filters = { ...state, authorId };
  const hasActiveFilters =
    term !== "" || filter !== "All" || categoryId !== "" || authorId !== "";

  const { data, isLoading, isFetching, isPlaceholderData, error, refetch } =
    useDashboardPosts({ ...filters, pageSize: PAGE_SIZE });

  useEffect(() => {
    if (!data || isPlaceholderData) return;

    if (data.totalPages > 0 && page > data.totalPages) {
      setPage(data.totalPages);
    }
  }, [data, isPlaceholderData, page, setPage]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <Shimmer loading>
          <div className="bg-slate-two flex flex-col gap-3 rounded-3xl border p-3 shadow-md">
            {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
              <div key={index} className="bg-muted h-12 w-full rounded" />
            ))}
          </div>
        </Shimmer>
      );
    }

    if (!data) {
      return (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <p className="text-slate-zero text-sm">
            {error instanceof ApiError
              ? getErrorMessage(error)
              : "Couldn't load posts."}
          </p>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Try again
          </Button>
        </div>
      );
    }

    if (data.items.length === 0) {
      return (
        <p className="text-slate-zero py-16 text-center text-sm">
          {hasActiveFilters ? "No posts match these filters." : "No posts yet."}
        </p>
      );
    }

    const firstItem = (data.page - 1) * data.pageSize + 1;
    const lastItem = firstItem + data.items.length - 1;

    return (
      <>
        {term && !isPlaceholderData && (
          <p
            className="text-slate-zero text-sm wrap-break-word"
            aria-live="polite"
          >
            {data.totalCount.toLocaleString()} result
            {data.totalCount === 1 ? "" : "s"} for &quot;{term}&quot;
          </p>
        )}

        <div
          aria-busy={isFetching}
          className={cn(
            "bg-slate-two rounded-3xl border px-3 shadow-md duration-200",
            isFetching && "opacity-60",
          )}
        >
          <PostsTable
            posts={data.items}
            viewer={viewer}
            busyPostId={busyPostId}
            onApprove={onApprove}
            onReject={onReject}
            onPublish={onPublish}
            onDelete={onDelete}
          />
        </div>

        <div className="flex flex-col items-center gap-3">
          <p className="text-slate-zero text-xs">
            Showing {firstItem.toLocaleString()}–{lastItem.toLocaleString()} of{" "}
            {data.totalCount.toLocaleString()} posts
          </p>

          {data.totalPages > 1 && (
            <SearchPagination
              page={data.page}
              totalPages={data.totalPages}
              hasPreviousPage={data.hasPreviousPage}
              hasNextPage={data.hasNextPage}
              buildHref={buildHref}
              onPageChange={setPage}
            />
          )}
        </div>
      </>
    );
  };

  return (
    <section className="flex w-full flex-col gap-4">
      <PostsToolbar
        filters={filters}
        viewerId={viewer.id}
        canFilterByAuthor={canFilterByAuthor}
        onChange={setFilters}
      />
      {renderContent()}
    </section>
  );
}
