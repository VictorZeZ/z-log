"use client";

import { Search } from "lucide-react";
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
      <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(250px,1fr))] items-center gap-4">
        <Shimmer loading={true}>
          <div className="bg-slate-two h-100 rounded-3xl border p-4 shadow-md"></div>
        </Shimmer>
        <Shimmer loading={true}>
          <div className="bg-slate-two h-100 rounded-3xl border p-4 shadow-md"></div>
        </Shimmer>
        <Shimmer loading={true}>
          <div className="bg-slate-two h-100 rounded-3xl border p-4 shadow-md"></div>
        </Shimmer>
        <Shimmer loading={true}>
          <div className="bg-slate-two h-100 rounded-3xl border p-4 shadow-md"></div>
        </Shimmer>
        <Shimmer loading={true}>
          <div className="bg-slate-two h-100 rounded-3xl border p-4 shadow-md"></div>
        </Shimmer>
        <Shimmer loading={true}>
          <div className="bg-slate-two h-100 rounded-3xl border p-4 shadow-md"></div>
        </Shimmer>
        <Shimmer loading={true}>
          <div className="bg-slate-two h-100 rounded-3xl border p-4 shadow-md"></div>
        </Shimmer>
        <Shimmer loading={true}>
          <div className="bg-slate-two h-100 rounded-3xl border p-4 shadow-md"></div>
        </Shimmer>
        <Shimmer loading={true}>
          <div className="bg-slate-two h-100 rounded-3xl border p-4 shadow-md"></div>
        </Shimmer>
      </div>
    </section>
  );
}
