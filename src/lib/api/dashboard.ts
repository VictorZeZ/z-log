import { apiClient } from "@/lib/api/client";
import type { GetDashboardResponse } from "@/types/api/dashboard";

export async function getDashboard(): Promise<GetDashboardResponse> {
  return apiClient<GetDashboardResponse>("/dashboard", {
    method: "GET",
  });
}
