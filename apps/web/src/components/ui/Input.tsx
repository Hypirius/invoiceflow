import { InputHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export default function Input({ className, ...rest }: InputProps) {
  return (
    <input
      className={cn("w-full h-10 border border-[#C7C4D8] pl-3", className)}
      {...rest}
    />
  );
}
