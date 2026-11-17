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
import type { GetAllCategoriesResponse } from "@/types/api/category";

type ArchiveCategoryDialogProps = {
  category: GetAllCategoriesResponse | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export function ArchiveCategoryDialog({
  category,
  onOpenChange,
  onConfirm,
}: ArchiveCategoryDialogProps) {
  return (
    <AlertDialog open={category !== null} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Archive this category?</AlertDialogTitle>
          <AlertDialogDescription>
            {category?.name} will be removed from the category list. You can
            restore it later from the Archived view.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep category</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={onConfirm}>
            Archive
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
