import z from "zod";
import { changePasswordSchema } from "./changePassword.schema";

//NOTE: userSignUpDetailsSchema fields duplication is needed for more control. Preprocess doesn't work with zodResolver from react-hook-form and resolvers

const emptyToUndefined = (val: unknown) =>
  typeof val === "string" && val.trim() === "" ? undefined : val;

function optionalString<T extends z.ZodType>(schema: T) {
  return z.preprocess(
    emptyToUndefined,
    schema.optional(),
  ) as unknown as z.ZodOptional<T>;
}

export const changeUserDetailsSchema = z.object({
  email: optionalString(z.email().trim().toLowerCase()),

  fullName: optionalString(
    z
      .string()
      .trim()
      .min(4, { message: "Name must be greater than 4 characters" })
      .max(32, { message: "Name must be less than 32 characters" }),
  ),

  displayName: optionalString(z.string().trim()),

  profileImage: optionalString(z.url().trim()),

  passwordDetails: optionalString(changePasswordSchema),
});

// TODO: research the weird default and export error
