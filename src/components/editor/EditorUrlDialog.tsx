"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type EditorUrlDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  showAltField?: boolean;
  onSubmit: (url: string, alt: string) => void;
};

const inputClassName =
  "font-roboto w-full rounded-md border bg-gray-100 px-3 py-2 text-sm outline-none dark:bg-gray-950";

function isValidHttpUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function EditorUrlDialog({
  open,
  onOpenChange,
  title,
  description,
  showAltField = false,
  onSubmit,
}: EditorUrlDialogProps) {
  const [url, setUrl] = useState("");
  const [alt, setAlt] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setUrl("");
      setAlt("");
      setError(null);
    }
  }, [open]);

  const handleSubmit = () => {
    if (!isValidHttpUrl(url)) {
      setError("Enter a valid http:// or https:// URL.");
      return;
    }

    onSubmit(url, alt);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <input
              autoFocus
              type="url"
              placeholder="https://example.com/image.jpg"
              value={url}
              onChange={(event) => {
                setUrl(event.target.value);
                setError(null);
              }}
              aria-invalid={Boolean(error)}
              className={inputClassName}
            />
            {error && <p className="text-destructive text-xs">{error}</p>}
          </div>

          {showAltField && (
            <input
              type="text"
              placeholder="Alt text (optional)"
              value={alt}
              onChange={(event) => setAlt(event.target.value)}
              className={inputClassName}
            />
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Insert</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
