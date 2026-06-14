import { cn } from "@/utils/cn";
import Input from "./Input";
import { ComponentProps } from "react";

type InputWithLabelProps = ComponentProps<typeof Input> & {
  id: string;
  labelText: string;
  labelClassName?: string;
  className?: string;
};

export default function InputWithLabel({
  id,
  labelText,
  labelClassName,
  className,
  ...rest
}: InputWithLabelProps) {
  return (
    <>
      <label
        className={cn(
          "text-[#191C1E] font-bold text-[14px] mb-1 block",
          labelClassName,
        )}
        htmlFor={id}
      >
        {labelText}
      </label>
      <Input className={className} {...rest} id={id} />
    </>
  );
}
