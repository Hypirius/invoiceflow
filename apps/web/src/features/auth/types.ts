import z from "zod";
import { loginDetailsSchema } from "./login/schema/loginDetailsSchema";
import PrimaryDetailsSchema from "./sign-up/schemas/PrimaryDetailsSchema";
import {
  userSignUpPrimaryDetailsType,
  userSignUpSecondaryDetailsType,
} from "@repo/zod-schema/auth/types/signUp.types.js";

export type TypedErrorTree<T> = {
  errors: string[];
  properties?: {
    [K in keyof T]?: TypedErrorTree<T[K]>;
  };
};

export type LoginDetailsSchemaType = z.infer<typeof loginDetailsSchema>;

export type LoginDetailsType = { email: string; password: string };

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
