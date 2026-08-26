import { Eraser, Search } from "lucide-react";

export default function SearchBox() {
  return (
    <section className="bg-slate-two flex w-full flex-col gap-3 rounded-3xl border p-3 shadow-md sm:gap-4 sm:p-4 xl:w-6xl">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-1">
        {/* Search input wrapper */}

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
            placeholder="Search posts, tags, or authors…"
            className="bg-slate-one h-10 w-full rounded-full border px-3 ps-10 pe-10 duration-150 outline-none focus:px-4 sm:rounded-none sm:rounded-s-full sm:ps-3 sm:pe-3"
          />

          {/* Mobile clear button */}
          <button
            type="button"
            aria-label="Clear search"
            className="text-gray-zero h-full absolute inset-y-0 inset-e-2 flex size-8 items-center justify-center sm:hidden"
          >
            <Eraser size={18} />
          </button>
        </div>

        {/* Desktop clear button */}
        <button
          type="button"
          aria-label="Clear search"
          className="bg-slate-one hidden size-10 shrink-0 items-center justify-center border sm:flex"
        >
          <Eraser size={20} />
        </button>

        {/* Search button */}
        <button
          type="button"
          className="bg-slate-one h-10 w-full shrink-0 rounded-full border sm:w-22 sm:rounded-s-none sm:rounded-e-full"
        >
          Search
        </button>
      </div>
    </section>
  );
}
