"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { tagSchema } from "@/lib/validations/post";
import { cn } from "@/lib/utils";

type TagsInputProps = {
  value: string[];
  onChange: (tags: string[]) => void;
  error?: string;
};

export function TagsInput({ value, onChange, error }: TagsInputProps) {
  const [draft, setDraft] = useState("");
  const [draftError, setDraftError] = useState<string | null>(null);

  const commitDraft = () => {
    const tag = draft.trim();
    if (!tag) return;

    const result = tagSchema.safeParse(tag);
    if (!result.success) {
      setDraftError(result.error.issues[0]?.message ?? "Invalid tag.");
      return;
    }

    if (
      value.some((existing) => existing.toLowerCase() === tag.toLowerCase())
    ) {
      setDraftError("This tag has already been added.");
      return;
    }

    onChange([...value, tag]);
    setDraft("");
    setDraftError(null);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      commitDraft();
      return;
    }

    if (event.key === "Backspace" && draft.length === 0 && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((existing) => existing !== tag));
  };

  return (
    <div className="flex flex-col gap-1">
      <div
        className={cn(
          "font-roboto flex min-h-10 w-full flex-wrap items-center gap-1.5 rounded-md border bg-gray-100 px-2 py-1.5 text-sm dark:bg-gray-950",
          (error || draftError) && "border-destructive",
        )}
      >
        {value.map((tag) => (
          <span
            key={tag}
            className="bg-indigo-zero/15 text-indigo-zero flex items-center gap-1 rounded-full px-2.5 py-1 text-xs"
          >
            #{tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              aria-label={`Remove tag ${tag}`}
              className="hover:text-indigo-950 dark:hover:text-indigo-50"
            >
              <X size={12} />
            </button>
          </span>
        ))}

        <input
          type="text"
          value={draft}
          onChange={(event) => {
            setDraft(event.target.value.replace(/[[\]",]/g, ""));
            setDraftError(null);
          }}
          onKeyDown={handleKeyDown}
          onBlur={commitDraft}
          placeholder={value.length === 0 ? "Add a tag and press Enter" : ""}
          maxLength={50}
          className="min-w-32 flex-1 bg-transparent py-1 outline-none"
        />
      </div>
      {(error || draftError) && (
        <p className="text-destructive text-xs">{error ?? draftError}</p>
      )}
    </div>
  );
}
