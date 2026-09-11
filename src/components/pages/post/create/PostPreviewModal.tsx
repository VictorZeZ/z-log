"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PostCard } from "@/components/shared/PostCard";
import { useAppSelector } from "@/lib/store/hooks";
import { PostStatus } from "@/types/api/post";
import type { PostSummaryResponse } from "@/types/api/post";

type PostPreviewModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  summary: string;
  tags: string[];
  categoryName: string;
  titleImageUrl: string | null;
};

export function PostPreviewModal({
  open,
  onOpenChange,
  title,
  summary,
  tags,
  categoryName,
  titleImageUrl,
}: PostPreviewModalProps) {
  const currentUser = useAppSelector((state) => state.user.data);

  const previewPost: PostSummaryResponse = {
    id: "preview",
    title: title || "Untitled post",
    summary: summary || "No summary yet.",
    titleImageUrl,
    slug: "preview",
    tags,
    status: PostStatus.Draft,
    viewCount: 0,
    authorId: currentUser?.id ?? "",
    authorFullName: currentUser?.fullName ?? "You",
    categoryName: categoryName || "Uncategorized",
    createdAt: new Date().toISOString(),
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Feed preview</DialogTitle>
          <DialogDescription>
            This is how the post's card will look in the feed and search
            results.
          </DialogDescription>
        </DialogHeader>

        {/* Not a real link yet - the post doesn't exist until published/saved. */}
        <div className="pointer-events-none max-w-sm" tabIndex={-1}>
          <PostCard post={previewPost} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
