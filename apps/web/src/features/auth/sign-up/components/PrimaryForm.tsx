"use client";

import InputWithLabelAndError from "@/components/shared/InputWIthLabelAndError";
import { useForm } from "react-hook-form";
import { SignUpPrimaryDetailsType } from "../../types";
import { zodResolver } from "@hookform/resolvers/zod";
import PrimaryDetailsSchema from "../schemas/PrimaryDetailsSchema";

type PrimaryFormProps = {
  setPrimaryDetails: (data: SignUpPrimaryDetailsType) => void;
  values: SignUpPrimaryDetailsType;
};

export default function PrimaryForm({
  setPrimaryDetails,
  values,
}: PrimaryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpPrimaryDetailsType>({
    resolver: zodResolver(PrimaryDetailsSchema),
    defaultValues: values,
  });

  return (
    <form
      id="primary-form"
      onSubmit={handleSubmit((data) => setPrimaryDetails(data))}
    >
      <InputWithLabelAndError
        type="email"
        labelText="Email"
        id="email"
        placeholder="name@example.com"
        {...register("email")}
        error={errors.email?.message}
        required
      />
      <InputWithLabelAndError
        labelText="Full Name"
        id="full-name"
        placeholder="John Doe"
        {...register("fullName")}
        error={errors.fullName?.message}
        required
      />
      <InputWithLabelAndError
        type="password"
        labelText="Password"
        id="password"
        {...register("password")}
        error={errors.password?.message}
        required
      />
      <InputWithLabelAndError
        type="password"
        labelText="Confirm Password"
        id="password-confirm"
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
        required
      />
    </form>
  );
}
