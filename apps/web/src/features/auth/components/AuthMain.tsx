import { ReactNode } from "react";

export default function AuthMain({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#FFFFFF] h-full w-[55%] flex items-center justify-center">
      <section className="w-100 h-full flex flex-col justify-center items-center text-[#191C1E] gap-5">
        {children}
      </section>
    </div>
  );
}
