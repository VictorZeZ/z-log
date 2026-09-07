import { Shimmer } from "@shimmer-from-structure/react";

export function DashboardSkeleton() {
  return (
    <div className="mt-6 flex w-full flex-col gap-8 px-4 pb-8 sm:mt-10 xl:w-6xl xl:px-0">
      <Shimmer loading>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <div className="bg-muted h-6 w-40 rounded-full" />
            <div className="bg-muted h-10 w-64 rounded" />
            <div className="bg-muted h-4 w-48 rounded" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-muted h-36 rounded-3xl" />
            ))}
          </div>

          <div className="grid w-full gap-4 xl:grid-cols-[1.7fr_1fr]">
            <div className="bg-muted h-80 rounded-3xl" />
            <div className="bg-muted h-80 rounded-3xl" />
          </div>

          <div className="grid w-full gap-4 xl:grid-cols-[1.7fr_1fr]">
            <div className="bg-muted h-64 rounded-3xl" />
            <div className="bg-muted h-64 rounded-3xl" />
          </div>
        </div>
      </Shimmer>
    </div>
  );
}
