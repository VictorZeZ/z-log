import { FilterPill } from "@/components/shared/FilterPill";
import {
  STATUS_DEFINITIONS,
  chartConfig,
  type StatusFilter,
} from "./activityChartConfig";

type DashboardActivityChartFiltersProps = {
  statusFilter: StatusFilter;
  onStatusChange: (value: StatusFilter) => void;
};

export function DashboardActivityChartFilters({
  statusFilter,
  onStatusChange,
}: DashboardActivityChartFiltersProps) {
  return (
    <div
      role="group"
      aria-label="Filter by post status"
      className="mb-4 flex flex-wrap gap-2"
    >
      <FilterPill
        active={statusFilter === "all"}
        onClick={() => onStatusChange("all")}
      >
        All
      </FilterPill>

      {STATUS_DEFINITIONS.map(({ key }) => (
        <FilterPill
          key={key}
          active={statusFilter === key}
          color={chartConfig[key].color}
          onClick={() => onStatusChange(key)}
        >
          {chartConfig[key].label}
        </FilterPill>
      ))}
    </div>
  );
}
