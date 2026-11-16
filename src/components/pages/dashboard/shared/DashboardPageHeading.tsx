type DashboardPageHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
};

export function DashboardPageHeading({
  eyebrow,
  title,
  description,
  children,
}: DashboardPageHeadingProps) {
  return (
    <section className="flex w-full flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-slate-zero mb-2 text-xs font-bold tracking-widest uppercase">
          {eyebrow}
        </p>
        <h1 className="font-space-grotesk text-4xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="text-slate-zero mt-2 max-w-2xl text-sm sm:text-base">
          {description}
        </p>
      </div>

      {children && (
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center md:w-auto">
          {children}
        </div>
      )}
    </section>
  );
}
