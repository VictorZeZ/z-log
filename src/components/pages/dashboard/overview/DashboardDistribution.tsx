import { CategoriesDistribution } from "@/components/pages/dashboard/shared/CategoriesDistribution";
import { PostsDistribution } from "@/components/pages/dashboard/shared/PostsDistribution";
import { UsersDistribution } from "@/components/pages/dashboard/shared/UsersDistribution";
import type { ActivityMetric } from "@/components/pages/dashboard/shared/activityMetric";
import type {
  PostOverviewResponse,
  SiteOverviewResponse,
} from "@/types/api/dashboard";

type DashboardDistributionProps = {
  metric: ActivityMetric;
  myPosts: PostOverviewResponse;
  // Null means the personal view.
  site: SiteOverviewResponse | null;
};

export function DashboardDistribution({
  metric,
  myPosts,
  site,
}: DashboardDistributionProps) {
  if (site && metric === "users") {
    return <UsersDistribution levels={site.users.levels} />;
  }

  if (site && metric === "categories") {
    return (
      <CategoriesDistribution
        activeCount={site.categories.activeCount}
        deletedCount={site.categories.deletedCount}
      />
    );
  }

  return <PostsDistribution counts={site?.posts ?? myPosts} />;
}
