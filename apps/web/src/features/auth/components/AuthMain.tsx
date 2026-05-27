import { ReactNode } from "react";

export default function AuthMain({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#FFFFFF] h-full w-[55%]">
      <section className="size-full flex items-center justify-center">
        {children}
      </section>
    </div>
  );
}
