import Link from "next/link";
import { Ellipsis, Eye, Send, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type {
  ChangePostStatusAction,
  PostSummaryResponse,
} from "@/types/api/post";
import type { PostPermissions } from "./postPermissions";
import { POST_STATUS_ACTIONS } from "./postStatusActions";

type PostRowActionsProps = {
  post: PostSummaryResponse;
  permissions: PostPermissions;
  isBusy: boolean;
  onChangeStatus: (
    post: PostSummaryResponse,
    action: ChangePostStatusAction,
  ) => void;
  onPublish: (post: PostSummaryResponse) => void;
  onDelete: (post: PostSummaryResponse) => void;
};

export function PostRowActions({
  post,
  permissions,
  isBusy,
  onChangeStatus,
  onPublish,
  onDelete,
}: PostRowActionsProps) {
  const { statusActions, canPublish, canDelete } = permissions;

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

        {statusActions.map((action) => {
          const { label, icon: Icon } = POST_STATUS_ACTIONS[action];

          return (
            <DropdownMenuItem
              key={action}
              onClick={() => onChangeStatus(post, action)}
            >
              <Icon />
              {label}
            </DropdownMenuItem>
          );
        })}

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
