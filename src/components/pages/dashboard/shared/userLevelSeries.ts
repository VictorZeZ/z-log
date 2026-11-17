import { UserLevel, userLevelLabels } from "@/types/api/account";
import type { UserLevelTotalsResponse } from "@/types/api/dashboard";

type UserLevelSeries = {
  key: keyof UserLevelTotalsResponse;
  label: string;
  color: string;
};

export const USER_LEVEL_SERIES: UserLevelSeries[] = [
  {
    key: "normalCount",
    label: userLevelLabels[UserLevel.Normal],
    color: "var(--slate-zero)",
  },
  {
    key: "authorCount",
    label: userLevelLabels[UserLevel.Author],
    color: "var(--blue-zero)",
  },
  {
    key: "adminCount",
    label: userLevelLabels[UserLevel.Admin],
    color: "var(--indigo-zero)",
  },
  {
    key: "ownerCount",
    label: userLevelLabels[UserLevel.Owner],
    color: "var(--amber-zero)",
  },
];
