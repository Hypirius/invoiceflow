import { ReactNode } from "react";

function ListContainer({ children }: { children: ReactNode }) {
  return (
    <ul className="w-full border-2 border-[#C7C4D8] rounded">{children}</ul>
  );
}
export default ListContainer;
