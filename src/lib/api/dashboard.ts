import { apiClient } from "@/lib/api/client";
import type {
  DashboardApiScope,
  GetDashboardResponse,
} from "@/types/api/dashboard";

const MS_PER_DAY = 86_400_000;

function toDateOnly(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export async function getDashboard(
  days: number,
  scope: DashboardApiScope = "All",
): Promise<GetDashboardResponse> {
  const to = new Date();
  const from = new Date(to.getTime() - (days - 1) * MS_PER_DAY);

  const params = new URLSearchParams({
    scope,
    from: toDateOnly(from),
    to: toDateOnly(to),
  });

  return apiClient<GetDashboardResponse>(`/dashboard?${params.toString()}`, {
    method: "GET",
  });
}
