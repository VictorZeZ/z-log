import { useMutation } from "@tanstack/react-query";
import { confirmLogin } from "@/lib/api/auth";

export function useConfirmLogin() {
  return useMutation({
    mutationFn: confirmLogin,
  });
}
