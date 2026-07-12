import { cn } from "@/utils/cn";
import { ReactNode } from "react";

function SearchContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full h-13 p-2 flex justify-between items-center border-b-2 border-[#C7C4D8]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default SearchContainer;
