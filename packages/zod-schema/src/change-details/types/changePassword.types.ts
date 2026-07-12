import z from "zod";
import { changePasswordSchema } from "../changePassword.schema";

export type ChangePasswordType = z.infer<typeof changePasswordSchema>;
