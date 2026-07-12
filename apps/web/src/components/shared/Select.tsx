import { ReactNode, SelectHTMLAttributes } from "react";
import ErrorMessage from "./UserMessages/ErrorMessage";
import { cn } from "@/utils/cn";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  children: ReactNode;
  defaultOptionText: string;
  staticValue?: string;
  error?: string;
  selectClassName?: string;
  id?: string;
};

function Select({
  error,
  children,
  defaultOptionText,
  staticValue,
  selectClassName,
  id,
  ...rest
}: SelectProps) {
  return (
    <div>
      <select
        className={cn("h-full w-full", selectClassName)}
        id={id}
        {...rest}
        defaultValue={staticValue ? undefined : ""}
        value={staticValue}
      >
        <option value={staticValue || ""} disabled hidden>
          {defaultOptionText}
        </option>
        {children}
      </select>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
}

export default Select;
