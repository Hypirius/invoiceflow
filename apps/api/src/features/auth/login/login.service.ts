import { userLoginDetailsSchema } from "@repo/zod-schema/auth/login.schema.js";
import { userLoginDetailsType } from "@repo/zod-schema/auth/types/signUp.types.js";
import findUserByEmail from "./login.repository";
import { IncorrectDetailsError } from "../utils/ErrorClass";
import { generateDualTokens } from "../utils/generateJWT";
import compareHash from "../utils/compareHash";
import validateSchema from "../utils/validateSchema";

async function loginService(data: userLoginDetailsType) {
  const validationResult = validateSchema<userLoginDetailsType>(
    userLoginDetailsSchema,
    data,
  );

  const dbResult = await findUserByEmail(validationResult.email);

  if (!dbResult) {
    throw new IncorrectDetailsError();
  }

  if (!(await compareHash(data.password, dbResult.password))) {
    throw new IncorrectDetailsError();
  }

  const tokens = await generateDualTokens({
    sub: dbResult.id,
    email: data.email,
    displayName: dbResult.displayName,
    role: dbResult.displayName,
  });

  return {
    data: {
      email: data.email,
    },
    jwt: tokens,
  };
}

export default loginService;
