"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

function useConditionalRedirect(path: string, condition: boolean) {
  const router = useRouter();

  useEffect(() => {
    if (condition) {
      router.push(path);
    }
  }, [condition, router, path]);
}

export default useConditionalRedirect;
