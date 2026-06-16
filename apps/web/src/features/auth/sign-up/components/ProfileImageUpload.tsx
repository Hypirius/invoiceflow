"use client";

import InputWithLabelAndError from "@/components/shared/InputWIthLabelAndError";
import Image from "next/image";
import { UseFormSetError, UseFormSetValue } from "react-hook-form";
import useImageUpload from "../../../../hooks/useImageUpload";
import { ChangeEvent } from "react";
import DefaultUserProfileImage from "public/default-user-profile-image.png";
import { userSignUpSecondaryDetailsType } from "@repo/zod-schema/auth/types/signUp.types.js";
import handleValidation from "../../utils/handleValidation";
import imageUploadSchema from "../../../../schemas/ImageUploadSchema";

type ProfileImageUploadProps = {
  setValue: UseFormSetValue<userSignUpSecondaryDetailsType>;
  setError: UseFormSetError<userSignUpSecondaryDetailsType>;
  src?: string;
  error: string | undefined;
};

function ProfileImageUpload({
  setValue,
  setError,
  src,
  error,
}: ProfileImageUploadProps) {
  const { mutateAsync } = useImageUpload("profileImage");

  async function handleImageSubmit(image: File) {
    const validationResult = handleValidation(imageUploadSchema, image);

    if (!validationResult.success) {
      console.log(validationResult);
      return setError("profileImage", {
        message: validationResult.errors.errors[0],
      });
    }

    const result = await mutateAsync(image);

    console.log(result);
    setValue("profileImage", result);
  }

  return (
    <div className="relative">
      <InputWithLabelAndError
        id="profile-image"
        labelText="Enter your profile Image (optional)"
        accept=".jpg, .jpeg, .png"
        type="file"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          e.target.files?.[0] && handleImageSubmit(e.target.files?.[0])
        }
        error={error}
        className="w-32 h-32 rounded-full left-1/2 -translate-x-1/2 translate-y-[55%] opacity-0 absolute p-0"
      />
      <Image
        src={src ? src : DefaultUserProfileImage}
        alt="profile Image"
        width={128}
        height={128}
        className="rounded-full w-32 h-32 m-auto hover:opacity-60"
      />
    </div>
  );
}

export default ProfileImageUpload;
