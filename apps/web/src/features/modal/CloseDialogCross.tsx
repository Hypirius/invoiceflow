"use clieent";

import { ToggleContext } from "@/features/modal/context/toggle";
import { useContext } from "react";
import CloseIcon from "public/close-icon.svg";
import { cn } from "@/utils/cn";

function CloseDialogCross({ className }: { className?: string }) {
  const state = useContext(ToggleContext);

  return (
    <div
      onClick={() => state?.handleToggle(false)}
      className={cn(
        "absolute top-6 left-6 rounded-full bg-[#F8FAFC] p-1",
        className,
      )}
    >
      <CloseIcon />
    </div>
  );
}

export default CloseDialogCross;
