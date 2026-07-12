import { ReactNode } from "react";

export default function SideNavWrapper({ children }: { children: ReactNode }) {
  return (
    <nav className="h-full w-62.5 flex flex-col items-center bg-[#FFFFFF] border-r border-[#565E74]">
      {children}
    </nav>
  );
}
