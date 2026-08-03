import Greeting from "@/components/common/Greeting";
import { useAppSelector } from "@/lib/store/hooks";

export default function Home() {
  return (
    <>
      <Greeting />
    </>
  );
}
