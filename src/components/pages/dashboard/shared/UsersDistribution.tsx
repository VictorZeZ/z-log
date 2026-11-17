import type { UserLevelTotalsResponse } from "@/types/api/dashboard";
import {
  DashboardDistributionPanel,
  type DistributionSlice,
} from "./DashboardDistributionPanel";
import { USER_LEVEL_SERIES } from "./userLevelSeries";

type UsersDistributionProps = {
  levels: UserLevelTotalsResponse;
};

export function UsersDistribution({ levels }: UsersDistributionProps) {
  const slices: DistributionSlice[] = USER_LEVEL_SERIES.map(
    ({ key, label, color }) => ({
      key,
      label,
      value: levels[key],
      color,
    }),
  );

  return (
    <DashboardDistributionPanel
      title="User distribution"
      description="Accounts by level."
      totalLabel="Total users"
      slices={slices}
    />
  );
}
