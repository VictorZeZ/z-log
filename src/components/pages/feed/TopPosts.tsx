"use client";

import Link from "next/link";
import { Dot } from "lucide-react";
import { Shimmer } from "@shimmer-from-structure/react";
import { usePublishedPosts } from "@/hooks/api/usePublishedPosts";
import { formatDate, formatRelativeTime } from "@/lib/utils";

const FEED_SIZE = 10;

export default function TopPosts() {
  const { data, isLoading } = usePublishedPosts(FEED_SIZE);
  const featured = data?.items[0];

  if (!isLoading && !featured) {
    return null;
  }

  return (
    <Shimmer loading={isLoading}>
      <section className="bg-slate-two relative flex w-full flex-col items-start gap-4 rounded-3xl border p-4 pl-12 shadow-md duration-200 xl:w-6xl">
        <p className="text-indigo-zero text-xs font-bold tracking-wider">
          FEATURED
        </p>

        {featured ? (
          <>
            <Link
              href={`/post/${featured.slug}`}
              className="flex flex-col gap-4"
            >
              <h2 className="font-space-grotesk text-5xl font-bold text-slate-900 dark:text-slate-200">
                {featured.title}
              </h2>
              <p className="text-slate-zero">{featured.summary}</p>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-indigo-zero bg-indigo-zero/10 rounded-full border px-4 py-1 text-sm">
                {featured.authorFullName}
              </span>
              <div className="flex items-center gap-1">
                <span className="text-slate-zero text-sm">
                  {formatDate(featured.createdAt)}
                </span>
                <Dot />
                <span className="text-slate-zero text-sm">
                  {formatRelativeTime(featured.createdAt)}
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex w-full flex-col gap-4">
            <div className="bg-muted h-12 w-3/4 rounded" />
            <div className="bg-muted h-4 w-full rounded" />
            <div className="bg-muted h-7 w-32 rounded-full" />
          </div>
        )}

        <div className="absolute top-5 bottom-5 left-5 w-1 rounded-full bg-blue-500" />
      </section>
    </Shimmer>
  );
}
