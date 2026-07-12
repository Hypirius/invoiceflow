"use client";

import InputWithLabelAndError from "@/components/shared/InputWIthLabelAndError";
import Button from "@/components/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ProfileImageUpload from "@/features/auth/sign-up/components/ProfileImageUpload";
import useChangeUserDetails from "../hooks/useChangeUserDetails";
import { ChangeUserDetailsType } from "@repo/zod-schema/change-details/types/changeDetails.types.ts";
import { changeUserDetailsSchema } from "@repo/zod-schema/change-details/changeDetails.schema.ts";
import ErrorMessage from "@/components/shared/UserMessages/ErrorMessage";
import ErrorOrSuccessMessage from "@/components/shared/UserMessages/ErrorOrSuccessMessage";

function ChangeDetailsForm() {
  const {
    register,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangeUserDetailsType>({
    resolver: zodResolver(changeUserDetailsSchema),
  });

  const { mutate, isError, error, data } = useChangeUserDetails();

  return (
    <>
      <ErrorOrSuccessMessage
        isError={isError}
        errorMessage={error?.message}
        successMessage={
          data?.success ? "Successfully changed details" : undefined
        }
      />
      {isError && <ErrorMessage>{error.message}</ErrorMessage>}
      <form onSubmit={handleSubmit((data) => mutate(data))} className="w-[40%]">
        <InputWithLabelAndError
          type="email"
          labelText="Email"
          id="email"
          placeholder="name@example.com"
          {...register("email")}
          error={errors.email?.message}
        />
        <ProfileImageUpload
          setValue={setValue}
          setError={setError}
          error={errors.profileImage?.message}
        />

        <InputWithLabelAndError
          labelText="Full Name"
          id="full-name"
          placeholder="John Doe"
          {...register("fullName")}
          error={errors.fullName?.message}
        />
        <InputWithLabelAndError
          labelText="Display Name"
          id="display-name"
          placeholder="John Doe"
          {...register("displayName")}
          error={errors.displayName?.message}
        />
        <Button variant="primary" type="submit" className="m-auto">
          Save Details
        </Button>
      </form>
    </>
  );
}

export default ChangeDetailsForm;
