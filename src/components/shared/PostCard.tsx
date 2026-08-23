import Link from "next/link";
import { formatDate, formatRelativeTime } from "@/lib/utils";
import type { PostSummaryResponse } from "@/types/api/post";

type PostCardProps = {
  post: PostSummaryResponse;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/post/${post.slug}`}
      className="bg-slate-two flex h-auto flex-col items-start justify-between gap-2 rounded-3xl border p-4 shadow-md duration-200 hover:shadow-lg"
    >
      <div className="mb-2 flex items-center justify-start gap-2 select-none">
        <p className="bg-indigo-zero/15 text-indigo-zero rounded-full px-2 py-1 text-xs font-semibold tracking-wide uppercase">
          {post.categoryName}
        </p>
        <span className="text-slate-zero text-xs">
          {formatRelativeTime(post.createdAt)}
        </span>
      </div>
      <div className="flex flex-col items-start gap-4">
        <h2 className="font-space-grotesk text-4xl font-semibold text-slate-900 dark:text-slate-200">
          {post.title}
        </h2>
        <p className="text-slate-zero">{post.summary}</p>
      </div>
      <div className="mt-4 flex w-full items-center justify-between border-t pt-3">
        <p className="text-sm">{post.authorFullName}</p>
        <span className="text-gray-zero text-sm">
          {formatDate(post.createdAt)}
        </span>
      </div>
    </Link>
  );
}

export function PostCardSkeleton() {
  return (
    <div className="bg-slate-two flex h-64 flex-col justify-between gap-2 rounded-3xl border p-4 shadow-md">
      <div className="bg-muted h-5 w-24 rounded-full" />
      <div className="flex flex-col gap-3">
        <div className="bg-muted h-8 w-full rounded" />
        <div className="bg-muted h-4 w-full rounded" />
        <div className="bg-muted h-4 w-2/3 rounded" />
      </div>
      <div className="bg-muted h-4 w-32 rounded" />
    </div>
  );
}
