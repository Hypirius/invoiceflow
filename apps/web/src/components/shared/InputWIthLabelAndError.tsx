import { ComponentPropsWithoutRef } from "react";
import InputWithLabel from "../ui/InputWithLabel";

type InputWithLabelAndErrorProps = ComponentPropsWithoutRef<"input"> & {
  id: string;
  labelText: string;
  labelClassName?: string;
  className?: string;
  error?: string;
};

export default function InputWithLabelAndError({
  id,
  labelText,
  labelClassName,
  className,
  error,
  ...rest
}: InputWithLabelAndErrorProps) {
  return (
    <div className="mb-5 h-20">
      <InputWithLabel
        id={id}
        labelText={labelText}
        labelClassName={labelClassName}
        className={className}
        {...rest}
      />
      {error && <p className="mt-2 text-[#F44336]">{error}</p>}
    </div>
  );
}
