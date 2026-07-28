import { useMutation } from "@tanstack/react-query";
import { resendLoginVerificationCode } from "@/lib/api/auth";

export function useResendLoginVerificationCode() {
  return useMutation({
    mutationFn: resendLoginVerificationCode,
  });
}
