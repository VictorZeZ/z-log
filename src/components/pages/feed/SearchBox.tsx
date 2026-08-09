import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

export default function SearchBox() {
  return (
    <section className="bg-slate-two flex w-full flex-col gap-4 rounded-xl border p-4 xl:w-6xl">
      <div className="flex items-stretch gap-0.5 rounded-md">
        <span className="flex size-10 shrink-0 items-center justify-center">
          <Search />
        </span>
        <input
          type="text"
          autoComplete="off"
          placeholder="Search posts, tags, or authors…"
          className="bg-slate-one h-10 w-full rounded-s-xl border px-3 outline-none"
        />
        <button
          type="button"
          className="bg-slate-one h-10 w-22 shrink-0 rounded-e-xl border"
        >
          Search
        </button>
      </div>
      <div className="flex items-center gap-4">
        <Select>
          <SelectTrigger className="w-46">
            <SelectValue placeholder="Newest" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Newest">Newest</SelectItem>
              <SelectItem value="Oldest">Oldest</SelectItem>
              <SelectItem value="MostViewed">MostViewed</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </section>
  );
}
