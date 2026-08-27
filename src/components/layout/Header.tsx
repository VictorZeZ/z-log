"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { SiteNav } from "./SiteNav";
import NavigationLinks from "./NavigationLinks";

function Header() {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious();

    if (!previous) return;

    const difference = current - previous;

    if (difference > 5 && current > 80) {
      setHidden(true);
    }

    if (difference < -5) {
      setHidden(false);
    }
  });

  return (
    <header className="h-14 w-full">
      <motion.div
        animate={{
          y: hidden ? "-100%" : "0%",
        }}
        transition={{
          duration: 0.25,
          ease: "easeInOut",
        }}
        className="bg-slate-two fixed inset-x-0 top-0 z-20 border-b"
      >
        <div className="max-w-8xl mx-auto flex h-14 w-full items-center justify-between gap-2 px-4 sm:px-8">
          <div className="flex h-full shrink-0 items-center justify-start font-bold md:w-50">
            <Link
              href="/"
              className="flex items-center gap-2 text-[1.4rem]"
              tabIndex={-1}
            >
              <Image
                src="/logo/logo.png"
                alt="Vetowo Logo"
                width={32}
                height={32}
                className="h-auto w-auto object-cover"
                priority
              />
              Z LOG
            </Link>
          </div>
          <div className="hidden h-full w-full items-center justify-center md:flex">
            <NavigationLinks />
          </div>
          <div className="flex h-full shrink-0 items-center justify-end md:w-50">
            <SiteNav />
          </div>
        </div>
      </motion.div>
    </header>
  );
}

export default Header;
