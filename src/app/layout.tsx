import "@/styles/globals.css";
import { siteMetadata } from "./metadata";
import { inter, quicksand, roboto } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import ApplyTheme from "@/components/behaviors/ApplyTheme";
import LoadSession from "@/components/behaviors/LoadSession";
import QueryProvider from "@/components/providers/QueryProvider";
import ReduxProvider from "@/components/providers/ReduxProvider";
import { Toaster } from "@/components/ui/sonner";

export const metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-dvh", "antialiased", "font-sans")}>
      <ApplyTheme />
      <body
        className={`${quicksand.variable} ${roboto.variable} ${inter.variable}`}
      >
        <ReduxProvider>
          <QueryProvider>
            <LoadSession />
            <div className="flex flex-col">{children}</div>
            <Toaster position="top-right" />
          </QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
