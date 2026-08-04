import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/lib/api/account";

export const currentUserQueryKey = ["currentUser"] as const;

export function useCurrentUser(enabled: boolean) {
  return useQuery({
    queryKey: currentUserQueryKey,
    queryFn: getCurrentUser,
    enabled,
    retry: false,
  });
}
