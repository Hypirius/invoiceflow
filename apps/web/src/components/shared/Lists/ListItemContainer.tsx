import { ChangeEvent, ReactNode } from "react";

type ListItemContainerProps = {
  children: ReactNode;
  onChangeFn?: (event: ChangeEvent<HTMLInputElement>) => void;
};

function ListItemContainer({ children, onChangeFn }: ListItemContainerProps) {
  return (
    <li className="w-full px-15 text-center font-medium text-[15px] *:h-8 *:p-2 flex align-center justify-center border-b-2 border-[#C7C4D8] last:border-b-0">
      <input
        type="checkbox"
        className="w-10 flex-none scale-[0.7]"
        onChange={onChangeFn}
      />
      {children}
    </li>
  );
}

export default ListItemContainer;
