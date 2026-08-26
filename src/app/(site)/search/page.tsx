import { Suspense } from "react";
import { SearchPage } from "@/components/pages/search/SearchPage";

export default function Search() {
  return (
    <Suspense>
      <SearchPage />
    </Suspense>
  );
}
