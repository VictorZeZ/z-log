export type ActivityMetric = "posts" | "users" | "categories";

export const ACTIVITY_METRIC_OPTIONS = [
  { value: "posts", label: "Posts" },
  { value: "users", label: "Users" },
  { value: "categories", label: "Categories" },
] as const;
