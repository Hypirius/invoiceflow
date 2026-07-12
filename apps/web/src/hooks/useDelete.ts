"use client";

import handleFetch from "@/lib/handleFetch";
import { CustomMutationHook } from "@/types/CustomMutationHook";
import { useMutation } from "@tanstack/react-query";

function useDelete<TInputData>({
  key,
  url,
  headers,
}: CustomMutationHook<TInputData>) {
  return useMutation({
    mutationKey: [key],
    mutationFn: (data: TInputData) =>
      handleFetch({
        url,
        method: "DELETE",
        data,
        headers,
        credentials: true,
      }),
  });
}
//TODO: could be reformatted or reused
export default useDelete;
