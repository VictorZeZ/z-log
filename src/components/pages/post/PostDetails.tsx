"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import DOMPurify from "isomorphic-dompurify";
import { toast } from "sonner";
import { usePostBySlug } from "@/hooks/api/usePostBySlug";
import { useDeletePost } from "@/hooks/api/useDeletePost";
import { useAppSelector } from "@/lib/store/hooks";
import { handleApiError } from "@/lib/api/errorHandler";
import { estimateReadingTime } from "@/lib/utils";
import { ApiError } from "@/types/api/common";
import { UserLevel } from "@/types/api/account";
import { PostDetailsSkeleton } from "./PostDetailsSkeleton";
import { PostDetailsError } from "./PostDetailsError";
import { PostMeta } from "./PostMeta";
import { PostAuthorBar } from "./PostAuthorBar";
import { PostContent } from "./PostContent";
import { PostTags } from "./PostTags";
import { SimilarPostsSection } from "./SimilarPostsSection";
import { AuthorPostsSection } from "./AuthorPostsSection";

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

    return <PostDetailsError onRetry={() => refetch()} />;
  }

  if (!post) {
    return null;
  }

  const cleanContent = DOMPurify.sanitize(post.content);
  const readMinutes = estimateReadingTime(post.content);

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

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title: post.title, url });
      } catch {
        // User dismissed the native share sheet - nothing to report.
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard.");
    } catch {
      toast.error("Couldn't copy the link.");
    }
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

      <PostMeta post={post} readMinutes={readMinutes} />

      <h1 className="font-space-grotesk text-4xl leading-tight font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-slate-200">
        {post.title}
      </h1>

      <PostAuthorBar
        post={post}
        canManage={canManage}
        isDeleting={isDeleting}
        onShare={handleShare}
        onDelete={handleDelete}
      />

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

      <PostContent html={cleanContent} />

      <PostTags tags={post.tags} />

      <SimilarPostsSection tags={post.tags} excludeSlug={post.slug} />

      <AuthorPostsSection
        authorId={post.authorId}
        authorFullName={post.authorFullName}
        excludeSlug={post.slug}
      />
    </article>
  );
}
