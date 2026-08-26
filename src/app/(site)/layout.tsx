import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-dvh flex flex-col justify-between">
      <Header />
      <main className="flex-1 w-full flex flex-col justify-start items-center py-4 px-2 sm:p-4">{children}</main>
      <Footer />
    </div>
  );
}
