import { ReactNode } from "react";

function SuccessMessage({ children }: { children: ReactNode }) {
  return <p className="text-blue-400">{children}</p>;
}

export default SuccessMessage;
