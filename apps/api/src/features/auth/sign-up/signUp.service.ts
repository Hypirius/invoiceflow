import { userSignUpDetailsSchema } from "@repo/zod-schema/auth/signUp.schema.ts";
import { userSignUpDetailsType } from "@repo/zod-schema/auth/types/signUp.types.ts";
import { createUser, UserModelType } from "./signUp.repository";
import { ValidationError } from "@/lib/errors/ErrorClasses";
import hashify from "@/features/auth/utils/hashify";
import {
  generateAccessToken,
  generateDualTokens,
  generateRefreshToken,
} from "../utils/generateJWT";
import defaultImageUrl from "@/constants/defaultImageUrl";
import { randomUUID } from "crypto";

async function signUpService(data: userSignUpDetailsType) {
  const validation = userSignUpDetailsSchema.safeParse(data);

  if (!validation.success) {
    throw new ValidationError(validation.error.issues);
  }

  if (!data.displayName) {
    data.displayName = data.fullName;
  }

  if (!data.profileImage) {
    data.profileImage = defaultImageUrl;
  }

  data.password = await hashify(data.password);

  const userId = randomUUID();

  const tokens = await generateDualTokens({
    sub: userId,
    email: data.email,
    displayName: data.displayName,
    role: "user",
  });

  await createUser({
    id: userId,
    ...data,
    refreshToken: tokens.refreshToken,
  } as UserModelType);

  return {
    data: {
      email: data.email,
      fullName: data.email,
      displayName: data.displayName,
      profileImage: data.profileImage,
    },
    jwt: tokens,
  };
}

export default signUpService;
