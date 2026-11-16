"use client";

import { Line, LineChart } from "recharts";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";

const chartConfig = {
  value: { label: "Daily count", color: "var(--indigo-zero)" },
} satisfies ChartConfig;

type DashboardSparklineProps = {
  series: number[];
};

export function DashboardSparkline({ series }: DashboardSparklineProps) {
  const data = series.map((value, index) => ({ index, value }));

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-8 w-24 shrink-0"
      aria-hidden="true"
    >
      <LineChart data={data}>
        <Line
          dataKey="value"
          type="monotone"
          stroke="var(--color-value)"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
