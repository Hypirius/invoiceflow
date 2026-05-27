import { ReactNode } from "react";

export default function AuthMain({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#FFFFFF] h-full w-[55%] flex items-center justify-center">
      <section className="w-100 h-120 flex flex-col justify-center text-[#191C1E] gap-5">
        {children}
      </section>
    </div>
  );
}
