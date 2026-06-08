import z from "zod";
import {
  userSignUpDetailsSchema,
  userSignUpPrimaryDetailsSchema,
  userSignUpSecondaryDetailsSchema,
} from "../signUp.schema";
import { userLoginDetailsSchema } from "../login.schema";

type userSignUpDetailsType = z.infer<typeof userSignUpDetailsSchema>;
type userSignUpPrimaryDetailsType = z.infer<
  typeof userSignUpPrimaryDetailsSchema
>;
type userSignUpSecondaryDetailsType = z.infer<
  typeof userSignUpSecondaryDetailsSchema
>;

type userLoginDetailsType = z.infer<typeof userLoginDetailsSchema>;

export type {
  userLoginDetailsType,
  userSignUpDetailsType,
  userSignUpPrimaryDetailsType,
  userSignUpSecondaryDetailsType,
};
