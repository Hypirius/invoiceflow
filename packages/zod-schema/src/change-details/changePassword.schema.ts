import z from "zod";
import passwordCheckSchema from "../auth/passwordCheck.schema";

const changePasswordSchema = z.object({
  currentPassword: z.string().trim(),
  newPassword: passwordCheckSchema,
});

export { changePasswordSchema };
