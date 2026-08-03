// Greeting.tsx
"use client";

import { useAppSelector } from "@/lib/store/hooks";

export default function Greeting() {
  const user = useAppSelector((state) => state.user.data);
  return <p>Welcome, {user?.fullName ?? "Guest"}</p>;
}
