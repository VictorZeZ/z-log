"use client";

import { Dot, Search } from "lucide-react";
import Link from "next/link";
import { Shimmer } from "@shimmer-from-structure/react";

export default function Posts() {
  return (
    <section className="flex w-full flex-col gap-4 xl:w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-quicksand text-3xl font-bold">
            Latest published posts
          </h3>
          <p className="text-slate-zero">
            Filter by topic or author, then keep reading with a calm card-based
            feed.
          </p>
        </div>
        <Link
          href="/search"
          className="bg-slate-two flex items-center gap-2 rounded-full border px-3 py-2 text-sm shadow-md"
        >
          <p>Open search</p>
          <Search />
        </Link>
      </div>
      <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(360px,1fr))] items-center gap-4">
        <Shimmer loading={false}>
          <div className="bg-slate-two flex h-auto flex-col items-start justify-between gap-2 rounded-3xl border p-4 shadow-md">
            <div className="mb-2 flex items-center justify-start gap-2 select-none">
              <p className="bg-indigo-zero/15 text-indigo-zero rounded-full px-2 py-1 text-xs font-semibold tracking-wide uppercase">
                DESIGN SYSTEMS
              </p>
              <span className="text-slate-zero text-xs">5 minutes ago</span>
            </div>
            <div className="flex flex-col items-start gap-4">
              <h1 className="font-space-grotesk text-4xl font-semibold text-slate-900 dark:text-slate-200">
                Designing with tokens first
              </h1>
              <p className="text-slate-zero">
                A practical note on using colors, spacing, and type as the
                source of truth before the layout gets complicated.
              </p>
            </div>
            <div className="mt-4 flex w-full items-center justify-between border-t pt-3">
              <p className="text-sm">Meraj Esmaeili</p>
              <span className="text-gray-zero text-sm">Jun 14, 2026</span>
            </div>
          </div>
        </Shimmer>
        <Shimmer loading={false}>
          <div className="bg-slate-two flex h-auto flex-col items-start justify-between gap-2 rounded-3xl border p-4 shadow-md">
            <div className="mb-2 flex items-center justify-start gap-2 select-none">
              <p className="bg-indigo-zero/15 text-indigo-zero rounded-full px-2 py-1 text-xs font-semibold tracking-wide uppercase">
                Interface
              </p>
              <span className="text-slate-zero text-xs">18 minutes ago</span>
            </div>
            <div className="flex flex-col items-start gap-4">
              <h1 className="font-space-grotesk text-4xl font-semibold text-slate-900 dark:text-slate-200">
                The calm side of dark mode
              </h1>
              <p className="text-slate-zero">
                Dark interfaces work best when contrast is intentional, borders
                are quiet, and accent color is used like punctuation.
              </p>
            </div>
            <div className="mt-4 flex w-full items-center justify-between border-t pt-3">
              <p className="text-sm">Lina Moradi</p>
              <span className="text-gray-zero text-sm">Jun 14, 2026</span>
            </div>
          </div>
        </Shimmer>
        <Shimmer loading={true}>
          <div className="bg-slate-two flex h-auto flex-col items-start justify-between gap-2 rounded-3xl border p-4 shadow-md">
            <div className="mb-2 flex items-center justify-start gap-2 select-none">
              <p className="bg-indigo-zero/15 text-indigo-zero rounded-full px-2 py-1 text-xs font-semibold tracking-wide uppercase">
                Interface
              </p>
              <span className="text-slate-zero text-xs">5 minutes ago</span>
            </div>
            <div className="flex flex-col items-start gap-4">
              <h1 className="font-space-grotesk text-4xl font-semibold text-slate-900 dark:text-slate-200">
                The calm side of dark mode
              </h1>
              <p className="text-slate-zero">
                A practical note on using colors, spacing, and type as the
                source of truth before the layout gets complicated.
              </p>
            </div>
            <div className="mt-4 flex w-full items-center justify-between border-t pt-3">
              <p className="text-sm">Meraj Esmaeili</p>
              <span className="text-gray-zero text-sm">Jun 14, 2026</span>
            </div>
          </div>
        </Shimmer>
      </div>
    </section>
  );
}
