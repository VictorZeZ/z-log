import { Suspense } from "react";
import { DashboardPosts } from "@/components/pages/dashboard/posts/DashboardPosts";

export default function DashboardPostsPage() {
  return (
    <Suspense>
      <DashboardPosts />
    </Suspense>
  );
}
