import { Button } from "@/components/ui/button";

type PostDetailsErrorProps = {
  onRetry: () => void;
};

export function PostDetailsError({ onRetry }: PostDetailsErrorProps) {
  return (
    <section className="mt-6 flex w-full max-w-2xl flex-col items-center gap-3 px-4 py-20 text-center sm:mt-22">
      <h1 className="font-space-grotesk text-2xl font-bold">
        Couldn&apos;t load this post
      </h1>
      <p className="text-slate-zero">
        Something went wrong while fetching it. Please try again.
      </p>
      <Button variant="outline" onClick={onRetry}>
        Try again
      </Button>
    </section>
  );
}
