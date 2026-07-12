import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import "server-only";

async function getCookieString() {
  const accessToken = await getCookie("access_token", { cookies });
  const refreshToken = await getCookie("refresh_token", { cookies });
  const deviceId = await getCookie("device_id", { cookies });

  return `access_token=${accessToken}; refresh_token=${refreshToken}; device_id=${deviceId};`;
}

export default getCookieString;
