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
    title: "Profile",
    href: "/profile",
  },
];