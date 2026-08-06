import { TbNotes } from "react-icons/tb";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SheetClose } from "@/components/ui/sheet";
import { NavItem } from "./NavItem";

export function PostsSection() {
  return (
    <AccordionItem value="posts">
      <AccordionTrigger>Posts</AccordionTrigger>
      <AccordionContent className="flex flex-col gap-1">
        <SheetClose asChild>
          <NavItem label="My Posts (Coming soon)" icon={TbNotes} disabled />
        </SheetClose>
      </AccordionContent>
    </AccordionItem>
  );
}
