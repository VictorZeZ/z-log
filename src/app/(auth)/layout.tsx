import BackgroundPolygon from "@/components/layout/BackgroundPolygon";
import { ThemeSwitch } from "@/components/shared/ThemeSwitch";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-dvh w-full overflow-hidden">
      <div className="xs:top-5 xs:left-5 absolute top-2 left-2 z-20">
        <ThemeSwitch />
      </div>
      <BackgroundPolygon />
      <div className="relative z-10 flex min-h-dvh w-full items-center justify-center">
        {children}
      </div>
    </div>
  );
}
