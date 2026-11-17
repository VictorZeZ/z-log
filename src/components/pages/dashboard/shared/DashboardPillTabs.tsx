"use client";

import { cn } from "@/lib/utils";

export type DashboardPillOption<T extends string> = {
  value: T;
  label: string;
  count?: number;
};

type DashboardPillTabsProps<T extends string> = {
  options: readonly DashboardPillOption<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
};

export function DashboardPillTabs<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
}: DashboardPillTabsProps<T>) {
  return (
    <div role="group" aria-label={ariaLabel} className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          aria-pressed={value === option.value}
          className={cn(
            "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm duration-150 outline-none",
            value === option.value
              ? "bg-indigo-zero/15 text-indigo-zero border-indigo-zero/30"
              : "text-slate-zero hover:bg-slate-one",
          )}
        >
          {option.label}
          {option.count !== undefined && (
            <span className="text-xs opacity-70">{option.count}</span>
          )}
        </button>
      ))}
    </div>
  );
}
