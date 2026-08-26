import { PostCard, PostCardSkeleton } from "@/components/shared/PostCard";
import { cn } from "@/lib/utils";
import type { PostSummaryResponse } from "@/types/api/post";

type SearchResultsProps = {
  posts: PostSummaryResponse[];
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  awaitingInput: boolean;
};

const SKELETON_COUNT = 9;

export function SearchResults({
  posts,
  isLoading,
  isFetching,
  isError,
  awaitingInput,
}: SearchResultsProps) {
  if (awaitingInput) {
    return (
      <p className="text-slate-zero py-16 text-center">
        Choose a filter value above to see matching posts.
      </p>
    );
  }

  if (isError) {
    return (
      <p className="text-slate-zero py-16 text-center">
        Something went wrong loading posts. Please try again.
      </p>
    );
  }

  if (!isLoading && posts.length === 0) {
    return (
      <p className="text-slate-zero py-16 text-center">
        No posts found for these filters.
      </p>
    );
  }

  return (
    <div
      className={cn(
        "grid w-full grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-stretch gap-4 duration-200",
        isFetching && !isLoading && "opacity-60",
      )}
    >
      {isLoading
        ? Array.from({ length: SKELETON_COUNT }).map((_, index) => (
            <PostCardSkeleton key={index} />
          ))
        : posts.map((post) => <PostCard key={post.id} post={post} />)}
    </div>
  );
}
