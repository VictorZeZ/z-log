import { z } from "zod";

// Mirrors CreateCategoryCommandValidator on the backend. The slug source
// rules are enforced server-side and surface through the name field error.
const MAX_NAME_LENGTH = 100;

// Mirrors the term limit of the admin categories endpoint.
export const MAX_CATEGORY_TERM_LENGTH = 256;

export const categoryFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required.")
    .max(
      MAX_NAME_LENGTH,
      `Name must not exceed ${MAX_NAME_LENGTH} characters.`,
    ),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
