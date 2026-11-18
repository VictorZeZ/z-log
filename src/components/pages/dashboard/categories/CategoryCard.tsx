import { Ellipsis, Pencil, RotateCcw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, formatDate } from "@/lib/utils";
import type { AdminCategoryResponse } from "@/types/api/category";

type CategoryCardProps = {
  category: AdminCategoryResponse;
  isRestoring: boolean;
  onRename: (category: AdminCategoryResponse) => void;
  onDelete: (category: AdminCategoryResponse) => void;
  onRestore: (category: AdminCategoryResponse) => void;
};

export function CategoryCard({
  category,
  isRestoring,
  onRename,
  onDelete,
  onRestore,
}: CategoryCardProps) {
  const { isDeleted, deletedAt, postsCount } = category;
  const dateLabel =
    isDeleted && deletedAt
      ? `Deleted ${formatDate(deletedAt)}`
      : `Created ${formatDate(category.createdAt)}`;

  return (
    <article className="bg-slate-two flex flex-col gap-3 rounded-3xl border p-3 shadow-md">
      <div
        aria-hidden="true"
        className="bg-indigo-zero/10 text-indigo-zero font-space-grotesk flex h-28 items-center justify-center rounded-2xl text-4xl font-bold select-none"
      >
        {category.name.charAt(0).toUpperCase()}
      </div>

      <div className="flex items-start justify-between gap-2 px-1">
        <div className="min-w-0">
          <h3 className="font-space-grotesk truncate text-lg font-bold">
            {category.name}
          </h3>
          <p className="text-slate-zero truncate text-xs">/{category.slug}</p>
          <p className="text-slate-zero mt-1 text-xs">{dateLabel}</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={`Actions for ${category.name}`}
            >
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {isDeleted ? (
              <DropdownMenuItem
                onClick={() => onRestore(category)}
                disabled={isRestoring}
              >
                <RotateCcw />
                Restore
              </DropdownMenuItem>
            ) : (
              <>
                <DropdownMenuItem onClick={() => onRename(category)}>
                  <Pencil />
                  Rename
                </DropdownMenuItem>
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => onDelete(category)}
                >
                  <Trash2 />
                  Delete
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center justify-between border-t px-1 pt-3">
        <span className="text-slate-zero text-sm">
          {postsCount.toLocaleString()} post{postsCount === 1 ? "" : "s"}
        </span>

        <span
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-semibold",
            isDeleted
              ? "bg-red-zero/15 text-red-zero"
              : "bg-emerald-zero/15 text-emerald-zero",
          )}
        >
          {isDeleted ? "Deleted" : "Active"}
        </span>
      </div>
    </article>
  );
}
