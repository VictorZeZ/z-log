import type { IconType } from "react-icons";
import {
  TbCategory,
  TbChartBar,
  TbDevices,
  TbLayoutDashboard,
  TbNotes,
  TbSettings,
  TbUsers,
} from "react-icons/tb";

export type NavLink = {
  title: string;
  href: string;
};

export const primaryNavLinks: NavLink[] = [
  {
    title: "Feed",
    href: "/",
  },
  {
    title: "Search",
    href: "/search",
  },
  {
    title: "Authors",
    href: "/authors",
  },
  {
    title: "Dashboard",
    href: "/dashboard",
  },
];

export type DashboardNavItem = NavLink & {
  icon: IconType;
  comingSoon?: boolean;
};

export type DashboardNavGroup = {
  label: string;
  adminOnly?: boolean;
  items: DashboardNavItem[];
};

export const dashboardNavGroups: DashboardNavGroup[] = [
  {
    label: "Workspace",
    items: [
      { title: "Overview", href: "/dashboard", icon: TbLayoutDashboard },
      {
        title: "Posts",
        href: "/dashboard/posts",
        icon: TbNotes,
        comingSoon: true,
      },
    ],
  },
  {
    label: "Administration",
    adminOnly: true,
    items: [
      {
        title: "Users",
        href: "/dashboard/users",
        icon: TbUsers,
        comingSoon: true,
      },
      {
        title: "Categories",
        href: "/dashboard/categories",
        icon: TbCategory,
        comingSoon: true,
      },
      {
        title: "Analytics",
        href: "/dashboard/analytics",
        icon: TbChartBar,
        comingSoon: true,
      },
    ],
  },
  {
    label: "Account",
    items: [
      {
        title: "Sessions",
        href: "/dashboard/sessions",
        icon: TbDevices,
        comingSoon: true,
      },
      {
        title: "Settings",
        href: "/dashboard/settings",
        icon: TbSettings,
        comingSoon: true,
      },
    ],
  },
];
