import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function secondsUntil(expiresAt: string): number {
  const remainingMs = new Date(expiresAt).getTime() - Date.now();
  return Math.max(0, Math.round(remainingMs / 1000));
}
