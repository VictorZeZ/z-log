import { useQuery } from "@tanstack/react-query";
import { getMySessions } from "@/lib/api/dashboard";
import { dashboardQueryKey } from "@/hooks/api/useDashboardOverview";

export const mySessionsQueryKey = [...dashboardQueryKey, "sessions"] as const;

export function useMySessions(enabled: boolean) {
  return useQuery({
    queryKey: mySessionsQueryKey,
    queryFn: getMySessions,
    enabled,
    retry: false,
  });
}
