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
import { POST_STATUS_ACTIONS } from "./postStatusActions";

export type PostStatusChangeTarget = {
  post: PostSummaryResponse;
  action: ChangePostStatusAction;
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
  const config = target ? POST_STATUS_ACTIONS[target.action] : null;

  return (
    <AlertDialog open={target !== null} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{config?.dialogTitle}</AlertDialogTitle>
          <AlertDialogDescription className="wrap-break-word">
            {target?.post.title} {config?.dialogDescription}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant={config?.variant} onClick={onConfirm}>
            {config?.confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
