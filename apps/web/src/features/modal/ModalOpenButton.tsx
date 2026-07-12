import { ReactNode, useContext } from "react";
import { ToggleContext } from "./context/toggle";
import Button from "@/components/ui/Button";
import { cn } from "@/utils/cn";

type ModalOpenButtonProps = {
  className?: string;
  variant?: "primary" | "inverted" | "secondary" | "outlined";
  children: ReactNode;
  isDisabled?: boolean;
};

function ModalOpenButton({
  className,
  children,
  variant,
  isDisabled,
}: ModalOpenButtonProps) {
  const state = useContext(ToggleContext);

  function handleState() {
    if (state !== null) {
      state.handleToggle(true);
    }
  }

  return (
    <Button
      variant={variant || "primary"}
      className={cn("mb-2 rounded-md font-medium", className)}
      onClick={handleState}
      isDisabled={isDisabled}
    >
      {children}
    </Button>
  );
}

export default ModalOpenButton;
