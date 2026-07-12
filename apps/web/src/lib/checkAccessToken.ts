import { hasCookie } from "cookies-next";

async function checkAccessToken() {
  if (typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    return await hasCookie("access_token", { cookies });
  }

  return await hasCookie("access_token");
}

export default checkAccessToken;
