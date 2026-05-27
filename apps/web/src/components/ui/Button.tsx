import { ReactNode, ComponentPropsWithoutRef } from "react";
import { cn } from "@/utils/cn";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant: "primary" | "inverted" | "secondary" | "outlined";
  children: ReactNode;
  className?: string;
}

export default function Button({
  variant,
  children,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(
        `h-10 w-80 cursor-pointer`,
        {
          "bg-[#4F46E5] text-[#F8FAFC]": variant === "primary",
          "bg-[#0F172A] text-[#F8FAFC]": variant === "inverted",
          "bg-[#64748B] text-[#0F172A]": variant === "secondary",
          "bg-[#F8FAFC] text-[#0F172A] border-[#0F172A] border":
            variant === "outlined",
        },
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
