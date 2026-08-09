import Head from "@/components/pages/feed/Head";
import SearchBox from "@/components/pages/feed/SearchBox";

export default function Home() {
  return (
    <div className="flex h-200 w-full flex-col gap-10 items-center">
      <Head />
      <SearchBox />
    </div>
  );
}
