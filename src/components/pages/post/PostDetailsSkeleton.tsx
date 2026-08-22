import { Shimmer } from "@shimmer-from-structure/react";

export function PostDetailsSkeleton() {
  return (
    <div className="mt-6 flex w-full shrink-0 flex-col gap-6 px-4 sm:mt-10 xl:w-6xl xl:px-0">
      <Shimmer loading>
        <div className="flex flex-col gap-6">
          <div className="bg-muted h-4 w-28 rounded" />
          <div className="bg-muted h-6 w-40 rounded-full" />
          <div className="bg-muted h-14 w-3/4 rounded" />
          <div className="bg-muted h-16 w-full rounded" />
          <div className="bg-muted aspect-video w-full rounded-3xl" />
          <div className="flex flex-col gap-3">
            <div className="bg-muted h-4 w-full rounded" />
            <div className="bg-muted h-4 w-full rounded" />
            <div className="bg-muted h-4 w-2/3 rounded" />
          </div>
        </div>
      </Shimmer>
    </div>
  );
}
