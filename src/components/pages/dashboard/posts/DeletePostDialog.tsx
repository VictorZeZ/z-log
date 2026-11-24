"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { PostSummaryResponse } from "@/types/api/post";

type DeletePostDialogProps = {
  post: PostSummaryResponse | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export function DeletePostDialog({
  post,
  onOpenChange,
  onConfirm,
}: DeletePostDialogProps) {
  return (
    <AlertDialog open={post !== null} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this post?</AlertDialogTitle>
          <AlertDialogDescription className="wrap-break-word">
            {post?.title} will be permanently deleted. This can&apos;t be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep post</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={onConfirm}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
