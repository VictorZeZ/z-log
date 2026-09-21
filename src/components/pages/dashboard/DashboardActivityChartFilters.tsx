import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterPill } from "@/components/shared/FilterPill";
import {
  RANGE_OPTIONS,
  STATUS_DEFINITIONS,
  chartConfig,
  type RangeDays,
  type StatusFilter,
} from "./activityChartConfig";

type DashboardActivityChartFiltersProps = {
  statusFilter: StatusFilter;
  rangeDays: RangeDays;
  onStatusChange: (value: StatusFilter) => void;
  onRangeChange: (value: RangeDays) => void;
};

export function DashboardActivityChartFilters({
  statusFilter,
  rangeDays,
  onStatusChange,
  onRangeChange,
}: DashboardActivityChartFiltersProps) {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
      <div
        role="group"
        aria-label="Filter by post status"
        className="flex flex-wrap gap-2"
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

      <Select
        value={String(rangeDays)}
        onValueChange={(value) => onRangeChange(Number(value) as RangeDays)}
      >
        <SelectTrigger
          size="sm"
          className="w-full max-w-40"
          aria-label="Time range"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {RANGE_OPTIONS.map((days) => (
            <SelectItem key={days} value={String(days)}>
              Last {days} days
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
