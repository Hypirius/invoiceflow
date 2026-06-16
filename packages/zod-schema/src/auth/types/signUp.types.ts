import z from "zod";
import {
  userSignUpDetailsSchema,
  userSignUpPrimaryDetailsSchema,
  userSignUpSecondaryDetailsSchema,
} from "../signUp.schema";

type userSignUpDetailsType = z.infer<typeof userSignUpDetailsSchema>;
type userSignUpPrimaryDetailsType = z.infer<
  typeof userSignUpPrimaryDetailsSchema
>;
type userSignUpSecondaryDetailsType = z.infer<
  typeof userSignUpSecondaryDetailsSchema
>;

export type {
  userSignUpDetailsType,
  userSignUpPrimaryDetailsType,
  userSignUpSecondaryDetailsType,
};
