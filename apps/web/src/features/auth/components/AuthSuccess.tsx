import { cn } from "@/utils/cn";
import { ReactNode } from "react";

function AuthSuccess({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center flex-col justify-center w-full h-50 gap-5",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default AuthSuccess;
