import { useMutation } from "@tanstack/react-query";
import { revokeSession } from "@/lib/api/dashboard";

export function useRevokeSession() {
  return useMutation({
    mutationFn: revokeSession,
  });
}
