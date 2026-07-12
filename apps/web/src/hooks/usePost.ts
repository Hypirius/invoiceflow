"use client";

import handleFetch from "@/lib/handleFetch";
import { CustomMutationHook } from "@/types/CustomMutationHook";
import { useMutation } from "@tanstack/react-query";

function usePost<TInputData>({
  key,
  url,
  headers,
  credentials,
}: CustomMutationHook<TInputData>) {
  return useMutation({
    mutationKey: [key],
    mutationFn: (data: TInputData) =>
      handleFetch({
        url,
        method: "POST",
        data,
        headers,
        credentials,
      }),
  });
}

export default usePost;
