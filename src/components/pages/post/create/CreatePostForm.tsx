"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  createPostSchema,
  type CreatePostFormValues,
} from "@/lib/validations/post";
import { useCategories } from "@/hooks/api/useCategories";
import { useCreatePost } from "@/hooks/api/useCreatePost";
import { useCreateDraft } from "@/hooks/api/useCreateDraft";
import { handleApiError } from "@/lib/api/errorHandler";
import { getFieldErrors } from "@/lib/api/errorMessages";
import { ApiError } from "@/types/api/common";
import { useAppSelector } from "@/lib/store/hooks";
import { RichTextEditor } from "@/components/editor/RichTextEditor";
import { PostMetaFields } from "./PostMetaFields";
import { PostActionsBar } from "./PostActionsBar";
import { PostViewMode } from "./PostViewMode";
import { PostPreviewModal } from "./PostPreviewModal";
import { CancelConfirmDialog } from "./CancelConfirmDialog";

const emptyValues: CreatePostFormValues = {
  title: "",
  summary: "",
  content: "",
  categoryId: "",
  tags: [],
  titleImage: null,
};

export function CreatePostForm() {
  const router = useRouter();
  const currentUser = useAppSelector((state) => state.user.data);
  const isUserLoading = useAppSelector((state) => state.user.isLoading);
  const { data: categories } = useCategories();

  const [viewMode, setViewMode] = useState<"edit" | "view">("edit");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [titleImagePreviewUrl, setTitleImagePreviewUrl] = useState<
    string | null
  >(null);

  const { mutate: createPost, isPending: isPublishing } = useCreatePost();
  const { mutate: createDraft, isPending: isSavingDraft } = useCreateDraft();

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm<CreatePostFormValues>({
    resolver: zodResolver(createPostSchema),
    defaultValues: emptyValues,
  });

  const values = watch();
  const categoryName =
    categories?.find((category) => category.id === values.categoryId)?.name ??
    "";

  useEffect(() => {
    if (!isUserLoading && !currentUser) {
      router.replace("/login");
    }
  }, [isUserLoading, currentUser, router]);

  useEffect(() => {
    if (!values.titleImage) {
      setTitleImagePreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(values.titleImage);
    setTitleImagePreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [values.titleImage]);

  const applyServerFieldErrors = (error: unknown) => {
    if (error instanceof ApiError && error.errorCode === "VALIDATION_ERROR") {
      const fieldErrors = getFieldErrors(error);
      Object.entries(fieldErrors).forEach(([field, message]) => {
        const formField = (field.charAt(0).toLowerCase() +
          field.slice(1)) as keyof CreatePostFormValues;
        if (formField in emptyValues) {
          setError(formField, { message });
        }
      });
    }
    handleApiError(error);
  };

  const onPublish = handleSubmit((formValues) => {
    createPost(formValues, {
      onSuccess: (data) => {
        toast.success("Post published.");
        router.push(`/post/${data.slug}`);
      },
      onError: applyServerFieldErrors,
    });
  });

  const onSaveDraft = handleSubmit((formValues) => {
    createDraft(formValues, {
      onSuccess: () => {
        toast.success("Draft saved.");
        router.push("/dashboard");
      },
      onError: applyServerFieldErrors,
    });
  });

  if (isUserLoading || !currentUser) {
    return null;
  }

  return (
    <div className="flex w-full flex-col gap-6 pb-24">
      {viewMode === "edit" ? (
        <div className="flex flex-col gap-6">
          <PostMetaFields
            register={register}
            control={control}
            errors={errors}
            setValue={setValue}
            watch={watch}
          />

          <div className="flex flex-col gap-1">
            <Controller
              control={control}
              name="content"
              render={({ field }) => (
                <RichTextEditor
                  initialContent={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.content && (
              <p className="text-destructive text-xs">
                {errors.content.message}
              </p>
            )}
          </div>
        </div>
      ) : (
        <PostViewMode
          title={values.title}
          content={values.content}
          tags={values.tags}
          categoryName={categoryName}
          titleImageUrl={titleImagePreviewUrl}
        />
      )}

      <PostActionsBar
        viewMode={viewMode}
        onToggleView={() =>
          setViewMode((mode) => (mode === "edit" ? "view" : "edit"))
        }
        onPreview={() => setIsPreviewOpen(true)}
        onCancel={() => setIsCancelDialogOpen(true)}
        onSaveDraft={onSaveDraft}
        onPublish={onPublish}
        isSavingDraft={isSavingDraft}
        isPublishing={isPublishing}
      />

      <PostPreviewModal
        open={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
        title={values.title}
        summary={values.summary}
        tags={values.tags}
        categoryName={categoryName}
        titleImageUrl={titleImagePreviewUrl}
      />

      <CancelConfirmDialog
        open={isCancelDialogOpen}
        onOpenChange={setIsCancelDialogOpen}
        onConfirm={() => router.push("/dashboard")}
      />
    </div>
  );
}
