"use client";

import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { usePublishedPosts } from "@/hooks/api/usePublishedPosts";
import { PostCard, PostCardSkeleton } from "@/components/shared/PostCard";

const HERO_COUNT = 1;
const GRID_COUNT = 9;
const FEED_SIZE = HERO_COUNT + GRID_COUNT;

export default function Posts() {
  const { data, isLoading } = usePublishedPosts(FEED_SIZE);
  const posts = (data?.items ?? []).slice(HERO_COUNT, FEED_SIZE);

  return (
    <section className="flex w-full flex-col gap-4 xl:w-6xl">
      <div className="flex-col flex items-start md:items-center md:justify-between gap-4 md:gap-2 md:flex-row">
        <div>
          <h3 className="font-quicksand text-3xl font-bold">
            Latest published posts
          </h3>
          <p className="text-slate-zero">
            Filter by topic or author, then keep reading with a calm card-based
            feed.
          </p>
        </div>
        <Link
          href="/search"
          className="bg-slate-two flex items-center gap-2 rounded-full border px-3 py-2 text-sm shadow-md"
        >
          <p>Open search</p>
          <Search />
        </Link>
      </div>

      <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-stretch gap-4">
        {isLoading
          ? Array.from({ length: GRID_COUNT }).map((_, index) => (
              <PostCardSkeleton key={index} />
            ))
          : posts.map((post) => <PostCard key={post.id} post={post} />)}

        <Link
          href="/search"
          className="bg-slate-two group flex min-h-64 flex-col items-center justify-center gap-2 rounded-3xl border p-4 text-center shadow-md duration-200 hover:shadow-lg"
        >
          <span className="font-space-grotesk text-2xl font-semibold text-slate-900 dark:text-slate-200">
            More from the Feed
          </span>
          <span className="text-slate-zero flex items-center gap-1 text-sm">
            Browse every post
            <ArrowRight
              size={16}
              className="duration-200 group-hover:translate-x-1"
            />
          </span>
        </Link>
      </div>
    </section>
  );
}
