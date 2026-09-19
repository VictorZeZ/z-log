"use client";

import { ToggleGroup } from "radix-ui";
import { Globe, User } from "lucide-react";
import type { DashboardScope } from "@/types/api/dashboard";

type DashboardScopeSwitchProps = {
  scope: DashboardScope;
  onScopeChange: (scope: DashboardScope) => void;
};

const OPTIONS = [
  { value: "mine", label: "My Dashboard", icon: User },
  { value: "site", label: "Entire Site", icon: Globe },
] as const;

export function DashboardScopeSwitch({
  scope,
  onScopeChange,
}: DashboardScopeSwitchProps) {
  return (
    <ToggleGroup.Root
      type="single"
      value={scope}
      onValueChange={(value) => {
        if (value) onScopeChange(value as DashboardScope);
      }}
      aria-label="Dashboard scope"
      className="bg-slate-one flex w-full items-center gap-1 rounded-full border p-1 sm:w-auto"
    >
      {OPTIONS.map(({ value, label, icon: Icon }) => (
        <ToggleGroup.Item
          key={value}
          value={value}
          className="text-slate-zero data-[state=on]:bg-slate-three data-[state=on]:text-foreground focus-visible:ring-ring/50 flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap duration-150 outline-none select-none hover:text-slate-900 focus-visible:ring-[3px] data-[state=on]:shadow-sm sm:flex-none dark:hover:text-slate-200"
        >
          <Icon size={16} />
          {label}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
}
