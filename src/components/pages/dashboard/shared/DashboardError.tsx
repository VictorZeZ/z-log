import { Button } from "@/components/ui/button";

type DashboardErrorProps = {
  title?: string;
  onRetry: () => void;
};

export function DashboardError({
  title = "Couldn't load your dashboard",
  onRetry,
}: DashboardErrorProps) {
  return (
    <section className="mx-auto flex w-full max-w-2xl flex-col items-center gap-3 py-20 text-center">
      <h1 className="font-space-grotesk text-2xl font-bold">{title}</h1>
      <p className="text-slate-zero">
        Something went wrong while fetching it. Please try again.
      </p>
      <Button variant="outline" onClick={onRetry}>
        Try again
      </Button>
    </section>
  );
}
