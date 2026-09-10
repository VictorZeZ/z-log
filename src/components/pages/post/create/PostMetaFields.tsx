"use client";

import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import type {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import Image from "next/image";
import { ImagePlus, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/hooks/api/useCategories";
import { TagsInput } from "./TagsInput";
import type { CreatePostFormValues } from "@/lib/validations/post";

type PostMetaFieldsProps = {
  register: UseFormRegister<CreatePostFormValues>;
  control: Control<CreatePostFormValues>;
  errors: FieldErrors<CreatePostFormValues>;
  setValue: UseFormSetValue<CreatePostFormValues>;
  watch: UseFormWatch<CreatePostFormValues>;
};

const inputClassName =
  "font-roboto w-full rounded-md border bg-gray-100 px-3 py-2 text-sm outline-none dark:bg-gray-950";

export function PostMetaFields({
  register,
  control,
  errors,
  setValue,
  watch,
}: PostMetaFieldsProps) {
  const { data: categories, isLoading: isLoadingCategories } = useCategories();
  const titleImageFile = watch("titleImage");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!titleImageFile) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(titleImageFile);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [titleImageFile]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="text-sm font-medium">
          Title
        </label>
        <input
          id="title"
          type="text"
          aria-invalid={!!errors.title}
          className={inputClassName}
          {...register("title")}
        />
        {errors.title && (
          <p className="text-destructive text-xs">{errors.title.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="summary" className="text-sm font-medium">
          Summary
        </label>
        <textarea
          id="summary"
          rows={3}
          aria-invalid={!!errors.summary}
          className={inputClassName}
          {...register("summary")}
        />
        {errors.summary && (
          <p className="text-destructive text-xs">{errors.summary.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Category</label>
        <Controller
          control={control}
          name="categoryId"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full max-w-xs">
                <SelectValue
                  placeholder={
                    isLoadingCategories ? "Loading…" : "Select a category"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {categories?.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.categoryId && (
          <p className="text-destructive text-xs">
            {errors.categoryId.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Tags</label>
        <Controller
          control={control}
          name="tags"
          render={({ field }) => (
            <TagsInput
              value={field.value}
              onChange={field.onChange}
              error={errors.tags?.message}
            />
          )}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Cover image</label>
        {previewUrl ? (
          <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-2xl border">
            <Image
              src={previewUrl}
              alt="Cover preview"
              fill
              sizes="448px"
              className="object-cover"
            />
            <button
              type="button"
              onClick={() =>
                setValue("titleImage", null, { shouldValidate: true })
              }
              aria-label="Remove cover image"
              className="absolute top-2 right-2 flex size-7 items-center justify-center rounded-md bg-black/60 text-white"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <label className="bg-slate-one hover:bg-slate-two flex w-full max-w-md cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed p-8 text-sm duration-150">
            <ImagePlus className="text-slate-zero" />
            Click to upload a cover image
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={(event) =>
                setValue("titleImage", event.target.files?.[0] ?? null, {
                  shouldValidate: true,
                })
              }
            />
          </label>
        )}
        {errors.titleImage && (
          <p className="text-destructive text-xs">
            {errors.titleImage.message as string}
          </p>
        )}
      </div>
    </div>
  );
}
