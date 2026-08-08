import { Sparkles } from "lucide-react";

export default function Head() {
  return (
    <section className="mt-6 flex w-full shrink-0 flex-col items-start justify-start gap-6 px-4 sm:mt-22 xl:w-6xl xl:px-0">
      <div className="bg-indigo-zero/20 text-indigo-zero flex items-center gap-2 rounded-full border-2 px-3 py-1 shadow-lg select-none">
        <Sparkles size={18} />
        <p className="text-xs font-bold tracking-wide uppercase">
          Developer publishing, without the noise
        </p>
      </div>
      <div className="flex flex-col gap-6">
        <h1 className="text-6xl leading-15 font-extrabold tracking-tight text-slate-900 sm:text-[72px] sm:leading-18 dark:text-slate-200">
          Read clear notes on <br className="hidden lg:block" /> building better
          interfaces.
        </h1>
        <p className="text-slate-zero text-base sm:max-w-160">
          Z LOG is a calm, searchable knowledge base for product engineers,
          designers, and technical founders — structured around posts, tags,
          authors, and fast discovery.
        </p>
      </div>
    </section>
  );
}
