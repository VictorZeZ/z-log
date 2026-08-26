import { Clock, Dot, Eye } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { PostStatus, postStatusLabels } from "@/types/api/post";
import type { GetPostBySlugResponse } from "@/types/api/post";

type PostMetaProps = {
  post: GetPostBySlugResponse;
  readMinutes: number;
};

export function PostMeta({ post, readMinutes }: PostMetaProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="bg-indigo-zero/15 text-indigo-zero rounded-full border px-3 py-1 text-xs font-bold tracking-wider uppercase">
        {post.categoryName}
      </span>

      {post.status !== PostStatus.Published && (
        <span className="bg-amber-zero/15 text-amber-zero rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase">
          {postStatusLabels[post.status]}
        </span>
      )}

      <span className="text-slate-zero text-sm">
        {formatDate(post.createdAt)}
      </span>

      <span className="text-slate-zero flex items-center gap-1 border-x px-2 text-sm">
        <Clock size={16} />
        {readMinutes} min read
      </span>

      <span className="text-slate-zero flex items-center gap-1 text-sm">
        <Eye size={16} />
        {post.viewCount.toLocaleString()} views
      </span>
    </div>
  );
}
