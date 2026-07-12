import { ChangeUserDetailsType } from "@repo/zod-schema/change-details/types/changeDetails.types.ts";
import validateSchema from "../utils/validateSchema";
import compareHash from "../utils/compareHash";
import { findUserDetails, updateDetails } from "./changeDetails.repository";
import { PasswordHashMismatchError } from "../utils/ErrorClass";
import hashify from "../utils/hashify";
import { generateAccessToken } from "../utils/generateJWT";
import { changeUserDetailsSchema } from "@repo/zod-schema/change-details/changeDetails.schema.ts";

async function changeDetailsService(
  changedDetails: ChangeUserDetailsType,
  userId: string,
) {
  console.log(changeDetailsService);
  const validationResult = validateSchema<ChangeUserDetailsType>(
    changeUserDetailsSchema,
    changedDetails,
  );

  const { email, displayName, fullName, role, password } =
    await findUserDetails(userId);

  if (validationResult.passwordDetails) {
    const isSameHash = await compareHash(
      validationResult.passwordDetails.currentPassword,
      password,
    );

    if (!isSameHash) {
      throw new PasswordHashMismatchError();
    }

    validationResult.passwordDetails.newPassword = await hashify(
      validationResult.passwordDetails.newPassword,
    );
  }

  await updateDetails(validationResult, userId);

  const accessToken = await generateAccessToken({
    sub: userId,
    email: validationResult.email ?? email,
    displayName: displayName ?? fullName,
    role,
  });

  return accessToken;
}

// TODO: Email verification can be used here for password

export default changeDetailsService;
