import { Ban, Check, FilePenLine, Undo2, type LucideIcon } from "lucide-react";
import type { ChangePostStatusAction } from "@/types/api/post";

type PostStatusActionConfig = {
  label: string;
  icon: LucideIcon;
  successMessage: string;
  dialogTitle: string;
  dialogDescription: string;
  confirmLabel: string;
  variant: "default" | "destructive";
};

export const POST_STATUS_ACTIONS: Record<
  ChangePostStatusAction,
  PostStatusActionConfig
> = {
  Approve: {
    label: "Approve",
    icon: Check,
    successMessage: "Post approved.",
    dialogTitle: "Approve this post?",
    dialogDescription: "will be published and become visible to every reader.",
    confirmLabel: "Approve",
    variant: "default",
  },
  Reject: {
    label: "Reject",
    icon: Ban,
    successMessage: "Post rejected.",
    dialogTitle: "Reject this post?",
    dialogDescription:
      "will be marked as rejected and hidden from readers. You can approve it again later.",
    confirmLabel: "Reject",
    variant: "destructive",
  },
  ReturnToPending: {
    label: "Return to review queue",
    icon: Undo2,
    successMessage: "Post returned to the review queue.",
    dialogTitle: "Return this post to the review queue?",
    dialogDescription:
      "will be hidden from readers and wait for a new moderation decision.",
    confirmLabel: "Return to queue",
    variant: "default",
  },
  ReturnToDraft: {
    label: "Return to draft",
    icon: FilePenLine,
    successMessage: "Post returned to draft.",
    dialogTitle: "Return this post to draft?",
    dialogDescription:
      "will be hidden from readers and admins. Only its author and the Owner will see it, and the author can edit and publish it again.",
    confirmLabel: "Return to draft",
    variant: "default",
  },
};
