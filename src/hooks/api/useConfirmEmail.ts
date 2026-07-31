import { useMutation } from "@tanstack/react-query";
import { confirmEmail } from "@/lib/api/auth";

export function useConfirmEmail() {
  return useMutation({
    mutationFn: confirmEmail,
  });
}
