import { useQuery } from "@tanstack/react-query";
import { usersQueryKey } from "@/hooks/api/useSearchUsers";
import { getUserDetails } from "@/lib/api/user";

export function useUserDetails(userId: string, enabled: boolean) {
  return useQuery({
    queryKey: [...usersQueryKey, "details", userId],
    queryFn: () => getUserDetails(userId),
    enabled: enabled && userId !== "",
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}
