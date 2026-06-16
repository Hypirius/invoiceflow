import z from "zod";
import { userSignUpPrimaryDetailsSchema } from "@repo/zod-schema/auth/signUp.schema.ts";

const PrimaryDetailsSchema = z
  .object(userSignUpPrimaryDetailsSchema.shape)
  .omit({ oauthId: true })
  .extend({
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
  })
  .required()
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export default PrimaryDetailsSchema;
