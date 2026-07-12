"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ChangeDetailsForm from "./ChangeDetailsForm";
import ChangePassword from "./ChangePasswordContainer";

const queryClient = new QueryClient();

function ChangeDetailsMain() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col items-center justify-center">
        <ChangeDetailsForm />
        <ChangePassword />
      </div>
    </QueryClientProvider>
  );
}

export default ChangeDetailsMain;
