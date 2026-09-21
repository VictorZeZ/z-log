import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "@/lib/api/dashboard";

export function useDashboard(enabled: boolean, days: number) {
  return useQuery({
    queryKey: ["dashboard", days],
    queryFn: () => getDashboard(days),
    enabled,
    retry: false,
    placeholderData: (previousData) => previousData,
  });
}
