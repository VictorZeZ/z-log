import { TbLayoutDashboard } from "react-icons/tb";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SheetClose } from "@/components/ui/sheet";
import { NavItem } from "./NavItem";

export function DashboardSection() {
  return (
    <AccordionItem value="dashboard">
      <AccordionTrigger>Dashboard</AccordionTrigger>
      <AccordionContent className="flex flex-col gap-1">
        <SheetClose asChild>
          <NavItem
            label="Overview (Coming soon)"
            icon={TbLayoutDashboard}
            disabled
          />
        </SheetClose>
      </AccordionContent>
    </AccordionItem>
  );
}
