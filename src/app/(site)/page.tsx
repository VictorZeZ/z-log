import Head from "@/components/pages/feed/Head";
import Posts from "@/components/pages/feed/Posts";
import SearchBox from "@/components/pages/feed/SearchBox";
import TopPosts from "@/components/pages/feed/TopPosts";

export default function Home() {
  return (
    <div className="flex w-full flex-col items-center gap-10">
      <Head />
      <SearchBox />
      <TopPosts />
      <Posts />
    </div>
  );
}
