import { toast } from "sonner";
import { ApiError } from "@/types/api/common";
import { getErrorMessage } from "@/lib/api/errorMessages";

const DEFAULT_ERROR_MESSAGE = "Something went wrong. Please try again.";

export function handleApiError(error: unknown): void {
  const message =
    error instanceof ApiError ? getErrorMessage(error) : DEFAULT_ERROR_MESSAGE;

  toast.error(message);
}
