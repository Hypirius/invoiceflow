import z from "zod";
import passwordCheckSchema from "./passwordCheck.schema";

const userSignUpPrimaryDetailsSchema = z
  .object({
    email: z.email().trim().toLowerCase(),
    fullName: z
      .string()
      .trim()
      .min(4, { message: "Name must be greater than 4 characters" })
      .max(32, { message: "Name must be less than 32 characters" }),
    password: passwordCheckSchema.optional(),

    oauthId: z.string().trim().optional(),
  })
  .refine(
    (data) => {
      if (!data.oauthId && !data.password) return false;
    },
    {
      message: "Either password or oauth must be passed, fields missing",
      path: ["password, oauthId"],
    },
  )
  .refine((data) => !(data.password && data.oauthId), {
    message: "Sign up details cannot have both oauthId and password.",
    path: ["password", "oauthId"],
  });

const userSignUpSecondaryDetailsSchema = z.object({
  displayName: z.string().trim().optional(),
  profileImage: z.url().trim().optional(),
});

const userSignUpDetailsSchema = z.object({
  ...userSignUpSecondaryDetailsSchema.shape,
  ...userSignUpPrimaryDetailsSchema.shape,
});

export {
  userSignUpPrimaryDetailsSchema,
  userSignUpSecondaryDetailsSchema,
  userSignUpDetailsSchema,
};
