"use client";

import { useEffect, useRef } from "react";

type PostContentProps = {
  html: string;
};

export function PostContent({ html }: PostContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    container.querySelectorAll("pre").forEach((pre) => {
      if (pre.querySelector(".post-copy-button")) return;

      const button = document.createElement("button");
      button.type = "button";
      button.className = "post-copy-button";
      button.textContent = "Copy";

      button.addEventListener("click", async () => {
        const code =
          pre.querySelector("code")?.textContent ?? pre.textContent ?? "";
        try {
          await navigator.clipboard.writeText(code);
          button.textContent = "Copied";
          button.dataset.copied = "true";
        } catch {
          button.textContent = "Couldn't copy";
        }
        setTimeout(() => {
          button.textContent = "Copy";
          delete button.dataset.copied;
        }, 2000);
      });

      pre.appendChild(button);
    });
  }, [html]);

  return (
    <div
      ref={contentRef}
      className="post-content text-slate-zero max-w-none leading-relaxed"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
