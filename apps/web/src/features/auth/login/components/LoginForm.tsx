"use client";

import { useState } from "react";
import InputWithLabelAndError from "@/components/shared/InputWIthLabelAndError";
import Button from "@/components/ui/Button";
import { loginDetailsSchema } from "../schema/loginDetailsSchema";
import handleValidation from "../../utils/handleValidation";
import {
  LoginDetailsSchemaType,
  LoginDetailsType,
  TypedErrorTree,
} from "../../types";
import ForgotPassword from "./ForgotPassword";

export default function LoginForm() {
  const [loginDetails, setLoginDetails] = useState<LoginDetailsType>({
    email: "",
    password: "",
  });
  const [error, setError] =
    useState<TypedErrorTree<LoginDetailsSchemaType> | null>(null);

  function handleSubmit() {
    const validationResult = handleValidation(loginDetailsSchema, loginDetails);

    if (!validationResult.success) {
      setError(validationResult.errors);
      return;
    }
  }

  function updateDetails(details: LoginDetailsType) {
    setError(null);
    setLoginDetails(details);
  }

  return (
    <form
      id="login-form"
      onSubmit={handleSubmit}
      className="flex flex-col justify-center gap-5"
    >
      <InputWithLabelAndError
        id="email"
        labelText="Email address"
        type="email"
        value={loginDetails.email}
        required
        onChange={(e) =>
          updateDetails({
            email: e.target.value,
            password: loginDetails.password,
          })
        }
        error={error?.properties?.email?.errors[0]}
        className="w-full h-11"
        placeholder="name@example.com"
        labelClassName=""
      />
      <InputWithLabelAndError
        id="password"
        labelText="Password"
        type="password"
        value={loginDetails.password}
        required
        onChange={(e) =>
          updateDetails({
            email: loginDetails.email,
            password: e.target.value,
          })
        }
        error={error?.properties?.password?.errors[0]}
        className="w-full h-11"
      />
      <ForgotPassword />
      <Button variant="primary" type="submit" className="w-full">
        Sign in &gt;
      </Button>
    </form>
  );
}

// TODO: Change this from useState to react forms library and react query for mutations
