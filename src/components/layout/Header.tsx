import Image from "next/image";
import Link from "next/link";
import { ThemeSwitch } from "@/components/shared/ThemeSwitch";

function Header() {
  return (
    <header className="bg-gray-two/90 sticky top-0 z-20 w-full border-b shadow-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-8">
        <Link href="/" className="flex items-center" tabIndex={-1}>
          <Image
            src="/logo/wide-logo.png"
            alt="Vetowo Logo"
            width={120}
            height={50}
            className="h-auto w-auto object-cover"
            priority
          />
        </Link>

        <ThemeSwitch />
      </div>
    </header>
  );
}

export default Header;
