import "@/styles/globals.css";
import { siteMetadata } from "./metadata";
import { inter, quicksand, roboto } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import ApplyTheme from "@/components/behaviors/ApplyTheme";
import { Figtree } from "next/font/google";
import QueryProvider from "@/components/providers/QueryProvider";
import { Toaster } from "@/components/ui/sonner";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-dvh", "antialiased", "font-sans", figtree.variable)}
    >
      <ApplyTheme />
      <body
        className={`${quicksand.variable} ${roboto.variable} ${inter.variable}`}
      >
        <QueryProvider>
          <div className="flex flex-col">{children}</div>
          <Toaster position="top-right"/>
        </QueryProvider>
      </body>
    </html>
  );
}
