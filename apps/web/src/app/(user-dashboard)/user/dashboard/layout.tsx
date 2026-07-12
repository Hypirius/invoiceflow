import SideBar from "@/features/user-dashboard/components/nav/SideBar";
import { NextJSLayout } from "@/types/Nextjs-layout";

export default function UserDashboardLayout({ children }: NextJSLayout) {
  return (
    <div className="size-full flex">
      <SideBar />
      <main className="bg-[#F8FAFC] grow p-8">{children}</main>
    </div>
  );
}
