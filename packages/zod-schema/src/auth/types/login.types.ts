import z from "zod";
import { userLoginDetailsSchema } from "../login.schema";

type userLoginDetailsType = z.infer<typeof userLoginDetailsSchema>;

export type { userLoginDetailsType };
