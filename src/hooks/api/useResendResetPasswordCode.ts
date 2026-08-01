import { useMutation } from "@tanstack/react-query";
import { resendResetPasswordCode } from "@/lib/api/auth";

export function useResendResetPasswordCode() {
  return useMutation({
    mutationFn: resendResetPasswordCode,
  });
}
