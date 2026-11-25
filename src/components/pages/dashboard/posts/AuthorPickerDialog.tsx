"use client";

import { useCallback, useState } from "react";
import { Shimmer } from "@shimmer-from-structure/react";
import { DashboardSearchInput } from "@/components/pages/dashboard/shared/DashboardSearchInput";
import { SearchPagination } from "@/components/pages/search/SearchPagination";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSearchUsers } from "@/hooks/api/useSearchUsers";
import { getErrorMessage } from "@/lib/api/errorMessages";
import { MAX_USER_TERM_LENGTH } from "@/lib/validations/user";
import { cn } from "@/lib/utils";
import { userLevelLabels } from "@/types/api/account";
import { ApiError } from "@/types/api/common";

const PAGE_SIZE = 8;
const SKELETON_COUNT = 4;

const buildHref = () => "#";

type AuthorPickerProps = {
  onSelect: (userId: string) => void;
};

function AuthorPicker({ onSelect }: AuthorPickerProps) {
  const [term, setTerm] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, isError, error, refetch } =
    useSearchUsers({ term, page, pageSize: PAGE_SIZE });

  const handleTermChange = useCallback((value: string) => {
    setTerm(value);
    setPage(1);
  }, []);

  const renderResults = () => {
    if (term === "") {
      return (
        <p className="text-slate-zero py-10 text-center text-sm">
          Type a name or email to find an author.
        </p>
      );
    }

    if (isLoading) {
      return (
        <Shimmer loading>
          <div className="flex flex-col gap-2">
            {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
              <div key={index} className="bg-muted h-12 w-full rounded-xl" />
            ))}
          </div>
        </Shimmer>
      );
    }

    if (isError || !data) {
      return (
        <div className="flex flex-col items-center gap-3 py-10 text-center">
          <p className="text-slate-zero text-sm">
            {error instanceof ApiError
              ? getErrorMessage(error)
              : "Couldn't search users."}
          </p>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Try again
          </Button>
        </div>
      );
    }

    if (data.items.length === 0) {
      return (
        <p className="text-slate-zero py-10 text-center text-sm wrap-break-word">
          No users match &quot;{term}&quot;.
        </p>
      );
    }

    return (
      <div className="flex flex-col gap-3">
        <ul
          aria-busy={isFetching}
          className={cn(
            "flex flex-col gap-1 duration-200",
            isFetching && "opacity-60",
          )}
        >
          {data.items.map((user) => (
            <li key={user.id}>
              <button
                type="button"
                onClick={() => onSelect(user.id)}
                className="hover:bg-slate-one flex w-full items-center gap-3 rounded-xl px-3 py-2 text-start duration-150"
              >
                <span className="bg-indigo-zero/15 text-indigo-zero flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-bold">
                  {user.fullName.charAt(0).toUpperCase()}
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-sm font-medium">
                    {user.fullName}
                  </span>
                  {user.email && (
                    <span className="text-slate-zero truncate text-xs">
                      {user.email}
                    </span>
                  )}
                </span>
                <span className="text-slate-zero text-xs">
                  {userLevelLabels[user.level]}
                </span>
              </button>
            </li>
          ))}
        </ul>

        {data.totalPages > 1 && (
          <SearchPagination
            page={data.page}
            totalPages={data.totalPages}
            hasPreviousPage={data.hasPreviousPage}
            hasNextPage={data.hasNextPage}
            buildHref={buildHref}
            onPageChange={setPage}
          />
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <DashboardSearchInput
        term={term}
        onTermChange={handleTermChange}
        maxLength={MAX_USER_TERM_LENGTH}
        placeholder="Search by name or email…"
        ariaLabel="Search users"
      />
      {renderResults()}
    </div>
  );
}

type AuthorPickerDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (userId: string) => void;
};

export function AuthorPickerDialog({
  open,
  onOpenChange,
  onSelect,
}: AuthorPickerDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Choose author</DialogTitle>
          <DialogDescription>
            Show only the posts written by one user.
          </DialogDescription>
        </DialogHeader>

        <AuthorPicker
          onSelect={(userId) => {
            onSelect(userId);
            onOpenChange(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
