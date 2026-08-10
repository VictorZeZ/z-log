import { Eraser, Search } from "lucide-react";

export default function SearchBox() {
  return (
    <section className="bg-slate-two flex w-full flex-col gap-4 rounded-xl border p-4 xl:w-6xl">
      <div className="flex items-stretch gap-1 rounded-md">
        <span className="flex size-10 shrink-0 items-center justify-center">
          <Search />
        </span>
        <input
          type="text"
          autoComplete="off"
          placeholder="Search posts, tags, or authors…"
          className="bg-slate-one duration-150 focus:px-4 h-10 w-full rounded-s-xl border px-3 outline-none"
        />
        <button
          type="button"
          className="bg-slate-one flex size-10 shrink-0 items-center justify-center border"
        >
          <Eraser size={20} />
        </button>
        <button
          type="button"
          className="bg-slate-one h-10 w-22 shrink-0 rounded-e-xl border"
        >
          Search
        </button>
      </div>
    </section>
  );
}
