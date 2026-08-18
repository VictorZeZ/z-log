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
          className="bg-slate-two flex items-center gap-2 rounded-full border px-3 py-2 shadow-md"
        >
          <p>Open search</p>
          <Search />
        </Link>
      </div>
      <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-4">
        <Shimmer loading={false}>
          <div className="bg-slate-two flex h-100 w-75 flex-col gap-6 rounded-3xl border p-4 shadow-md">
            <div className="flex items-center justify-start select-none">
              <p className="bg-indigo-zero/10 text-indigo-zero rounded-full border px-3 py-1 text-xs font-bold uppercase">
                Category
              </p>
              <Dot size={30} className="text-gray-zero" />
              <span className="text-slate-zero text-xs">5 minutes ago</span>
            </div>
            <div className="flex flex-col items-start gap-4">
              <h1 className="font-space-grotesk text-3xl font-semibold text-slate-900 dark:text-slate-200">
                Designing with tokens first
              </h1>
              <p className="text-slate-zero">
                A practical note on using colors, spacing, and type as the
                source of truth before the layout gets complicated.
              </p>
            </div>
            <div></div>
          </div>
        </Shimmer>
      </div>
    </section>
  );
}
