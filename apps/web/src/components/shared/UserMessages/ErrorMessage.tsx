import { ReactNode } from "react";

function ErrorMessage({ children }: { children: ReactNode }) {
  return <p className="mt-2 text-[#F44336]">{children}</p>;
}

export default ErrorMessage;
