"use clieent";

import { ToggleContext } from "@/features/modal/context/toggle";
import { ReactNode, useContext } from "react";
import Button from "@/components/ui/Button";

type CloseDialogButtonProps = {
  className?: string;
  variant?: "primary" | "inverted" | "secondary" | "outlined";
  children: ReactNode;
};

function CloseDialogButton({
  className,
  children,
  variant,
}: CloseDialogButtonProps) {
  const state = useContext(ToggleContext);

  return (
    <Button
      variant={variant || "primary"}
      onClick={() => state?.handleToggle(false)}
      className={className}
    >
      {children}
    </Button>
  );
}

export default CloseDialogButton;
