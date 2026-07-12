import { cn } from "@/utils/cn";
import { ReactNode } from "react";

function FilterContainer({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      id="filter-controls"
      className={cn("*:w-35 *:h-8 *:rounded flex gap-2", className)}
    >
      {children}
    </div>
  );
}

export default FilterContainer;
