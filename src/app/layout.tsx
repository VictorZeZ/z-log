import "@/styles/globals.css";
import { siteMetadata } from "./metadata";
import { inter, quicksand, roboto } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import ApplyTheme from "@/components/behaviors/ApplyTheme";

export const metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-dvh", "antialiased")}>
      <ApplyTheme />
      <body
        className={`${quicksand.variable} ${roboto.variable} ${inter.variable}`}
      >
        <main className="flex flex-col">{children}</main>
      </body>
    </html>
  );
}
