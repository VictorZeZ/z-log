"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppSelector } from "@/lib/store/hooks";
import { TbChevronDown, TbLogout, TbSettings, TbUser } from "react-icons/tb";
import { Shimmer } from "@shimmer-from-structure/react";

export function UserMenu() {
  const user = useAppSelector((state) => state.user.data);
  const isLoading = useAppSelector((state) => state.user.isLoading);

  const buttonClass =
    "flex cursor-pointer items-center justify-between my-1 gap-2 text-indigo-950 dark:text-indigo-50 hover:bg-black/20! dark:hover:bg-white/20! duration-100";

  return (
    <DropdownMenu>
      <Shimmer loading={isLoading}>
        <DropdownMenuTrigger asChild>
          <button className="group flex items-center gap-2 rounded-md border px-3 py-1 text-sm outline-none">
            <TbUser className="text-indigo-500" />
            {user?.fullName ?? "Guest"}
            <TbChevronDown className="text-indigo-500 transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </button>
        </DropdownMenuTrigger>
      </Shimmer>

      <DropdownMenuContent className="w-44" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem className={buttonClass}>
            Profile
            <TbUser className="text-indigo-500" />
          </DropdownMenuItem>

          <DropdownMenuItem className={buttonClass}>
            Settings
            <TbSettings className="text-indigo-500" />
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem className={buttonClass}>
          Logout
          <TbLogout className="text-indigo-500" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
