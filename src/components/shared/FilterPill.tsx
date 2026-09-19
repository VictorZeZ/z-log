import { cn } from "@/lib/utils";

type FilterPillProps = {
  active: boolean;
  color?: string;
  onClick: () => void;
  children: React.ReactNode;
};

export function FilterPill({
  active,
  color,
  onClick,
  children,
}: FilterPillProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm duration-150 outline-none",
        active
          ? "bg-indigo-zero/15 text-indigo-zero border-indigo-zero/30"
          : "text-slate-zero hover:bg-slate-one",
      )}
    >
      {color && (
        <span
          aria-hidden="true"
          className="size-2 rounded-full"
          style={{ backgroundColor: color }}
        />
      )}
      {children}
    </button>
  );
}
