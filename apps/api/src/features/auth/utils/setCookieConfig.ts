import convertTimeValue from "@/utils/convertTimeValue";
import config from "@/config/env";
import { CookieOptions } from "express";
import { cookieConfig } from "@repo/shared/constants/cookieConfig.ts";

type cookieType = "refresh_token" | "access_token" | "device_id";

function setCookieConfig(type: cookieType): CookieOptions {
  const options: CookieOptions = {
    httpOnly:
      type === "refresh_token" ? cookieConfig.refresh_token.httpOnly : false,
    maxAge: cookieConfig[type].maxAge,
  };

  if (config.NODE_ENV === "production") {
    options.secure = true;
  }

  return options;
}

export default setCookieConfig;
