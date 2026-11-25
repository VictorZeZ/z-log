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
import type {
  ChangePostStatusAction,
  PostSummaryResponse,
} from "@/types/api/post";

export type PostStatusChangeTarget = {
  post: PostSummaryResponse;
  action: ChangePostStatusAction;
};

const COPY: Record<
  ChangePostStatusAction,
  {
    title: string;
    description: string;
    confirmLabel: string;
    variant: "default" | "destructive";
  }
> = {
  Approve: {
    title: "Approve this post?",
    description: "will be published and become visible to every reader.",
    confirmLabel: "Approve",
    variant: "default",
  },
  Reject: {
    title: "Reject this post?",
    description:
      "will be marked as rejected and hidden from readers. You can approve it again later.",
    confirmLabel: "Reject",
    variant: "destructive",
  },
};

type ChangePostStatusDialogProps = {
  target: PostStatusChangeTarget | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export function ChangePostStatusDialog({
  target,
  onOpenChange,
  onConfirm,
}: ChangePostStatusDialogProps) {
  const copy = target ? COPY[target.action] : null;

  return (
    <AlertDialog open={target !== null} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{copy?.title}</AlertDialogTitle>
          <AlertDialogDescription className="wrap-break-word">
            {target?.post.title} {copy?.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant={copy?.variant} onClick={onConfirm}>
            {copy?.confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
