import z from "zod";
import { loginDetailsSchema } from "./login/schema/loginDetailsSchema";

export type TypedErrorTree<T> = {
  errors: string[];
  properties?: {
    [K in keyof T]?: TypedErrorTree<T[K]>;
  };
};

export type LoginDetailsSchemaType = z.infer<typeof loginDetailsSchema>;

export type LoginDetailsType = { email: string; password: string };
