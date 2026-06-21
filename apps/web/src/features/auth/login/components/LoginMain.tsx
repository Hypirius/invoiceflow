"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginForm from "./LoginForm";

const client = new QueryClient();

function LoginMain() {
  return (
    <QueryClientProvider client={client}>
      <LoginForm />
    </QueryClientProvider>
  );
}

export default LoginMain;
