import { apiClient } from "@/lib/api/client";
import type {
  CategoriesDailyReportResponse,
  GetDashboardOverviewResponse,
  GetMySessionsResponse,
  PostsDailyReportResponse,
  RevokeSessionResponse,
  UsersDailyReportResponse,
} from "@/types/api/dashboard";

const MS_PER_DAY = 86_400_000;

// Mirrors ReportDateRangeRules.MaxRangeDays on the backend.
export const MAX_REPORT_RANGE_DAYS = 30;

// The server resolves dates in UTC, so the client does too.
function toDateOnly(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function buildReportParams(days: number): URLSearchParams {
  const to = new Date();
  const from = new Date(to.getTime() - (days - 1) * MS_PER_DAY);

  return new URLSearchParams({
    from: toDateOnly(from),
    to: toDateOnly(to),
  });
}

export async function getDashboardOverview(): Promise<GetDashboardOverviewResponse> {
  return apiClient<GetDashboardOverviewResponse>("/dashboard", {
    method: "GET",
  });
}

export async function getPostsReport(
  days: number,
  categoryId?: string,
): Promise<PostsDailyReportResponse> {
  const params = buildReportParams(days);
  if (categoryId) {
    params.set("categoryId", categoryId);
  }

  return apiClient<PostsDailyReportResponse>(
    `/dashboard/posts?${params.toString()}`,
    { method: "GET" },
  );
}

export async function getUsersReport(
  days: number,
): Promise<UsersDailyReportResponse> {
  return apiClient<UsersDailyReportResponse>(
    `/dashboard/users?${buildReportParams(days).toString()}`,
    { method: "GET" },
  );
}

export async function getCategoriesReport(
  days: number,
): Promise<CategoriesDailyReportResponse> {
  return apiClient<CategoriesDailyReportResponse>(
    `/dashboard/categories?${buildReportParams(days).toString()}`,
    { method: "GET" },
  );
}

export async function getMySessions(): Promise<GetMySessionsResponse[]> {
  return apiClient<GetMySessionsResponse[]>("/dashboard/sessions", {
    method: "GET",
  });
}

export async function revokeSession(
  sessionId: string,
): Promise<RevokeSessionResponse> {
  return apiClient<RevokeSessionResponse>(
    `/dashboard/sessions/${encodeURIComponent(sessionId)}`,
    { method: "DELETE" },
  );
}
