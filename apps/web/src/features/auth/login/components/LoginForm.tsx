"use client";

import InputWithLabelAndError from "@/components/shared/InputWIthLabelAndError";
import Button from "@/components/ui/Button";
import ForgotPassword from "./ForgotPassword";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userLoginDetailsSchema } from "@repo/zod-schema/auth/login.schema.ts";
import { userLoginDetailsType } from "@repo/zod-schema/auth/types/login.types.ts";
import useLogin from "../hooks/useLogin";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthSuccess from "../../components/AuthSuccess";
import AuthRedirect from "../../components/AuthRedirect";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userLoginDetailsType>({
    resolver: zodResolver(userLoginDetailsSchema),
  });

  const { mutate, isPending, isSuccess } = useLogin();

  const router = useRouter();

  function processSubmit(data: userLoginDetailsType) {
    mutate(data);
  }

  useEffect(() => {
    if (isSuccess) {
      router.push("/user/dashboard");
    }
  }, [isSuccess, router]);

  if (isPending) {
    return <p>Authenicating...</p>;
  }

  if (isSuccess) {
    return (
      <AuthSuccess>
        <h3>Successful login</h3>
        <AuthRedirect
          prompt="Redirect does not work? Go manually to"
          href="/user/dashboard"
          linkText="dashboard"
        />
      </AuthSuccess>
    );
  }

  return (
    <form
      id="login-form"
      onSubmit={handleSubmit(processSubmit)}
      className="flex flex-col justify-center w-full"
    >
      <InputWithLabelAndError
        id="email"
        labelText="Email address"
        type="email"
        {...register("email")}
        required
        error={errors?.email?.message}
        placeholder="name@example.com"
      />
      <InputWithLabelAndError
        id="password"
        labelText="Password"
        type="password"
        {...register("password")}
        required
        error={errors?.password?.message}
      />
      <ForgotPassword />
      <Button variant="primary" type="submit" className="w-full">
        Sign in &gt;
      </Button>
    </form>
  );
}

// TODO: Change this from useState to react forms library and react query for mutations
