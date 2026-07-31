import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .email("Please enter a valid email address.")
    .min(1, "Email is required."),
  password: z.string().min(1, "Password is required."),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

// Mirrors PasswordValidationRules.ApplyPasswordRules on the backend.
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .max(128, "Password must not exceed 128 characters.")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
  .regex(/[0-9]/, "Password must contain at least one number.")
  .regex(
    /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
    "Password must contain at least one special character.",
  )
  .refine((value) => !value.includes(" "), "Password cannot contain spaces.");

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "First name is required.")
      .max(100, "First name must not exceed 100 characters."),
    lastName: z
      .string()
      .min(1, "Last name is required.")
      .max(100, "Last name must not exceed 100 characters."),
    email: z
      .email("Please enter a valid email address.")
      .min(1, "Email is required.")
      .max(256, "Email must not exceed 256 characters."),
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
