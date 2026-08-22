"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { ArrowLeft, Eye } from "lucide-react";
import { Shimmer } from "@shimmer-from-structure/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { usePostBySlug } from "@/hooks/api/usePostBySlug";
import { useDeletePost } from "@/hooks/api/useDeletePost";
import { useAppSelector } from "@/lib/store/hooks";
import { handleApiError } from "@/lib/api/errorHandler";
import { formatDate } from "@/lib/utils";
import { ApiError } from "@/types/api/common";
import { UserLevel } from "@/types/api/account";
import { PostStatus, postStatusLabels } from "@/types/api/post";

type PostDetailsProps = {
  slug: string;
};

export function PostDetails({ slug }: PostDetailsProps) {
  const router = useRouter();
  const currentUser = useAppSelector((state) => state.user.data);

  const {
    data: post,
    isLoading,
    isError,
    error,
    refetch,
  } = usePostBySlug(slug);
  const { mutate: removePost, isPending: isDeleting } = useDeletePost();

  if (isLoading) {
    return <PostDetailsSkeleton />;
  }

  if (isError) {
    if (error instanceof ApiError && error.errorCode === "NOT_FOUND") {
      notFound();
    }

    return (
      <section className="mt-6 flex w-full max-w-2xl flex-col items-center gap-3 px-4 py-20 text-center sm:mt-22">
        <h1 className="font-space-grotesk text-2xl font-bold">
          Couldn&apos;t load this post
        </h1>
        <p className="text-slate-zero">
          Something went wrong while fetching it. Please try again.
        </p>
        <Button variant="outline" onClick={() => refetch()}>
          Try again
        </Button>
      </section>
    );
  }

  if (!post) {
    return null;
  }

  const canManage =
    Boolean(currentUser) &&
    (currentUser!.id === post.authorId ||
      currentUser!.level >= UserLevel.Admin);

  const handleDelete = () => {
    const confirmed = window.confirm("Delete this post? This can't be undone.");
    if (!confirmed) return;

    removePost(post.id, {
      onSuccess: () => {
        toast.success("Post deleted.");
        router.push("/");
      },
      onError: handleApiError,
    });
  };

  return (
    <article className="mt-6 flex w-full shrink-0 flex-col gap-6 px-4 sm:mt-10 xl:w-6xl xl:px-0">
      <Link
        href="/"
        className="text-slate-zero hover:text-foreground flex w-fit items-center gap-1.5 text-sm duration-150"
      >
        <ArrowLeft size={16} />
        Back to feed
      </Link>

      <div className="flex flex-wrap items-center gap-3">
        <span className="bg-indigo-zero/15 text-indigo-zero rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase">
          {post.categoryName}
        </span>

        {post.status !== PostStatus.Published && (
          <span className="bg-amber-zero/15 text-amber-zero rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase">
            {postStatusLabels[post.status]}
          </span>
        )}

        <span className="text-slate-zero text-sm">
          {formatDate(post.createdAt)}
        </span>

        <span className="text-slate-zero flex items-center gap-1 text-sm">
          <Eye size={16} />
          {post.viewCount.toLocaleString()} views
        </span>
      </div>

      <h1 className="font-space-grotesk text-4xl leading-tight font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-slate-200">
        {post.title}
      </h1>

      <div className="flex flex-wrap items-center justify-between gap-4 border-y py-4">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-zero/15 text-indigo-zero flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold">
            {post.authorFullName.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{post.authorFullName}</span>
            {post.updatedAt && (
              <span className="text-slate-zero text-xs">
                Updated {formatDate(post.updatedAt)}
              </span>
            )}
          </div>
        </div>

        {canManage && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled
              title="Editing is coming soon"
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              Delete
            </Button>
          </div>
        )}
      </div>

      {post.titleImageUrl && (
        <div className="relative aspect-video w-full overflow-hidden rounded-3xl border shadow-md">
          <Image
            src={post.titleImageUrl}
            alt={post.title}
            fill
            sizes="(min-width: 1280px) 1152px, 100vw"
            className="object-cover"
            priority
          />
        </div>
      )}

      <article
        className="text-slate-zero text-base leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></article>

      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 border-t pt-6">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-slate-one text-slate-zero rounded-full px-3 py-1 text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}

function PostDetailsSkeleton() {
  return (
    <div className="mt-6 flex w-full shrink-0 flex-col gap-6 px-4 sm:mt-10 xl:w-6xl xl:px-0">
      <Shimmer loading>
        <div className="flex flex-col gap-6">
          <div className="bg-muted h-4 w-28 rounded" />
          <div className="bg-muted h-6 w-40 rounded-full" />
          <div className="bg-muted h-14 w-3/4 rounded" />
          <div className="bg-muted h-16 w-full rounded" />
          <div className="bg-muted aspect-video w-full rounded-3xl" />
          <div className="flex flex-col gap-3">
            <div className="bg-muted h-4 w-full rounded" />
            <div className="bg-muted h-4 w-full rounded" />
            <div className="bg-muted h-4 w-2/3 rounded" />
          </div>
        </div>
      </Shimmer>
    </div>
  );
}
