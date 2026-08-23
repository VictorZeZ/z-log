"use client";

import { Shimmer } from "@shimmer-from-structure/react";
import { useSimilarPosts } from "@/hooks/api/useSimilarPosts";
import { PostCard, PostCardSkeleton } from "@/components/shared/PostCard";

const MAX_RESULTS = 4;

type SimilarPostsSectionProps = {
  tags: string[];
  excludeSlug: string;
};

export function SimilarPostsSection({
  tags,
  excludeSlug,
}: SimilarPostsSectionProps) {
  const { data, isLoading } = useSimilarPosts(tags);

  if (tags.length === 0) {
    return null;
  }

  const posts = (data?.items ?? [])
    .filter((post) => post.slug !== excludeSlug)
    .slice(0, MAX_RESULTS);

  if (!isLoading && posts.length === 0) {
    return null;
  }

  return (
    <section className="flex w-full flex-col gap-4 border-t pt-8">
      <h2 className="font-quicksand text-3xl font-bold">Keep Reading</h2>
      <Shimmer loading={isLoading}>
        <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(360px,1fr))] gap-4">
          {isLoading
            ? Array.from({ length: MAX_RESULTS }).map((_, index) => (
                <PostCardSkeleton key={index} />
              ))
            : posts.map((post) => <PostCard key={post.id} post={post} />)}
        </div>
      </Shimmer>
    </section>
  );
}
