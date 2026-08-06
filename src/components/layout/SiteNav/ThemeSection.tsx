"use client";

import { useEffect, useState } from "react";
import { Shimmer } from "@shimmer-from-structure/react";
import { TbMoon, TbSun, TbSunMoon } from "react-icons/tb";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

const THEME_OPTIONS = [
  { value: "light", label: "Light", icon: TbSun },
  { value: "dark", label: "Dark", icon: TbMoon },
  { value: "system", label: "System", icon: TbSunMoon },
] as const;

export function ThemeSection() {
  const [mounted, setMounted] = useState(false);
  const { theme, setThemeLight, setThemeDark, setThemeSystem } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const setters = {
    light: setThemeLight,
    dark: setThemeDark,
    system: setThemeSystem,
  } as const;

  return (
    <AccordionItem value="theme">
      <AccordionTrigger>Theme</AccordionTrigger>
      <AccordionContent>
        <Shimmer loading={!mounted}>
          <div className="flex flex-col gap-1">
            {THEME_OPTIONS.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                type="button"
                disabled={mounted && theme === value}
                onClick={() => setters[value]()}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm duration-100",
                  mounted && theme === value
                    ? "border-indigo-800 bg-indigo-800/30"
                    : "hover:bg-black/20! dark:hover:bg-white/20!",
                )}
              >
                <Icon className="size-4 text-indigo-500" />
                {label}
              </button>
            ))}
          </div>
        </Shimmer>
      </AccordionContent>
    </AccordionItem>
  );
}
