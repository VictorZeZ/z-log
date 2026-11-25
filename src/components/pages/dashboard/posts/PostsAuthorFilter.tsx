"use client";

import { useState } from "react";
import { Check, ChevronDown, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserDetails } from "@/hooks/api/useUserDetails";
import { AuthorPickerDialog } from "./AuthorPickerDialog";

type PostsAuthorFilterProps = {
  // Empty string means every author.
  authorId: string;
  viewerId: string;
  onChange: (authorId: string) => void;
};

export function PostsAuthorFilter({
  authorId,
  viewerId,
  onChange,
}: PostsAuthorFilterProps) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const isOtherAuthor = authorId !== "" && authorId !== viewerId;
  const { data: author, isError } = useUserDetails(authorId, isOtherAuthor);

  const label = (() => {
    if (authorId === "") return "All authors";
    if (authorId === viewerId) return "My posts";
    if (author) return author.fullName;
    return isError ? "Unknown author" : "Loading…";
  })();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="h-9 w-full justify-between sm:w-44"
            aria-label="Filter by author"
          >
            <span className="flex min-w-0 items-center gap-1.5">
              <User className="text-slate-zero" />
              <span className="truncate">{label}</span>
            </span>
            <ChevronDown className="text-slate-zero" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => onChange("")}>
            All authors
            {authorId === "" && <Check className="ms-auto" />}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onChange(viewerId)}>
            My posts
            {authorId === viewerId && <Check className="ms-auto" />}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsPickerOpen(true)}>
            Choose author…
            {isOtherAuthor && <Check className="ms-auto" />}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AuthorPickerDialog
        open={isPickerOpen}
        onOpenChange={setIsPickerOpen}
        onSelect={onChange}
      />
    </>
  );
}
