"use client";

import { Shimmer } from "@shimmer-from-structure/react";
import { useAuthorPosts } from "@/hooks/api/useAuthorPosts";
import { PostCard, PostCardSkeleton } from "@/components/shared/PostCard";

const MAX_RESULTS = 4;

type AuthorPostsSectionProps = {
  authorId: string;
  authorFullName: string;
  excludeSlug: string;
};

export function AuthorPostsSection({
  authorId,
  authorFullName,
  excludeSlug,
}: AuthorPostsSectionProps) {
  const { data, isLoading } = useAuthorPosts(authorId);

  const posts = (data?.items ?? [])
    .filter((post) => post.slug !== excludeSlug)
    .slice(0, MAX_RESULTS);

  if (!isLoading && posts.length === 0) {
    return null;
  }

  return (
    <section className="flex w-full flex-col gap-4 border-t pt-8">
      <h2 className="font-quicksand text-3xl font-bold">
        More from {authorFullName}
      </h2>
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
