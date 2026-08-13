import { Dot } from "lucide-react";
import Link from "next/link";

function TopPosts() {
  const date = new Date().getUTCMinutes() + " minutes ago";

  return (
    <section className="bg-slate-two relative flex w-full flex-col items-start gap-4 overflow-hidden rounded-3xl border p-4 pl-10 duration-200 hover:-translate-y-1 hover:shadow-2xl xl:w-6xl">
      <p className="text-indigo-zero text-xs font-bold tracking-wider">
        FEATURED
      </p>
      <Link href="#" className="flex flex-col gap-4">
        <h1 className="font-space-grotesk text-5xl font-bold text-slate-900 dark:text-slate-200">
          Designing with tokens first
        </h1>
        <p className="text-slate-zero">
          A practical note on using colors, spacing, and type as the source of
          truth before the layout gets complicated.
        </p>
      </Link>
      <div className="flex items-center gap-4">
        <Link
          href="#"
          className="text-indigo-zero bg-indigo-zero/10 rounded-full border px-4 py-1 text-sm"
        >
          Meraj Esmaeili
        </Link>
        <div className="flex items-center gap-1">
          <span className="text-slate-zero text-sm">Jul 6, 2026</span>
          <Dot />
          <span className="text-slate-zero text-sm">{date}</span>
        </div>
      </div>
      <div className="absolute top-0 bottom-0 left-0 w-2 bg-blue-500"></div>
    </section>
  );
}

export default TopPosts;
