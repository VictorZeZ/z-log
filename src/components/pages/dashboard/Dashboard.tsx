"use client";

import {
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  Eye,
  FilePenLine,
  FileText,
  LayoutDashboard,
  MessageSquareText,
  MoreHorizontal,
  PenLine,
  Plus,
  Settings2,
  ShieldCheck,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const activityData = [
  { day: "Mon", posts: 3 },
  { day: "Tue", posts: 5 },
  { day: "Wed", posts: 4 },
  { day: "Thu", posts: 7 },
  { day: "Fri", posts: 6 },
  { day: "Sat", posts: 8 },
  { day: "Sun", posts: 5 },
];

const recentPosts = [
  {
    title: "Building calmer interfaces",
    status: "Published",
    date: "Sep 5, 2026",
    views: "1,284",
  },
  {
    title: "A practical guide to clean components",
    status: "Pending",
    date: "Sep 4, 2026",
    views: "842",
  },
  {
    title: "What makes a useful design system",
    status: "Draft",
    date: "Sep 2, 2026",
    views: "—",
  },
  {
    title: "Notes from rebuilding my portfolio",
    status: "Published",
    date: "Aug 29, 2026",
    views: "2,031",
  },
];

const statCards = [
  {
    label: "Published posts",
    value: "24",
    detail: "+4 this month",
    icon: FileText,
  },
  {
    label: "Drafts",
    value: "7",
    detail: "3 need attention",
    icon: FilePenLine,
  },
  {
    label: "Total views",
    value: "18.6K",
    detail: "+12.8% this month",
    icon: Eye,
  },
  {
    label: "Pending review",
    value: "3",
    detail: "Awaiting approval",
    icon: CircleAlert,
  },
];

function Status({ status }: { status: string }) {
  const styles = {
    Published: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
    Pending: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
    Draft: "bg-slate-500/10 text-slate-600 dark:text-slate-300",
  } as const;

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
        styles[status as keyof typeof styles]
      }`}
    >
      {status}
    </span>
  );
}

export default function Dashboard() {
  return (
    <div className="flex w-full flex-col items-center gap-8 pb-8">
      {/* Header */}
      <section className="mt-6 flex w-full flex-col gap-6 px-4 sm:mt-10 xl:w-6xl xl:px-0">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-3">
            <div className="bg-indigo-zero/20 text-indigo-zero flex w-fit items-center gap-2 rounded-full border-2 px-3 py-1 shadow-sm select-none">
              <LayoutDashboard size={17} />

              <span className="text-xs font-bold tracking-wide uppercase">
                Your workspace
              </span>
            </div>

            <div>
              <h1 className="font-space-grotesk text-4xl font-bold tracking-tight sm:text-5xl">
                Dashboard
              </h1>

              <p className="text-slate-zero mt-2 max-w-2xl text-sm sm:text-base">
                A clear overview of your publishing activity, content, and
                account.
              </p>
            </div>
          </div>

          <button className="bg-indigo-zero flex w-fit items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg">
            <Plus size={18} />
            New post
          </button>
        </div>
      </section>

      {/* Statistics */}
      <section className="grid w-full grid-cols-1 gap-4 px-4 sm:grid-cols-2 xl:w-6xl xl:grid-cols-4 xl:px-0">
        {statCards.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="bg-slate-two flex min-h-36 flex-col justify-between rounded-3xl border p-5 shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-slate-zero text-sm font-medium">
                  {stat.label}
                </span>

                <span className="bg-indigo-zero/10 text-indigo-zero flex size-9 items-center justify-center rounded-2xl">
                  <Icon size={18} />
                </span>
              </div>

              <div>
                <p className="font-space-grotesk text-3xl font-bold">
                  {stat.value}
                </p>

                <p className="text-slate-zero mt-1 text-xs">{stat.detail}</p>
              </div>
            </div>
          );
        })}
      </section>

      {/* Analytics + Account */}
      <section className="grid w-full gap-4 px-4 xl:w-6xl xl:grid-cols-[1.7fr_1fr] xl:px-0">
        {/* Publishing Activity */}
        <div className="bg-slate-two rounded-3xl border p-5 shadow-md sm:p-6">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <BarChart3 className="text-indigo-zero" size={19} />

                <h2 className="font-space-grotesk text-xl font-bold">
                  Publishing activity
                </h2>
              </div>

              <p className="text-slate-zero mt-1 text-sm">
                Posts published during the last 7 days.
              </p>
            </div>

            <button
              className="text-slate-zero hover:bg-slate-one rounded-full p-2 transition"
              aria-label="More chart options"
            >
              <MoreHorizontal size={20} />
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={activityData}
                margin={{
                  top: 8,
                  right: 4,
                  left: -24,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient
                    id="dashboardActivity"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="currentColor"
                      stopOpacity={0.24}
                    />

                    <stop
                      offset="100%"
                      stopColor="currentColor"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="4 4"
                  className="stroke-gray-200 dark:stroke-gray-800"
                  vertical={false}
                />

                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  className="text-xs"
                />

                <YAxis
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                  className="text-xs"
                />

                <Tooltip
                  cursor={{
                    stroke: "currentColor",
                    strokeOpacity: 0.15,
                  }}
                  contentStyle={{
                    borderRadius: 16,
                    border: "1px solid var(--border)",
                    background: "var(--card)",
                    color: "var(--foreground)",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="posts"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  fill="url(#dashboardActivity)"
                  className="text-indigo-zero"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Account Overview */}
        <div className="bg-slate-two rounded-3xl border p-5 shadow-md sm:p-6">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h2 className="font-space-grotesk text-xl font-bold">
                Account overview
              </h2>

              <p className="text-slate-zero mt-1 text-sm">
                Your current workspace status.
              </p>
            </div>

            <button
              className="text-slate-zero hover:bg-slate-one rounded-full p-2 transition"
              aria-label="Account settings"
            >
              <Settings2 size={19} />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-slate-one/60 rounded-2xl p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-zero/15 text-indigo-zero flex size-11 items-center justify-center rounded-full font-bold">
                    M
                  </div>

                  <div>
                    <p className="font-semibold">Meraj</p>

                    <p className="text-slate-zero text-xs">Author account</p>
                  </div>
                </div>

                <CheckCircle2 className="text-emerald-500" size={19} />
              </div>
            </div>

            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-slate-zero" size={18} />

                <span className="text-sm">Account security</span>
              </div>

              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                Good
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="text-slate-zero" size={18} />

                <span className="text-sm">Profile visibility</span>
              </div>

              <span className="text-xs font-semibold">Public</span>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts + Quick Actions */}
      <section className="grid w-full gap-4 px-4 xl:w-6xl xl:grid-cols-[1.7fr_1fr] xl:px-0">
        {/* Recent Posts */}
        <div className="bg-slate-two overflow-hidden rounded-3xl border shadow-md">
          <div className="flex items-center justify-between gap-4 border-b p-5 sm:p-6">
            <div>
              <h2 className="font-space-grotesk text-xl font-bold">
                Recent posts
              </h2>

              <p className="text-slate-zero mt-1 text-sm">
                Your latest content at a glance.
              </p>
            </div>

            <button className="text-indigo-zero flex items-center gap-1 text-sm font-semibold">
              View all
              <ArrowUpRight size={16} />
            </button>
          </div>

          <div className="divide-y">
            {recentPosts.map((post) => (
              <div
                key={post.title}
                className="hover:bg-slate-one/50 flex items-center gap-4 p-5 transition sm:px-6"
              >
                <div className="bg-slate-one hidden size-10 shrink-0 items-center justify-center rounded-2xl sm:flex">
                  <PenLine size={17} className="text-slate-zero" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{post.title}</p>

                  <p className="text-slate-zero mt-1 text-xs">{post.date}</p>
                </div>

                <div className="hidden items-center gap-3 sm:flex">
                  <span className="text-slate-zero text-xs">
                    {post.views} views
                  </span>

                  <Status status={post.status} />
                </div>

                <ChevronRight
                  className="text-slate-zero shrink-0 sm:hidden"
                  size={18}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-two rounded-3xl border p-5 shadow-md sm:p-6">
          <div className="mb-5 flex items-center gap-2">
            <MessageSquareText className="text-indigo-zero" size={19} />

            <h2 className="font-space-grotesk text-xl font-bold">
              Quick actions
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            <button className="group flex items-center justify-between rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md">
              <span className="flex items-center gap-3">
                <span className="bg-indigo-zero/10 text-indigo-zero flex size-9 items-center justify-center rounded-xl">
                  <Plus size={18} />
                </span>

                <span>
                  <span className="block text-sm font-semibold">
                    Create a post
                  </span>

                  <span className="text-slate-zero block text-xs">
                    Start writing something new
                  </span>
                </span>
              </span>

              <ChevronRight
                size={17}
                className="text-slate-zero transition group-hover:translate-x-1"
              />
            </button>

            <button className="group flex items-center justify-between rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md">
              <span className="flex items-center gap-3">
                <span className="bg-indigo-zero/10 text-indigo-zero flex size-9 items-center justify-center rounded-xl">
                  <PenLine size={18} />
                </span>

                <span>
                  <span className="block text-sm font-semibold">
                    Manage drafts
                  </span>

                  <span className="text-slate-zero block text-xs">
                    Continue unfinished posts
                  </span>
                </span>
              </span>

              <ChevronRight
                size={17}
                className="text-slate-zero transition group-hover:translate-x-1"
              />
            </button>

            <button className="group flex items-center justify-between rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md">
              <span className="flex items-center gap-3">
                <span className="bg-indigo-zero/10 text-indigo-zero flex size-9 items-center justify-center rounded-xl">
                  <Users size={18} />
                </span>

                <span>
                  <span className="block text-sm font-semibold">
                    Edit profile
                  </span>

                  <span className="text-slate-zero block text-xs">
                    Keep your author page current
                  </span>
                </span>
              </span>

              <ChevronRight
                size={17}
                className="text-slate-zero transition group-hover:translate-x-1"
              />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
