import { useMutation } from "@tanstack/react-query";
import { resendRegistrationCode } from "@/lib/api/auth";

export function useResendRegistrationCode() {
  return useMutation({
    mutationFn: resendRegistrationCode,
  });
}
