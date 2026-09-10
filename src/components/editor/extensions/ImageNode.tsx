"use client";

import Image from "@tiptap/extension-image";
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import type { NodeViewProps } from "@tiptap/react";
import { Move, X } from "lucide-react";
import { cn } from "@/lib/utils";

function ImageNodeView({ node, deleteNode, selected }: NodeViewProps) {
  return (
    <NodeViewWrapper
      as="span"
      data-drag-handle
      className={cn(
        "group relative inline-block align-top",
        selected && "ring-indigo-zero rounded-xl ring-2",
      )}
    >
      <img
        src={node.attrs.src}
        alt={node.attrs.alt ?? ""}
        draggable={false}
        className="my-2 max-w-full cursor-grab rounded-xl border"
      />

      <span className="pointer-events-none absolute top-3 left-3 flex items-center gap-1 rounded-md bg-black/60 p-1.5 text-white opacity-0 duration-150 group-hover:opacity-100">
        <Move size={14} />
      </span>

      <button
        type="button"
        onClick={() => deleteNode()}
        aria-label="Remove image"
        className="absolute top-3 right-3 flex size-6 items-center justify-center rounded-md bg-black/60 text-white opacity-0 duration-150 group-hover:opacity-100"
      >
        <X size={14} />
      </button>
    </NodeViewWrapper>
  );
}

// URL-only image node: no upload command is exposed anywhere, and `src` is
// rejected on parse unless it's an http(s) URL - this blocks pasted
// data:/javascript: URIs at the schema level, not just in our own dialog.
export const ImageNode = Image.extend({
  draggable: true,
  addAttributes() {
    return {
      ...this.parent?.(),
      src: {
        default: null,
        parseHTML: (element: HTMLElement) => {
          const src = element.getAttribute("src");
          return src && /^https?:\/\//i.test(src) ? src : null;
        },
      },
    };
  },
  addNodeView() {
    return ReactNodeViewRenderer(ImageNodeView);
  },
});
