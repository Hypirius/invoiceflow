import z from "zod";
import PrimaryDetailsSchema from "./sign-up/schemas/PrimaryDetailsSchema";
import {
  userSignUpPrimaryDetailsType,
  userSignUpSecondaryDetailsType,
} from "@repo/zod-schema/auth/types/signUp.types.js";

export type SignUpPrimaryDetailsType = z.infer<typeof PrimaryDetailsSchema>;

export type SignUpDetailsType = Omit<
  SignUpPrimaryDetailsType,
  "confirmPassword"
> &
  userSignUpSecondaryDetailsType;

export type SignUpResponseType = {
  success: true;
  data: {
    [x: string]: string;
  };
};

export type FullDetailsType = userSignUpPrimaryDetailsType &
  userSignUpSecondaryDetailsType;
