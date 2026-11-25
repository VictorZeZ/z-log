import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { postStatusPillClassNames } from "@/components/pages/dashboard/shared/postStatus";
import { cn, formatDate } from "@/lib/utils";
import {
  PostStatus,
  postStatusLabels,
  type ChangePostStatusAction,
  type PostSummaryResponse,
} from "@/types/api/post";
import { getPostPermissions, type PostViewer } from "./postPermissions";
import { PostRowActions } from "./PostRowActions";

const headClassName =
  "text-slate-zero text-xs font-bold tracking-wider uppercase";

type PostsTableProps = {
  posts: PostSummaryResponse[];
  viewer: PostViewer;
  busyPostId?: string;
  onChangeStatus: (
    post: PostSummaryResponse,
    action: ChangePostStatusAction,
  ) => void;
  onPublish: (post: PostSummaryResponse) => void;
  onDelete: (post: PostSummaryResponse) => void;
};

export function PostsTable({
  posts,
  viewer,
  busyPostId,
  onChangeStatus,
  onPublish,
  onDelete,
}: PostsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className={headClassName}>Post</TableHead>
          <TableHead className={headClassName}>Author</TableHead>
          <TableHead className={headClassName}>Category</TableHead>
          <TableHead className={headClassName}>Status</TableHead>
          <TableHead className={cn(headClassName, "text-right")}>
            Views
          </TableHead>
          <TableHead className={headClassName}>Date</TableHead>
          <TableHead className="w-12">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow
            key={post.id}
            className={cn(
              "duration-150",
              busyPostId === post.id && "opacity-60",
            )}
          >
            <TableCell className="max-w-64">
              <Link
                href={`/post/${post.slug}`}
                className="flex flex-col gap-0.5"
              >
                <span className="truncate font-medium">{post.title}</span>
                <span className="text-slate-zero truncate text-xs">
                  /{post.slug}
                </span>
              </Link>
            </TableCell>
            <TableCell>{post.authorFullName}</TableCell>
            <TableCell>{post.categoryName}</TableCell>
            <TableCell>
              <span
                className={cn(
                  "rounded-full px-2.5 py-1 text-xs font-semibold",
                  postStatusPillClassNames[post.status],
                )}
              >
                {postStatusLabels[post.status]}
              </span>
            </TableCell>
            <TableCell className="text-right">
              {post.status === PostStatus.Published
                ? post.viewCount.toLocaleString()
                : "—"}
            </TableCell>
            <TableCell>{formatDate(post.createdAt)}</TableCell>
            <TableCell>
              <PostRowActions
                post={post}
                permissions={getPostPermissions(post, viewer)}
                isBusy={busyPostId === post.id}
                onChangeStatus={onChangeStatus}
                onPublish={onPublish}
                onDelete={onDelete}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
