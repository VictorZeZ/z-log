"use client";

import { Shimmer } from "@shimmer-from-structure/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/hooks/useTheme";
import { useEffect, useState } from "react";
import { TbMoon, TbSun, TbSunMoon } from "react-icons/tb";
export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, isReady, setThemeSystem, setThemeLight, setThemeDark } =
    useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const icon =
    theme === "system" ? (
      <TbSunMoon />
    ) : theme === "light" ? (
      <TbSun />
    ) : (
      <TbMoon />
    );

  const buttonClass =
    "flex cursor-pointer items-center justify-between delay-0 my-1 gap-1 text-indigo-950 dark:text-indigo-50 hover:bg-black/20! dark:hover:bg-white/20! duration-100";

  if (!mounted) {
    return (
      <Shimmer loading={true}>
        <button className="flex items-center gap-1 rounded-md border px-4 py-1 text-sm outline-none">
          Theme
          <span aria-hidden="true">{icon}</span>
        </button>
      </Shimmer>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1 rounded-md border px-4 py-1 text-sm outline-none">
          Theme
          <span aria-hidden="true">{icon}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => setThemeLight()}
            disabled={theme === "light"}
            className={`${theme === "light" ? "border-indigo-800 bg-indigo-800/30" : ""} ${buttonClass}`}
          >
            Light
            <span aria-hidden="true">
              <TbSun className="text-indigo-500" />
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setThemeDark()}
            disabled={theme === "dark"}
            className={`${theme === "dark" ? "border-indigo-800 bg-indigo-800/30" : ""} ${buttonClass}`}
          >
            Dark
            <span aria-hidden="true">
              <TbMoon className="text-indigo-500" />
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => setThemeSystem()}
          disabled={theme === "system"}
          className={`${theme === "system" ? "border-indigo-800 bg-indigo-800/30" : ""} ${buttonClass}`}
        >
          System
          <span aria-hidden="true">
            <TbSunMoon className="text-indigo-500" />
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
