"use client";

import { Eye, Pencil, Save, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type PostActionsBarProps = {
  viewMode: "edit" | "view";
  onToggleView: () => void;
  onPreview: () => void;
  onCancel: () => void;
  onSaveDraft: () => void;
  onPublish: () => void;
  isSavingDraft: boolean;
  isPublishing: boolean;
};

export function PostActionsBar({
  viewMode,
  onToggleView,
  onPreview,
  onCancel,
  onSaveDraft,
  onPublish,
  isSavingDraft,
  isPublishing,
}: PostActionsBarProps) {
  const isBusy = isSavingDraft || isPublishing;

  return (
    <div className="bg-slate-two sticky bottom-2 z-10 flex w-full flex-wrap rounded-2xl items-center justify-between gap-3 border p-4 shadow-md">
      <Button
        type="button"
        variant="outline"
        onClick={onToggleView}
        disabled={isBusy}
      >
        {viewMode === "edit" ? <Eye size={16} /> : <Pencil size={16} />}
        {viewMode === "edit" ? "View" : "Edit"}
      </Button>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          onClick={onPreview}
          disabled={isBusy}
        >
          Feed preview
        </Button>
        <Button
          type="button"
          variant="destructive"
          onClick={onCancel}
          disabled={isBusy}
        >
          <X size={16} />
          Cancel
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onSaveDraft}
          disabled={isBusy}
        >
          <Save size={16} />
          {isSavingDraft ? "Saving…" : "Save as draft"}
        </Button>
        <Button type="button" onClick={onPublish} disabled={isBusy}>
          <Send size={16} />
          {isPublishing ? "Publishing…" : "Publish"}
        </Button>
      </div>
    </div>
  );
}
