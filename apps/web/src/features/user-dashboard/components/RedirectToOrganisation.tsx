"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

function RedirectToOrgansiation() {
  const router = useRouter();

  useEffect(() => {
    router.push("/user/dashboard/organisations");
  });

  return <p>Redirecting...</p>;
}

export default RedirectToOrgansiation;
