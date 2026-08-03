// Greeting.tsx
"use client";

import { useAppSelector } from "@/lib/store/hooks";
import { Shimmer } from "@shimmer-from-structure/react";

export default function Greeting() {
  const user = useAppSelector((state) => state.user.data);
  const isLoading = useAppSelector((state) => state.user.isLoading);
  return (
    <>
      <Shimmer loading={isLoading}>
        <p>Welcome, {user?.fullName ?? "Guest"}</p>
      </Shimmer>
    </>
  );
}
