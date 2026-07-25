import type { ApiError } from "@/types/api/common";

type ErrorDetails = Record<string, unknown>;

const DEFAULT_ERROR_MESSAGE = "Something went wrong. Please try again.";

const errorMessageResolvers: Record<
  string,
  (details?: ErrorDetails) => string
> = {
  NOT_FOUND: (d) => `${d?.resource ?? "Item"} not found.`,
  ALREADY_EXISTS: (d) => `${d?.resource ?? "This item"} already exists.`,
  VALIDATION_ERROR: () => "Some of the provided information is invalid.",
  FORBIDDEN: () => "You don't have permission to perform this action.",
  UNAUTHORIZED: () => "Please log in to continue.",
  EXPIRED: (d) => `${d?.resource ?? "This"} has expired.`,
  INVALID_STATE: (d) =>
    `${d?.resource ?? "This item"} is not in a valid state for this action.`,
  UNSUPPORTED_OPERATION: (d) =>
    `${d?.operation ?? "This action"} is not supported.`,
  RATE_LIMIT_EXCEEDED: (d) =>
    d?.retryAfterSeconds
      ? `Too many attempts. Please try again in ${d.retryAfterSeconds} seconds.`
      : "Too many attempts. Please try again later.",
  PAYLOAD_TOO_LARGE: (d) =>
    `${d?.field ?? "File"} exceeds the maximum allowed size.`,
  UNSUPPORTED_MEDIA_TYPE: (d) =>
    `${d?.mediaType ?? "This file type"} is not supported.`,
  LOCKED: () => "This is temporarily locked. Please try again later.",
  EMAIL_NOT_CONFIRMED: () =>
    "Please confirm your email address before continuing.",
  UNAVAILABLE: (d) =>
    `${d?.resource ?? "This service"} is currently unavailable.`,
  UNKNOWN_ERROR: () => DEFAULT_ERROR_MESSAGE,

  // Client-side only code, thrown by apiClient when refresh fails.
  SESSION_EXPIRED: () => "Your session has expired. Please log in again.",
};

export function getErrorMessage(error: ApiError): string {
  const resolveMessage = errorMessageResolvers[error.errorCode];
  return resolveMessage ? resolveMessage(error.details) : DEFAULT_ERROR_MESSAGE;
}

export function getFieldErrors(error: ApiError): Record<string, string> {
  if (error.errorCode !== "VALIDATION_ERROR") {
    return {};
  }

  const errors = error.details?.errors as
    { field: string; reason: string }[] | undefined;

  if (!errors) {
    return {};
  }

  return errors.reduce<Record<string, string>>((acc, { field, reason }) => {
    acc[field] = reason;
    return acc;
  }, {});
}
