import type { ChartConfig } from "@/components/ui/chart";

export const chartConfig = {
  published: { label: "Published", color: "var(--emerald-zero)" },
  pending: { label: "Pending", color: "var(--amber-zero)" },
  rejected: { label: "Rejected", color: "var(--red-zero)" },
  draft: { label: "Drafts", color: "var(--slate-zero)" },
} satisfies ChartConfig;

export type StatusKey = keyof typeof chartConfig;
export type StatusFilter = "all" | StatusKey;

export type StatusCounts = {
  publishedCount: number;
  pendingApprovalCount: number;
  rejectedCount: number;
  draftCount: number;
};

export const STATUS_DEFINITIONS: {
  key: StatusKey;
  countKey: keyof StatusCounts;
  emptyLabel: string;
}[] = [
  {
    key: "published",
    countKey: "publishedCount",
    emptyLabel: "published posts",
  },
  {
    key: "pending",
    countKey: "pendingApprovalCount",
    emptyLabel: "pending posts",
  },
  { key: "rejected", countKey: "rejectedCount", emptyLabel: "rejected posts" },
  { key: "draft", countKey: "draftCount", emptyLabel: "draft posts" },
];
