import z from "zod";

const passwordCheckSchema = z
  .string()
  .regex(/^.{8,}$/, "Password must be greater than 8 characters")
  .regex(/.*\d/, "Password must contain atleast one digit")
  .regex(/.*[a-z]/, "Password must contain atleast one lowercase character")
  .regex(/.*[A-Z]/, "Password must contain atleast one uppercase character")
  .regex(/.*[@$#!%*?&^]/, "Password must contain atleast one special character")
  .regex(
    /^[A-Za-z\d@$#!%*?&^]+$/,
    "Password can only use A-Z, a-z, digits and @$!%*?& characters",
  )
  .trim();

export default passwordCheckSchema;
