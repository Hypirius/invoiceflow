import { userSignUpDetailsSchema } from "@repo/zod-schema/auth/signUp.schema.ts";
import { userSignUpDetailsType } from "@repo/zod-schema/auth/types/signUp.types.ts";
import { createUser, UserModelType } from "./signUp.repository";
import hashify from "@/features/auth/utils/hashify";
import { generateAccessToken } from "../utils/generateJWT";
import defaultImageUrl from "@/constants/defaultImageUrl";
import { randomUUID } from "crypto";
import validateSchema from "../utils/validateSchema";

async function signUpService(
  data: userSignUpDetailsType,
  emailVerfied: boolean = false,
) {
  let { email, displayName, fullName, profileImage, password } =
    validateSchema<userSignUpDetailsType>(userSignUpDetailsSchema, data);

  if (!displayName) {
    displayName = fullName;
  }

  if (!profileImage) {
    profileImage = defaultImageUrl;
  }

  if (password) {
    password = await hashify(password);
  }

  const userId = randomUUID();

  const accessToken = await generateAccessToken({
    sub: userId,
    email: email,
    displayName: displayName,
    role: "user",
  });

  await createUser({
    id: userId,
    email,
    displayName,
    fullName,
    profileImage,
    password: password ?? null,
    emailVerfied,
  } as UserModelType);

  return {
    data: {
      email,
      fullName,
      displayName,
      profileImage,
    },
    accessToken,
    userId,
  };
}

export default signUpService;
