import { formatShortDate } from "@/lib/utils";
import type { PostStatusDailyCount } from "@/types/api/dashboard";
import type { StatusKey } from "./activityChartConfig";

export type DailyPoint = {
  date: string;
  label: string;
} & Record<StatusKey, number>;

// The backend now returns one entry per day for the whole range (zeros
// included), so there's no gap to fill anymore - just map straight over it.
export function buildDailySeries(
  breakdown: PostStatusDailyCount[],
): DailyPoint[] {
  return breakdown.map((day) => ({
    date: day.date,
    label: formatShortDate(`${day.date}T00:00:00`),
    published: day.publishedCount,
    pending: day.pendingApprovalCount,
    rejected: day.rejectedCount,
    draft: day.draftCount,
  }));
}
