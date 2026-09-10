import { z } from "zod";

const MAX_TITLE_LENGTH = 256;
const MAX_SUMMARY_LENGTH = 256;
const MAX_TAG_LENGTH = 50;

// Mirrors PostImageValidationRules on the backend.
const MAX_TITLE_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_TITLE_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];

// Mirrors TagValidationRules.ApplyTagRules on the backend.
const TAG_STRUCTURAL_CHARACTERS = /[[\]",]/;

export const tagSchema = z
  .string()
  .min(1, "Tag cannot be empty.")
  .max(MAX_TAG_LENGTH, `Tag must not exceed ${MAX_TAG_LENGTH} characters.`)
  .refine(
    (tag) => !TAG_STRUCTURAL_CHARACTERS.test(tag),
    "Tag must not contain brackets, quotes, or commas.",
  );

function isContentEmpty(html: string): boolean {
  return html.replace(/<[^>]+>/g, "").trim().length === 0;
}

export const createPostSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required.")
    .max(
      MAX_TITLE_LENGTH,
      `Title must not exceed ${MAX_TITLE_LENGTH} characters.`,
    ),
  summary: z
    .string()
    .min(1, "Summary is required.")
    .max(
      MAX_SUMMARY_LENGTH,
      `Summary must not exceed ${MAX_SUMMARY_LENGTH} characters.`,
    ),
  content: z
    .string()
    .refine((html) => !isContentEmpty(html), "Content is required."),
  categoryId: z.string().min(1, "Category is required."),
  tags: z.array(tagSchema),
  titleImage: z
    .instanceof(File)
    .refine(
      (file) => file.size <= MAX_TITLE_IMAGE_SIZE_BYTES,
      "Image must not exceed 5 MB.",
    )
    .refine(
      (file) => ALLOWED_TITLE_IMAGE_TYPES.includes(file.type),
      "Unsupported image type. Use JPEG, PNG, WEBP, or GIF.",
    )
    .nullable(),
});

export type CreatePostFormValues = z.infer<typeof createPostSchema>;
