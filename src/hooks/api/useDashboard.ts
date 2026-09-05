import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "@/lib/api/dashboard";

export function useDashboard(enabled: boolean) {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
    enabled,
    retry: false,
  });
}
