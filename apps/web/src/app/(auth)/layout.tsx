import AuthShowcase from "../../features/auth/components/AuthShowcase";
import AuthMain from "../../features/auth/components/AuthMain";
import { NextJSLayout } from "../../types/Nextjs-layout";

export default function AuthLayout({ children }: NextJSLayout) {
  return (
    <div className="w-full h-full flex">
      <AuthShowcase />
      <AuthMain>{children}</AuthMain>
    </div>
  );
}
