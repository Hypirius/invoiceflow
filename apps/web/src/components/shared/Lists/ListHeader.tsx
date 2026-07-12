import { ReactNode } from "react";

type ListHeaderProps = {
  headText: string;
  subHeadingText: string;
  children: ReactNode;
};

function ListHeader({ headText, subHeadingText, children }: ListHeaderProps) {
  return (
    <header className="flex justify-between items-center mb-2.5">
      <div className="mb-2">
        <h1 className="font-semibold text-3xl mb-1.5">{headText}</h1>
        <p className="text-[14px]">{subHeadingText}</p>
      </div>
      {children}
    </header>
  );
}

export default ListHeader;
