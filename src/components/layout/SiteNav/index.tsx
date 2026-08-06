"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { TbMenu2 } from "react-icons/tb";
import { Shimmer } from "@shimmer-from-structure/react";
import { Accordion } from "@/components/ui/accordion";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAppSelector } from "@/lib/store/hooks";
import { UserLevel } from "@/types/api/account";
import { SheetNavLinks } from "./SheetNavLinks";
import { AccountSection } from "./AccountSection";
import { DashboardSection } from "./DashboardSection";
import { PostsSection } from "./PostsSection";
import { ThemeSection } from "./ThemeSection";

export function SiteNav() {
  const user = useAppSelector((state) => state.user.data);
  const isLoading = useAppSelector((state) => state.user.isLoading);

  const canAccessDashboard = (user?.level ?? -1) >= UserLevel.Admin;
  const canAccessPosts = (user?.level ?? -1) >= UserLevel.Author;

  return (
    <div className="flex items-center gap-2">
      {!user && (
        <Shimmer loading={isLoading}>
          <Link
            href="/login"
            className="bg-slate-one flex h-8 w-24 items-center justify-center gap-1.5 rounded-md border text-sm outline-none"
          >
            <p>Login</p>
            <User size={17} className="text-indigo-zero" />
          </Link>
        </Shimmer>
      )}

      <Sheet>
        <SheetTrigger asChild>
          <button
            className="flex size-9 items-center justify-center rounded-md border outline-none"
            aria-label="Open navigation menu"
          >
            <TbMenu2 size={20} />
          </button>
        </SheetTrigger>

        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Z LOG</SheetTitle>
            <SheetDescription>
              {user ? (
                `Welcome back, ${user.fullName}!`
              ) : (
                <>
                  <SheetClose asChild>
                    <Link
                      href="/login"
                      className="text-primary font-medium hover:underline"
                    >
                      Login
                    </Link>
                  </SheetClose>{" "}
                  to access more features...
                </>
              )}
            </SheetDescription>
          </SheetHeader>

          <div className="flex flex-col gap-4 overflow-y-auto px-6 pb-6">
            <SheetNavLinks />

            <div className="bg-border/50 -mx-1 h-px" />

            <Accordion type="multiple">
              {user && <AccountSection />}
              {canAccessDashboard && <DashboardSection />}
              {canAccessPosts && <PostsSection />}
              <ThemeSection />
            </Accordion>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
