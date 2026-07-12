import z from "zod";
import { changeUserDetailsSchema } from "../changeDetails.schema";

export type ChangeUserDetailsType = z.infer<typeof changeUserDetailsSchema>;
