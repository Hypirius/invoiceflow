"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SignUpMain from "./SignUpMain";

const queryClient = new QueryClient();

function SignUp() {
  return (
    <QueryClientProvider client={queryClient}>
      <SignUpMain />
    </QueryClientProvider>
  );
}

export default SignUp;
