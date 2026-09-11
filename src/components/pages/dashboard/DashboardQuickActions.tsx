import Link from "next/link";
import { ChevronRight, PenLine, Plus, Users } from "lucide-react";

const ACTIONS = [
  {
    key: "create",
    label: "Create a post",
    description: "Start writing something new",
    icon: Plus,
    href: "/posts/create",
  },
  {
    key: "drafts",
    label: "Manage drafts",
    description: "Continue unfinished posts",
    icon: PenLine,
    href: null,
  },
  {
    key: "profile",
    label: "Edit profile",
    description: "Keep your author page current",
    icon: Users,
    href: "/profile",
  },
] as const;

export function DashboardQuickActions() {
  return (
    <div className="bg-slate-two rounded-3xl border p-5 shadow-md sm:p-6">
      <div className="mb-5">
        <h2 className="font-space-grotesk text-xl font-bold">Quick actions</h2>
      </div>

      <div className="flex flex-col gap-3">
        {ACTIONS.map(({ key, label, description, icon: Icon, href }) => {
          const content = (
            <>
              <span className="flex items-center gap-3">
                <span className="bg-indigo-zero/10 text-indigo-zero flex size-9 items-center justify-center rounded-xl">
                  <Icon size={18} />
                </span>
                <span>
                  <span className="block text-sm font-semibold">{label}</span>
                  <span className="text-slate-zero block text-xs">
                    {description}
                  </span>
                </span>
              </span>
              <ChevronRight
                size={17}
                className="text-slate-zero transition group-hover:translate-x-1"
              />
            </>
          );

          if (href) {
            return (
              <Link
                key={key}
                href={href}
                className="group flex items-center justify-between rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md"
              >
                {content}
              </Link>
            );
          }

          return (
            <button
              key={key}
              type="button"
              disabled
              title="Coming soon"
              className="group flex items-center justify-between rounded-2xl border p-4 text-left transition disabled:pointer-events-none disabled:opacity-50"
            >
              {content}
            </button>
          );
        })}
      </div>
    </div>
  );
}
