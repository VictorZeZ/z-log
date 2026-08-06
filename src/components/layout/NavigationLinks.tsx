"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { primaryNavLinks } from "@/lib/navigation";

function Navigation() {
  const pathname = usePathname();

  return (
    <div className="flex h-full items-center gap-6 text-sm font-medium">
      {primaryNavLinks.map((link) => {
        const active = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={active ? "#" : link.href}
            aria-disabled={active}
            tabIndex={-1}
            className={clsx(
              "duration-200 outline-none",
              active && "text-indigo-zero pointer-events-none",
              !active && "text-foreground opacity-60",
            )}
          >
            {link.title}
          </Link>
        );
      })}
    </div>
  );
}

export default Navigation;
