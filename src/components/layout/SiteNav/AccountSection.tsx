"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { TbLogout, TbSettings, TbUser } from "react-icons/tb";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SheetClose } from "@/components/ui/sheet";
import { useAppDispatch } from "@/lib/store/hooks";
import { clearUser } from "@/lib/store/userSlice";
import { useLogout } from "@/hooks/api/useLogout";
import { currentUserQueryKey } from "@/hooks/api/useCurrentUser";
import { handleApiError } from "@/lib/api/errorHandler";
import { NavItem } from "./NavItem";

export function AccountSection() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { mutate: logoutUser, isPending: isLoggingOut } = useLogout();

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
      { onSuccess: finishLogout, onError: handleApiError },
    );
  };

  return (
    <AccordionItem value="account">
      <AccordionTrigger>Account</AccordionTrigger>
      <AccordionContent className="flex flex-col gap-1">
        <SheetClose asChild>
          <NavItem label="Profile" icon={TbUser} href="/profile" />
        </SheetClose>
        <SheetClose asChild>
          <NavItem label="Settings" icon={TbSettings} disabled />
        </SheetClose>
        <SheetClose asChild>
          <NavItem
            label="Logout"
            icon={TbLogout}
            variant="destructive"
            onClick={handleLogout}
            disabled={isLoggingOut}
          />
        </SheetClose>
      </AccordionContent>
    </AccordionItem>
  );
}
