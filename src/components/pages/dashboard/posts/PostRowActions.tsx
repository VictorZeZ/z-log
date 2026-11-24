import Link from "next/link";
import { Ban, Check, Ellipsis, Eye, Send, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { PostSummaryResponse } from "@/types/api/post";
import type { PostPermissions } from "./postPermissions";

type PostRowActionsProps = {
  post: PostSummaryResponse;
  permissions: PostPermissions;
  isBusy: boolean;
  onApprove: (post: PostSummaryResponse) => void;
  onReject: (post: PostSummaryResponse) => void;
  onPublish: (post: PostSummaryResponse) => void;
  onDelete: (post: PostSummaryResponse) => void;
};

export function PostRowActions({
  post,
  permissions,
  isBusy,
  onApprove,
  onReject,
  onPublish,
  onDelete,
}: PostRowActionsProps) {
  const { canApprove, canReject, canPublish, canDelete } = permissions;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          disabled={isBusy}
          aria-label={`Actions for ${post.title}`}
        >
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/post/${post.slug}`}>
            <Eye />
            View
          </Link>
        </DropdownMenuItem>

        {canPublish && (
          <DropdownMenuItem onClick={() => onPublish(post)}>
            <Send />
            Publish
          </DropdownMenuItem>
        )}

        {canApprove && (
          <DropdownMenuItem onClick={() => onApprove(post)}>
            <Check />
            Approve
          </DropdownMenuItem>
        )}

        {canReject && (
          <DropdownMenuItem onClick={() => onReject(post)}>
            <Ban />
            Reject
          </DropdownMenuItem>
        )}

        {canDelete && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => onDelete(post)}
            >
              <Trash2 />
              Delete
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
