"use client";

import { useEffect, useState } from "react";
import { LayoutGrid, ListFilter, Search, Tag } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/hooks/api/useCategories";
import { cn } from "@/lib/utils";
import type { PostFilterMode } from "@/hooks/api/useFilteredPosts";

const DEBOUNCE_MS = 400;

const MODE_OPTIONS = [
  { value: "all", label: "All Posts", icon: LayoutGrid },
  { value: "search", label: "Search", icon: Search },
  { value: "category", label: "Category", icon: ListFilter },
  { value: "tags", label: "Tags", icon: Tag },
] as const;

type SearchFiltersProps = {
  mode: PostFilterMode;
  term: string;
  categorySlug: string;
  tagsInput: string;
  onModeChange: (mode: PostFilterMode) => void;
  onTermChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onTagsChange: (value: string) => void;
};

export function SearchFilters({
  mode,
  term,
  categorySlug,
  tagsInput,
  onModeChange,
  onTermChange,
  onCategoryChange,
  onTagsChange,
}: SearchFiltersProps) {
  const { data: categories } = useCategories();

  const [termDraft, setTermDraft] = useState(term);
  const [tagsDraft, setTagsDraft] = useState(tagsInput);

  useEffect(() => setTermDraft(term), [term]);
  useEffect(() => setTagsDraft(tagsInput), [tagsInput]);

  useEffect(() => {
    if (mode !== "search") return;
    const handle = setTimeout(() => onTermChange(termDraft), DEBOUNCE_MS);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [termDraft, mode]);

  useEffect(() => {
    if (mode !== "tags") return;
    const handle = setTimeout(() => onTagsChange(tagsDraft), DEBOUNCE_MS);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tagsDraft, mode]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {MODE_OPTIONS.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            type="button"
            onClick={() => onModeChange(value)}
            className={cn(
              "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm duration-150",
              mode === value
                ? "bg-indigo-zero/15 text-indigo-zero border-indigo-zero/30"
                : "text-slate-zero hover:bg-slate-one",
            )}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {mode === "search" && (
        <input
          type="text"
          value={termDraft}
          onChange={(event) => setTermDraft(event.target.value)}
          placeholder="Search posts by title, summary, or content…"
          className="bg-slate-one w-full max-w-md rounded-md border px-3 py-2 text-sm outline-none"
        />
      )}

      {mode === "category" && (
        <Select value={categorySlug} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-full max-w-xs">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories?.map((category) => (
              <SelectItem key={category.id} value={category.slug}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {mode === "tags" && (
        <input
          type="text"
          value={tagsDraft}
          onChange={(event) => setTagsDraft(event.target.value)}
          placeholder="Comma-separated tags, e.g. react, nextjs"
          className="bg-slate-one w-full max-w-md rounded-md border px-3 py-2 text-sm outline-none"
        />
      )}
    </div>
  );
}
