import Link from "next/link";
import type { IconType } from "react-icons";
import { cn } from "@/lib/utils";

type NavItemProps = {
  label: string;
  icon: IconType;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "default" | "destructive";
};

export function NavItem({
  label,
  icon: Icon,
  href,
  onClick,
  disabled,
  variant = "default",
}: NavItemProps) {
  const className = cn(
    "flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm outline-hidden select-none [&_svg]:size-4 [&_svg]:shrink-0",
    variant === "destructive"
      ? "text-destructive hover:bg-destructive/10 dark:hover:bg-destructive/20"
      : "hover:bg-accent hover:text-accent-foreground",
    disabled && "pointer-events-none opacity-50",
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
        className={className}
      >
        <Icon />
        {label}
      </Link>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={className}
    >
      <Icon />
      {label}
    </button>
  );
}
