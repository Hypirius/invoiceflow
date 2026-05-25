import { cn } from "../../utils/cn";
import Input from "./Input";
import { ComponentProps } from "react";

type InputWithLabelProps = ComponentProps<typeof Input> & {
  labelText: string;
  labelClassName: string;
  className: string;
};

export default function InputWithLabel({
  labelText,
  labelClassName,
  className,
  ...rest
}: InputWithLabelProps) {
  return (
    <>
      <label className={cn("text-black", labelClassName)}>{labelText}</label>
      <Input className={className} {...rest} />
    </>
  );
}
