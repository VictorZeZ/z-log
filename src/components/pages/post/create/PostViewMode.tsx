"use client";

import DOMPurify from "isomorphic-dompurify";
import { useAppSelector } from "@/lib/store/hooks";
import { estimateReadingTime } from "@/lib/utils";
import { PostStatus } from "@/types/api/post";
import type { GetPostBySlugResponse } from "@/types/api/post";
import { PostMeta } from "@/components/pages/post/PostMeta";
import { PostContent } from "@/components/pages/post/PostContent";
import { PostTags } from "@/components/pages/post/PostTags";

type PostViewModeProps = {
  title: string;
  content: string;
  tags: string[];
  categoryName: string;
  titleImageUrl: string | null;
};

export function PostViewMode({
  title,
  content,
  tags,
  categoryName,
  titleImageUrl,
}: PostViewModeProps) {
  const currentUser = useAppSelector((state) => state.user.data);
  const cleanContent = DOMPurify.sanitize(content);
  const readMinutes = estimateReadingTime(content);

  const previewPost: GetPostBySlugResponse = {
    id: "preview",
    title: title || "Untitled post",
    titleImageUrl,
    content,
    slug: "preview",
    tags,
    status: PostStatus.Draft,
    viewCount: 0,
    authorId: currentUser?.id ?? "",
    authorFullName: currentUser?.fullName ?? "You",
    categoryName: categoryName || "Uncategorized",
    createdAt: new Date().toISOString(),
    updatedAt: null,
  };

  return (
    <article className="flex w-full flex-col gap-6">
      <PostMeta post={previewPost} readMinutes={readMinutes} />

      <h1 className="font-space-grotesk text-4xl leading-tight font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-slate-200">
        {previewPost.title}
      </h1>

      {titleImageUrl && (
        <div className="relative aspect-video w-full overflow-hidden rounded-3xl border shadow-md">
          {/* eslint-disable-next-line @next/next/no-img-element -- blob: object URL preview, next/image can't optimize it */}
          <img
            src={titleImageUrl}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <PostContent html={cleanContent} />

      <PostTags tags={tags} />
    </article>
  );
}