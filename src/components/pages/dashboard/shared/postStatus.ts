import type { ChartConfig } from "@/components/ui/chart";
import type { PostStatusTotalsResponse } from "@/types/api/dashboard";
import { PostStatus, postStatusLabels } from "@/types/api/post";

type PostStatusSeries = {
  key: keyof PostStatusTotalsResponse;
  status: PostStatus;
  color: string;
  pillClassName: string;
};

export const POST_STATUS_SERIES: PostStatusSeries[] = [
  {
    key: "publishedCount",
    status: PostStatus.Published,
    color: "var(--emerald-zero)",
    pillClassName: "bg-emerald-zero/15 text-emerald-zero",
  },
  {
    key: "pendingApprovalCount",
    status: PostStatus.PendingApproval,
    color: "var(--amber-zero)",
    pillClassName: "bg-amber-zero/15 text-amber-zero",
  },
  {
    key: "draftCount",
    status: PostStatus.Draft,
    color: "var(--slate-zero)",
    pillClassName: "bg-slate-one text-slate-zero",
  },
  {
    key: "rejectedCount",
    status: PostStatus.Rejected,
    color: "var(--red-zero)",
    pillClassName: "bg-red-zero/15 text-red-zero",
  },
];

export const postStatusChartConfig: ChartConfig = Object.fromEntries(
  POST_STATUS_SERIES.map(({ key, status, color }) => [
    key,
    { label: postStatusLabels[status], color },
  ]),
);

export const postStatusPillClassNames = Object.fromEntries(
  POST_STATUS_SERIES.map(({ status, pillClassName }) => [
    status,
    pillClassName,
  ]),
) as Record<PostStatus, string>;
