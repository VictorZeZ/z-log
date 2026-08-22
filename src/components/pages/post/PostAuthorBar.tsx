import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import type { GetPostBySlugResponse } from "@/types/api/post";

type PostAuthorBarProps = {
  post: GetPostBySlugResponse;
  canManage: boolean;
  isDeleting: boolean;
  onShare: () => void;
  onDelete: () => void;
};

export function PostAuthorBar({
  post,
  canManage,
  isDeleting,
  onShare,
  onDelete,
}: PostAuthorBarProps) {
  return (
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

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onShare}>
          <Share2 className="size-4" />
          Share
        </Button>

        {canManage && (
          <>
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
              onClick={onDelete}
              disabled={isDeleting}
            >
              Delete
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
