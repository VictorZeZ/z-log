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
import { User } from "lucide-react";
import { Shimmer } from "@shimmer-from-structure/react";
import Link from "next/link";

export function UserMenu() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user.data);
  const isLoading = useAppSelector((state) => state.user.isLoading);

  const { mutate: logoutUser, isPending: isLoggingOut } = useLogout();

  const buttonClass =
    "flex cursor-pointer items-center justify-between my-1 gap-2 text-indigo-950 dark:text-indigo-50 hover:bg-black/20 dark:hover:bg-white/20 duration-100";

  const finishLogout = () => {
    dispatch(clearUser());
    queryClient.removeQueries({ queryKey: currentUserQueryKey });
    router.refresh();
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

  if (!user) {
    return (
      <Shimmer loading={isLoading}>
        <Link
          href="/login"
          className="bg-slate-one flex h-8 w-24 items-center justify-center gap-1.5 rounded-md border text-sm outline-none"
        >
          <p>Login</p>
          <User size={17} className="text-indigo-zero" />
        </Link>
      </Shimmer>
    );
  }

  return (
    <DropdownMenu>
      <Shimmer loading={isLoading}>
        <DropdownMenuTrigger asChild>
          <button className="group flex items-center gap-2 rounded-md border px-3 py-1 text-sm outline-none">
            <TbUser className="text-indigo-500" />
            {user.fullName}
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
          className={
            buttonClass + `hover:bg-red-500/20! dark:hover:bg-red-500/20!``
          }
          disabled={isLoggingOut}
          onClick={handleLogout}
        >
          <p className="text-red-500">Logout</p>
          <TbLogout className="text-red-500" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
