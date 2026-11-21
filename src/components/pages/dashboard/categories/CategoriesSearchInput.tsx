"use client";

import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { MAX_CATEGORY_TERM_LENGTH } from "@/lib/validations/category";

const DEBOUNCE_MS = 400;

type CategoriesSearchInputProps = {
  // The committed (trimmed) term, owned by the URL.
  term: string;
  onTermChange: (term: string) => void;
};

export function CategoriesSearchInput({
  term,
  onTermChange,
}: CategoriesSearchInputProps) {
  const [draft, setDraft] = useState(term);

  // Follows external changes (back navigation) without overwriting what the
  // user is typing, e.g. a trailing space that trimming removed.
  useEffect(() => {
    setDraft((current) => (current.trim() === term ? current : term));
  }, [term]);

  useEffect(() => {
    const trimmed = draft.trim();
    if (trimmed === term) return;

    const handle = setTimeout(() => onTermChange(trimmed), DEBOUNCE_MS);
    return () => clearTimeout(handle);
  }, [draft, term, onTermChange]);

  const handleClear = () => {
    setDraft("");
    onTermChange("");
  };

  return (
    <div className="relative w-full sm:max-w-md">
      <span className="text-gray-zero pointer-events-none absolute inset-y-0 inset-s-3 flex items-center">
        <Search size={16} />
      </span>

      <input
        type="text"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        maxLength={MAX_CATEGORY_TERM_LENGTH}
        autoComplete="off"
        placeholder="Search categories by name…"
        aria-label="Search categories"
        className="bg-slate-one h-9 w-full rounded-md border ps-9 pe-9 text-sm outline-none"
      />

      {draft && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="text-gray-zero hover:text-foreground absolute inset-y-0 inset-e-2 flex items-center duration-150"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
