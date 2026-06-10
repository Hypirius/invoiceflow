import { StateMismatchError } from "@/features/auth/utils/ErrorClass";
import validateSchema from "@/features/auth/utils/validateSchema";
import signUpService from "@/features/auth/sign-up/signUp.service";
import { GoogleIdTokenPayloadType } from "@/features/auth/types";
import { createOauthUser } from "../../oauth.repository";
import findUserByEmail from "@/features/auth/login/login.repository";
import validateGoogleAuthCode from "./utils/validateGoogleAuthCode";
import { decodeIdToken } from "arctic";
import { generateAccessToken } from "@/features/auth/utils/generateJWT";
import callbackParamsSchema from "./utils/callbackParamsSchema";

async function googleOauthCallbackService(
  code: string,
  codeVerifier: string,
  state: string,
  clientState: string,
) {
  validateSchema(callbackParamsSchema, {
    code,
    state,
    clientState,
    codeVerifier,
  });

  if (state !== clientState) {
    throw new StateMismatchError();
  }

  const { idToken } = await validateGoogleAuthCode(code, codeVerifier);

  const { email, name, picture, email_verified, sub, iss } = decodeIdToken(
    idToken(),
  ) as GoogleIdTokenPayloadType;

  let userDetails;
  const findResult = await findUserByEmail(email);

  if (findResult) {
    userDetails = { userId: findResult.id, ...findResult };
  } else {
    userDetails = await signUpService(
      {
        email,
        fullName: name,
        profileImage: picture,
      },
      email_verified,
    );
  }

  await createOauthUser({
    id: sub,
    issuer: iss,
    userId: userDetails?.userId,
  });

  const accessToken = generateAccessToken({
    sub,
    email,
    displayName: name,
    role: "user",
  });

  return {
    userId: userDetails?.userId,
    accessToken,
  };

  //TODO: Could be cleaned up a bit more, check the email verification field
}

export default googleOauthCallbackService;
