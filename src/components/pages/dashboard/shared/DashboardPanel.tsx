import { cn } from "@/lib/utils";

type DashboardPanelProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

export function DashboardPanel({
  title,
  description,
  action,
  className,
  children,
}: DashboardPanelProps) {
  return (
    <section
      className={cn(
        "bg-slate-two flex min-w-0 flex-col gap-5 rounded-3xl border p-5 shadow-md",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-space-grotesk text-xl font-bold">{title}</h2>
          {description && (
            <p className="text-slate-zero mt-1 text-sm">{description}</p>
          )}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
