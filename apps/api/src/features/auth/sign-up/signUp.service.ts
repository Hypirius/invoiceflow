import { userSignUpDetailsSchema } from "@repo/zod-schema/auth/signUp.schema.ts";
import { userSignUpDetailsType } from "@repo/zod-schema/auth/types/signUp.types.ts";
import { createUser, UserModelType } from "./signUp.repository";
import hashify from "@/features/auth/utils/hashify";
import { generateDualTokens } from "../utils/generateJWT";
import defaultImageUrl from "@/constants/defaultImageUrl";
import { randomUUID } from "crypto";
import validateSchema from "../utils/validateSchema";

async function signUpService(data: userSignUpDetailsType) {
  const result = validateSchema<userSignUpDetailsType>(
    userSignUpDetailsSchema,
    data,
  );

  if (!result.displayName) {
    result.displayName = result.fullName;
  }

  if (!result.profileImage) {
    result.profileImage = defaultImageUrl;
  }

  result.password = await hashify(result.password);

  const userId = randomUUID();

  const tokens = await generateDualTokens({
    sub: userId,
    email: result.email,
    displayName: result.displayName,
    role: "user",
  });

  await createUser({
    id: userId,
    ...result,
  } as UserModelType);

  return {
    data: {
      userId,
      email: result.email,
      fullName: result.email,
      displayName: result.displayName,
      profileImage: result.profileImage,
    },
    tokens,
  };
}

export default signUpService;
