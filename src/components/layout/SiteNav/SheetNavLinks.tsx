"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { SheetClose } from "@/components/ui/sheet";
import { primaryNavLinks } from "@/lib/navigation";

export function SheetNavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 text-sm font-medium">
      {primaryNavLinks.map((link) => {
        const active = pathname === link.href;

        return (
          <SheetClose asChild key={link.href}>
            <Link
              href={active ? "#" : link.href}
              aria-disabled={active}
              className={clsx(
                "rounded-md px-3 py-2 duration-200 outline-none",
                active
                  ? "text-slate-zero bg-slate-one pointer-events-none"
                  : "text-foreground hover:bg-slate-one opacity-60 hover:opacity-100",
              )}
            >
              {link.title}
            </Link>
          </SheetClose>
        );
      })}
    </nav>
  );
}
