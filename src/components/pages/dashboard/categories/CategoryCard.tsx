import { Ellipsis, Pencil, RotateCcw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, formatDate } from "@/lib/utils";
import type { GetAllCategoriesResponse } from "@/types/api/category";

type CategoryCardProps =
  | {
      variant: "active";
      category: GetAllCategoriesResponse;
      onRename: () => void;
      onDelete: () => void;
    }
  | {
      variant: "archived";
      category: GetAllCategoriesResponse;
      archivedAt: string | null;
      isRestoring: boolean;
      onRestore: () => void;
    };

const pillClassName = "rounded-full px-2.5 py-1 text-xs font-semibold";

export function CategoryCard(props: CategoryCardProps) {
  const { category } = props;

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
            {props.variant === "active" ? (
              <>
                <DropdownMenuItem onClick={props.onRename}>
                  <Pencil />
                  Rename
                </DropdownMenuItem>
                <DropdownMenuItem
                  variant="destructive"
                  onClick={props.onDelete}
                >
                  <Trash2 />
                  Archive
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem
                onClick={props.onRestore}
                disabled={props.isRestoring}
              >
                <RotateCcw />
                Restore
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center justify-between border-t px-1 pt-3">
        <span
          className={cn(
            pillClassName,
            props.variant === "active"
              ? "bg-emerald-zero/15 text-emerald-zero"
              : "bg-slate-one text-slate-zero",
          )}
        >
          {props.variant === "active" ? "Active" : "Archived"}
        </span>

        {props.variant === "archived" && props.archivedAt && (
          <span className="text-slate-zero text-xs">
            {formatDate(props.archivedAt)}
          </span>
        )}
      </div>
    </article>
  );
}
