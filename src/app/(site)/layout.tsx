import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-dvh flex-col justify-between">
      <Header />
      <main className="flex w-full flex-1 flex-col items-center justify-start px-2 py-4 sm:p-4">
        {children}
      </main>
      <Footer />
    </div>
  );
}
