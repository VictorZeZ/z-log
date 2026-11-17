"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateCategory } from "@/hooks/api/useCreateCategory";
import { useUpdateCategory } from "@/hooks/api/useUpdateCategory";
import { handleApiError } from "@/lib/api/errorHandler";
import { getFieldErrors } from "@/lib/api/errorMessages";
import {
  categoryFormSchema,
  type CategoryFormValues,
} from "@/lib/validations/category";
import { ApiError } from "@/types/api/common";
import type { GetAllCategoriesResponse } from "@/types/api/category";

export type CategoryFormTarget = GetAllCategoriesResponse | "new";

const inputClassName =
  "font-roboto w-full rounded-md border bg-gray-100 px-3 py-2 text-sm outline-none dark:bg-gray-950";

type CategoryFormProps = {
  category: GetAllCategoriesResponse | null;
  onCancel: () => void;
  onSaved: () => void;
};

function CategoryForm({ category, onCancel, onSaved }: CategoryFormProps) {
  const isRename = category !== null;
  const { mutate: createCategory, isPending: isCreating } = useCreateCategory();
  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory();
  const isPending = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: { name: category?.name ?? "" },
  });

  const handleError = (error: unknown) => {
    if (error instanceof ApiError) {
      if (error.errorCode === "ALREADY_EXISTS") {
        setError("name", {
          message: "A category with this name already exists.",
        });
        return;
      }

      if (error.errorCode === "VALIDATION_ERROR") {
        const nameError = getFieldErrors(error).Name;
        if (nameError) {
          setError("name", { message: nameError });
          return;
        }
      }
    }

    handleApiError(error);
  };

  const onSubmit = ({ name }: CategoryFormValues) => {
    const callbacks = {
      onSuccess: () => {
        toast.success(isRename ? "Category renamed." : "Category created.");
        onSaved();
      },
      onError: handleError,
    };

    if (category) {
      updateCategory({ id: category.id, name }, callbacks);
    } else {
      createCategory({ name }, callbacks);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
      noValidate
    >
      <DialogHeader>
        <DialogTitle>
          {isRename ? "Rename category" : "New category"}
        </DialogTitle>
        <DialogDescription>
          {isRename
            ? "Choose a new name. The slug is updated to match."
            : "Give the category a short, clear name."}
        </DialogDescription>
      </DialogHeader>

      <div className="flex flex-col gap-1">
        <label htmlFor="category-name" className="text-sm font-medium">
          Name
        </label>
        <input
          id="category-name"
          type="text"
          autoFocus
          autoComplete="off"
          aria-invalid={!!errors.name}
          className={inputClassName}
          {...register("name")}
        />
        {errors.name && (
          <p className="text-destructive text-xs">{errors.name.message}</p>
        )}
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isRename ? "Save" : "Create"}
        </Button>
      </DialogFooter>
    </form>
  );
}

type CategoryFormDialogProps = {
  target: CategoryFormTarget | null;
  onOpenChange: (open: boolean) => void;
  onSaved: () => void;
};

export function CategoryFormDialog({
  target,
  onOpenChange,
  onSaved,
}: CategoryFormDialogProps) {
  return (
    <Dialog open={target !== null} onOpenChange={onOpenChange}>
      <DialogContent>
        {target !== null && (
          <CategoryForm
            category={target === "new" ? null : target}
            onCancel={() => onOpenChange(false)}
            onSaved={() => {
              onSaved();
              onOpenChange(false);
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
