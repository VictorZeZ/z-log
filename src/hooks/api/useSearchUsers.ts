import { useQuery } from "@tanstack/react-query";
import { searchUsers } from "@/lib/api/user";
import type { SearchUsersParams } from "@/types/api/user";

export const usersQueryKey = ["users"] as const;

export function useSearchUsers(params: SearchUsersParams) {
  return useQuery({
    queryKey: [...usersQueryKey, "search", params],
    queryFn: () => searchUsers(params),
    enabled: params.term.length > 0,
    retry: false,
    placeholderData: (previousData) => previousData,
  });
}
