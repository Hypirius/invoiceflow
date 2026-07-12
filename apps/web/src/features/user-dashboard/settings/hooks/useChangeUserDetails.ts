"use client";

import fetchUrls from "@/config/fetchUrls";
import usePost from "@/hooks/usePost";

function useChangeUserDetails() {
  return usePost({
    key: "changeUserDetails",
    url: fetchUrls.changeDetails,
    credentials: true,
  });
}

export default useChangeUserDetails;
