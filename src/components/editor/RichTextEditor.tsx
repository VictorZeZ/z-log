"use client";

import { useMemo, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapLink from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Dropcursor from "@tiptap/extension-dropcursor";
import Gapcursor from "@tiptap/extension-gapcursor";
import CharacterCount from "@tiptap/extension-character-count";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";
import { Table } from "@tiptap/extension-table";
import { ImageNode } from "./extensions/ImageNode";
import { Toolbar } from "./Toolbar";
import { EditorUrlDialog } from "./EditorUrlDialog";
import { cn } from "@/lib/utils";

type RichTextEditorProps = {
  initialContent?: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

type PendingUrlAction = "image" | "link" | null;

export function RichTextEditor({
  initialContent = "",
  onChange,
  placeholder = "Write your post...",
}: RichTextEditorProps) {
  const [pendingUrlAction, setPendingUrlAction] =
    useState<PendingUrlAction>(null);

  const extensions = useMemo(
    () => [
      StarterKit.configure({ heading: { levels: [1, 2, 3, 4] } }),
      TiptapLink.configure({
        protocols: ["http", "https"],
        openOnClick: false,
        HTMLAttributes: { rel: "noopener noreferrer nofollow" },
      }),
      Underline,
      Placeholder.configure({ placeholder }),
      Dropcursor,
      Gapcursor,
      CharacterCount,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      ImageNode,
    ],
    [placeholder],
  );

  const editor = useEditor({
    extensions,
    content: initialContent,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: cn("post-content min-h-80 max-w-none focus:outline-none"),
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  if (!editor) return null;

  const handleUrlSubmit = (url: string, alt: string) => {
    if (pendingUrlAction === "image") {
      editor
        .chain()
        .focus()
        .setImage({ src: url, alt: alt || undefined })
        .run();
    } else if (pendingUrlAction === "link") {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
    setPendingUrlAction(null);
  };

  return (
    <div className="bg-slate-two flex flex-col gap-3 rounded-3xl border p-3 shadow-md sm:p-4">
      <Toolbar
        editor={editor}
        onRequestImage={() => setPendingUrlAction("image")}
        onRequestLink={() => setPendingUrlAction("link")}
      />

      <EditorContent editor={editor} />

      <EditorUrlDialog
        open={pendingUrlAction !== null}
        onOpenChange={(open) => !open && setPendingUrlAction(null)}
        title={pendingUrlAction === "image" ? "Insert image" : "Add link"}
        description={
          pendingUrlAction === "image"
            ? "Paste the URL of an already-hosted image."
            : "Paste the URL this link should point to."
        }
        showAltField={pendingUrlAction === "image"}
        onSubmit={handleUrlSubmit}
      />
    </div>
  );
}
