import {
  DashboardDistributionPanel,
  type DistributionSlice,
} from "./DashboardDistributionPanel";

type CategoriesDistributionProps = {
  activeCount: number;
  deletedCount: number;
};

export function CategoriesDistribution({
  activeCount,
  deletedCount,
}: CategoriesDistributionProps) {
  const slices: DistributionSlice[] = [
    {
      key: "activeCount",
      label: "Active",
      value: activeCount,
      color: "var(--emerald-zero)",
    },
    {
      key: "deletedCount",
      label: "Archived",
      value: deletedCount,
      color: "var(--slate-zero)",
    },
  ];

  return (
    <DashboardDistributionPanel
      title="Category distribution"
      description="Categories by current status."
      totalLabel="Total categories"
      slices={slices}
    />
  );
}
