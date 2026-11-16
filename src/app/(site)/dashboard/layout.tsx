import { DashboardShell } from "@/components/pages/dashboard/shell/DashboardShell";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <DashboardShell>{children}</DashboardShell>;
}
