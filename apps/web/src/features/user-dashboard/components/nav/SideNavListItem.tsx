import { cn } from "@/utils/cn";
import { ReactNode } from "react";

export default function SideNavListItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <li
      className={cn(
        "w-full px-4 py-2 text-center flex items-center gap-4 rounded text-[#565E74] hover:bg-[#DAE2FD] hover:text-[#3525CD] font-medium text-[16px] hover: fill-current",
        className,
      )}
    >
      {children}
    </li>
  );
}
