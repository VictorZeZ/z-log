import { formatShortDate } from "@/lib/utils";
import type { PostStatusDailyCount } from "@/types/api/dashboard";
import type { StatusKey } from "./activityChartConfig";

const MS_PER_DAY = 86_400_000;

export type DailyPoint = {
  date: string;
  label: string;
} & Record<StatusKey, number>;

export function buildDailySeries(
  from: string,
  to: string,
  breakdown: PostStatusDailyCount[],
): DailyPoint[] {
  const byDate = new Map(breakdown.map((day) => [day.date, day]));
  const end = Date.parse(to);
  const points: DailyPoint[] = [];

  for (let time = Date.parse(from); time <= end; time += MS_PER_DAY) {
    const date = new Date(time).toISOString().slice(0, 10);
    const day = byDate.get(date);

    points.push({
      date,
      label: formatShortDate(`${date}T00:00:00`),
      published: day?.publishedCount ?? 0,
      pending: day?.pendingApprovalCount ?? 0,
      rejected: day?.rejectedCount ?? 0,
      draft: day?.draftCount ?? 0,
    });
  }

  return points;
}
