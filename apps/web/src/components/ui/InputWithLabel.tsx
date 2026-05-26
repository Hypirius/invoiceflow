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
      <label className={cn("text-black", labelClassName)} htmlFor={id}>
        {labelText}
      </label>
      <Input className={className} {...rest} id={id} />
    </>
  );
}
