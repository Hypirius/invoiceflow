import convertTimeValue from "@/utils/convertTimeValue";
import ms from "ms";
import config from "@/config/env";

function setCookieConfig() {
  return {
    httpOnly: true,
    maxAge: convertTimeValue(config.JWT_REFRESH_EXPIRES_IN as ms.StringValue),
  };
}

export default setCookieConfig;
