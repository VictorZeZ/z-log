import type { ChartConfig } from "@/components/ui/chart";

// The backend rejects report ranges longer than 30 days (ReportDateRangeRules.MaxRangeDays).
export const RANGE_OPTIONS = [7, 14, 30] as const;
export type RangeDays = (typeof RANGE_OPTIONS)[number];
export const DEFAULT_RANGE_DAYS: RangeDays = 30;

export const chartConfig = {
  published: { label: "Published", color: "var(--emerald-zero)" },
  pending: { label: "Pending", color: "var(--amber-zero)" },
  rejected: { label: "Rejected", color: "var(--red-zero)" },
  draft: { label: "Drafts", color: "var(--slate-zero)" },
} satisfies ChartConfig;

export type StatusKey = keyof typeof chartConfig;
export type StatusFilter = "all" | StatusKey;

export const STATUS_DEFINITIONS: { key: StatusKey; emptyLabel: string }[] = [
  { key: "published", emptyLabel: "published posts" },
  { key: "pending", emptyLabel: "pending posts" },
  { key: "rejected", emptyLabel: "rejected posts" },
  { key: "draft", emptyLabel: "draft posts" },
];
