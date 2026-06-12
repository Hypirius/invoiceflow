import z from "zod";

const userSignUpPrimaryDetailsSchema = z
  .object({
    email: z.email().trim().toLowerCase(),
    fullName: z.string().trim(),
    password: z
      .string()
      .regex(/^.{8,}$/, "Password must be greater than 8 characters")
      .regex(/.*\d/, "Password must contain atleast one digit")
      .regex(/.*[a-z]/, "Password must contain atleast one lowercase character")
      .regex(/.*[A-Z]/, "Password must contain atleast one uppercase character")
      .regex(
        /.*[@$#!%*?&^]/,
        "Password must contain atleast one special character",
      )
      .regex(
        /^[A-Za-z\d@$#!%*?&^]+$/,
        "Password can only use A-Z, a-z, digits and @$!%*?& characters",
      )
      .trim()
      .optional(),

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
