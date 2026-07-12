"use client";

import SignUpMain from "./SignUpMain";
import QueryClientWrapper from "@/components/shared/QueryClientWrapper";

function SignUp() {
  return (
    <QueryClientWrapper>
      <SignUpMain />
    </QueryClientWrapper>
  );
}

export default SignUp;
