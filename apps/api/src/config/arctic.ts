import { Google } from "arctic";
import config from "./env";

const google = new Google(
  config.GOOGLE_OAUTH_ID,
  config.GOOGLE_OAUTH_SECRET_KEY,
  config.OAUTH_REDIRECT_URL,
);

export { google };
