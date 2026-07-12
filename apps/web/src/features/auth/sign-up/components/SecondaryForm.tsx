"use client";

import InputWithLabelAndError from "@/components/shared/InputWIthLabelAndError";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSignUpSecondaryDetailsType } from "@repo/zod-schema/auth/types/signUp.types.ts";
import { useForm } from "react-hook-form";
import ProfileImageUpload from "./ProfileImageUpload";
import { userSignUpSecondaryDetailsSchema } from "@repo/zod-schema/auth/signUp.schema.ts";

type SecondaryFormProps = {
  setSecondaryDetails: (data: userSignUpSecondaryDetailsType) => void;
  fullName: string;
};

export default function SecondaryForm({
  setSecondaryDetails,
  fullName,
}: SecondaryFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<userSignUpSecondaryDetailsType>({
    resolver: zodResolver(userSignUpSecondaryDetailsSchema),
  });

  return (
    <form
      id="secondary-form"
      onSubmit={handleSubmit(({ profileImage, displayName }) =>
        setSecondaryDetails({ profileImage, displayName }),
      )}
    >
      <InputWithLabelAndError
        id="display-name"
        labelText="Display name(optional)"
        {...register("displayName")}
        placeholder={fullName}
        error={errors.displayName?.message}
      />
      <ProfileImageUpload setValue={setValue} setError={setError} />
    </form>
  );
}
