import Head from "@/components/pages/feed/Head";
import SearchBox from "@/components/pages/feed/SearchBox";
import TopPosts from "@/components/pages/feed/TopPosts";

export default function Home() {
  return (
    <div className="flex h-200 w-full flex-col items-center gap-10">
      <Head />
      <SearchBox />
      <TopPosts />
    </div>
  );
}
