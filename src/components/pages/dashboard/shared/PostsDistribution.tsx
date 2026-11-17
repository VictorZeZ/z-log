import type { PostOverviewResponse } from "@/types/api/dashboard";
import { postStatusLabels } from "@/types/api/post";
import {
  DashboardDistributionPanel,
  type DistributionSlice,
} from "./DashboardDistributionPanel";
import { POST_STATUS_SERIES } from "./postStatus";

type PostsDistributionProps = {
  counts: PostOverviewResponse;
};

export function PostsDistribution({ counts }: PostsDistributionProps) {
  const slices: DistributionSlice[] = POST_STATUS_SERIES.map(
    ({ key, status, color }) => ({
      key,
      label: postStatusLabels[status],
      value: counts[key],
      color,
    }),
  );

  return (
    <DashboardDistributionPanel
      title="Post distribution"
      description="Content by current status."
      totalLabel="Total posts"
      slices={slices}
    />
  );
}
