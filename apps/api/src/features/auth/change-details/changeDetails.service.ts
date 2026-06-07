import { userSignUpDetailsSchema } from "@repo/zod-schema/auth/signUp.schema.js";
import { changeDetailsType } from "../types";
import validateSchema from "../utils/validateSchema";
import compareHash from "../utils/compareHash";
import { findUserDetails, updateDetails } from "./changeDetails.repository";
import { PasswordHashMismatchError } from "../utils/ErrorClass";
import hashify from "../utils/hashify";
import { generateDualTokens } from "../utils/generateJWT";

async function changeDetailsService(
  changedDetails: changeDetailsType,
  userId: string,
) {
  validateSchema<changeDetailsType>(
    userSignUpDetailsSchema.partial(),
    changedDetails,
  );

  const { email, displayName, role, password } = await findUserDetails(userId);

  if (changedDetails.password) {
    const isSameHash = compareHash(changedDetails.password, password);

    if (!isSameHash) {
      throw new PasswordHashMismatchError();
    }

    changedDetails.password = await hashify(changedDetails.password);
  }

  const { accessToken, refreshToken } = await generateDualTokens({
    sub: userId,
    email,
    displayName,
    role,
    ...changedDetails,
  });

  const payload = { ...changedDetails, refreshToken };

  await updateDetails(userId, payload);

  return {
    updatedAccessToken: accessToken,
  };
}

// TODO: Check the token payload items in res

export default changeDetailsService;
