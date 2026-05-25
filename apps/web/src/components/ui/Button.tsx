import { ReactNode, ComponentPropsWithoutRef } from "react";
import { JetBrains_Mono } from "next/font/google";
import { cn } from "../../utils/cn";

const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"] });

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant: "primary" | "inverted" | "secondary" | "outlined";
  children: ReactNode;
  className?: string;
}

export default function Button({ variant, children, className }: ButtonProps) {
  return (
    <button
      className={cn(
        `${jetBrainsMono.className} h-50 w-80`,
        {
          "bg-[#4F46E5] text-[#F8FAFC]": variant === "primary",
          "bg-[#0F172A] text-[#F8FAFC]": variant === "inverted",
          "bg-[#64748B] text-[#0F172A]": variant === "secondary",
          "bg-[#F8FAFC] text-[#0F172A] border-[#0F172A]":
            variant === "outlined",
        },
        className,
      )}
    >
      {children}
    </button>
  );
}
