import Image from "next/image";
import Link from "next/link";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-two/90 w-full border-t backdrop-blur-[2px]">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-8">
        <Link href="/" className="flex items-center" tabIndex={-1}>
          <Image
            src="/logo/wide-logo.png"
            alt="Vetowo Logo"
            width={120}
            height={50}
            className="h-auto w-auto object-cover"
          />
        </Link>

        <p className="text-muted-foreground text-sm select-none">
          © {year} Z LOG. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
