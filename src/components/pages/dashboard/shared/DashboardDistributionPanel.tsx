"use client";

import { Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { DashboardPanel } from "./DashboardPanel";

export type DistributionSlice = {
  key: string;
  label: string;
  value: number;
  color: string;
};

type DashboardDistributionPanelProps = {
  title: string;
  description: string;
  totalLabel: string;
  slices: readonly DistributionSlice[];
};

export function DashboardDistributionPanel({
  title,
  description,
  totalLabel,
  slices,
}: DashboardDistributionPanelProps) {
  const total = slices.reduce((sum, slice) => sum + slice.value, 0);

  const chartConfig: ChartConfig = Object.fromEntries(
    slices.map(({ key, label, color }) => [key, { label, color }]),
  );

  const pieData =
    total > 0
      ? slices.map(({ key, value, color }) => ({ key, value, fill: color }))
      : [{ key: "empty", value: 1, fill: "var(--slate-one)" }];

  return (
    <DashboardPanel title={title} description={description}>
      <div className="relative mx-auto size-44">
        <ChartContainer
          config={chartConfig}
          className="aspect-square size-full"
        >
          <PieChart>
            {total > 0 && (
              <ChartTooltip
                content={<ChartTooltipContent hideLabel nameKey="key" />}
              />
            )}
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="key"
              innerRadius="68%"
              outerRadius="100%"
              stroke="none"
              isAnimationActive={false}
            />
          </PieChart>
        </ChartContainer>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-space-grotesk text-3xl font-bold">
            {total.toLocaleString()}
          </span>
          <span className="text-slate-zero text-xs">{totalLabel}</span>
        </div>
      </div>

      <ul className="flex flex-col gap-3">
        {slices.map(({ key, label, value, color }) => {
          const percent =
            total > 0 ? ((value / total) * 100).toFixed(1) : "0.0";

          return (
            <li key={key} className="flex items-center justify-between text-sm">
              <span className="text-slate-zero flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="size-2 rounded-full"
                  style={{ backgroundColor: color }}
                />
                {label}
              </span>
              <span className="font-medium">
                {value.toLocaleString()}{" "}
                <span className="text-slate-zero text-xs font-normal">
                  {percent}%
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </DashboardPanel>
  );
}
