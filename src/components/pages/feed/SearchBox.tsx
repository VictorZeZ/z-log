"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eraser, Search } from "lucide-react";

export default function SearchBox() {
  const router = useRouter();
  const [term, setTerm] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmed = term.trim();
    if (!trimmed) return;

    router.push(`/search?mode=search&term=${encodeURIComponent(trimmed)}`);
  };

  const handleClear = () => setTerm("");

  return (
    <section className="bg-slate-two flex w-full flex-col gap-3 rounded-3xl border p-3 shadow-md sm:gap-4 sm:p-4 xl:w-6xl">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-1"
      >
        {/* Desktop search icon */}
        <span className="hidden size-10 shrink-0 items-center justify-center sm:flex">
          <Search />
        </span>

        <div className="relative min-w-0 flex-1">
          {/* Search icon */}
          <span className="text-gray-zero pointer-events-none absolute inset-y-0 inset-s-3 flex items-center sm:hidden">
            <Search size={19} />
          </span>

          <input
            type="text"
            autoComplete="off"
            placeholder="Search posts by title, summary, or content…"
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            className="bg-slate-one h-10 w-full rounded-full border px-3 ps-10 pe-10 duration-150 outline-none md:focus:px-4 sm:rounded-none sm:rounded-s-full sm:ps-3 sm:pe-3"
          />

          {/* Mobile clear button */}
          {term && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear search"
              className="text-gray-zero absolute inset-y-0 inset-e-2 flex size-8 h-full items-center justify-center sm:hidden"
            >
              <Eraser size={18} />
            </button>
          )}
        </div>

        {/* Desktop clear button */}
        <button
          type="button"
          onClick={handleClear}
          disabled={!term}
          aria-label="Clear search"
          className="bg-slate-one hidden size-10 shrink-0 items-center justify-center border disabled:pointer-events-none disabled:opacity-50 sm:flex"
        >
          <Eraser size={20} />
        </button>

        {/* Search button */}
        <button
          type="submit"
          className="bg-slate-one h-10 w-full shrink-0 rounded-full border sm:w-22 sm:rounded-s-none sm:rounded-e-full"
        >
          Search
        </button>
      </form>
    </section>
  );
}
