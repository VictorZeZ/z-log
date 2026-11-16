import { Shimmer } from "@shimmer-from-structure/react";

export function DashboardOverviewSkeleton() {
  return (
    <Shimmer loading>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <div className="bg-muted h-4 w-40 rounded" />
          <div className="bg-muted h-12 w-64 rounded" />
          <div className="bg-muted h-4 w-72 rounded" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-muted h-36 rounded-3xl" />
          ))}
        </div>
      </div>
    </Shimmer>
  );
}
