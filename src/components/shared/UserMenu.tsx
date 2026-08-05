"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { clearUser } from "@/lib/store/userSlice";
import { useLogout } from "@/hooks/api/useLogout";
import { currentUserQueryKey } from "@/hooks/api/useCurrentUser";
import { handleApiError } from "@/lib/api/errorHandler";
import { TbChevronDown, TbLogout, TbSettings, TbUser } from "react-icons/tb";
import { Shimmer } from "@shimmer-from-structure/react";

export function UserMenu() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user.data);
  const isLoading = useAppSelector((state) => state.user.isLoading);

  const { mutate: logoutUser, isPending: isLoggingOut } = useLogout();

  const buttonClass =
    "flex cursor-pointer items-center justify-between my-1 gap-2 text-indigo-950 dark:text-indigo-50 hover:bg-black/20! dark:hover:bg-white/20! duration-100";

  const finishLogout = () => {
    dispatch(clearUser());
    queryClient.removeQueries({ queryKey: currentUserQueryKey });
    router.push("/login");
  };

  const handleLogout = () => {
    const refreshToken = Cookies.get("refreshToken");

    if (!refreshToken) {
      finishLogout();
      return;
    }

    logoutUser(
      { refreshToken },
      {
        onSuccess: finishLogout,
        onError: handleApiError,
      },
    );
  };

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

        <DropdownMenuItem
          className={buttonClass}
          disabled={isLoggingOut}
          onClick={handleLogout}
        >
          Logout
          <TbLogout className="text-indigo-500" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
