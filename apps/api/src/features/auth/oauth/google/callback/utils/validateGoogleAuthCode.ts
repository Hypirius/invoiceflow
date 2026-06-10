import { google } from "@/config/arctic";
import { OauthProviderError } from "@/features/auth/utils/ErrorClass";
import { OAuth2RequestError } from "arctic";

async function validateGoogleAuthCode(code: string, codeVerifier: string) {
  try {
    return await google.validateAuthorizationCode(code, codeVerifier);
  } catch (err) {
    if (err instanceof OAuth2RequestError) {
      throw new OauthProviderError();
    }

    throw err;
  }
}

export default validateGoogleAuthCode;
