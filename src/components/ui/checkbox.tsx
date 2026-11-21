"use client";

import * as React from "react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tick02Icon } from "@hugeicons/core-free-icons";

import { cn } from "@/lib/utils";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer border-slate-zero/50 flex size-4.5 shrink-0 items-center justify-center rounded-md border bg-gray-100 text-white shadow-sm transition-all duration-150 outline-none dark:bg-gray-950",
        "hover:border-indigo-zero active:scale-90",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "data-[state=checked]:border-indigo-zero data-[state=checked]:bg-indigo-zero",
        "disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        forceMount
        className="scale-0 opacity-0 transition-all duration-150 data-[state=checked]:scale-100 data-[state=checked]:opacity-100 motion-reduce:transition-none"
      >
        <HugeiconsIcon icon={Tick02Icon} strokeWidth={3} className="size-3" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
