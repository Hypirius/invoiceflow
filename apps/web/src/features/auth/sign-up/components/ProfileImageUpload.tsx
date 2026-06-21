"use client";

import { UseFormSetError, UseFormSetValue } from "react-hook-form";
import DefaultUserProfileImage from "public/default-user-profile-image.png";
import { userSignUpSecondaryDetailsType } from "@repo/zod-schema/auth/types/signUp.types.js";
import ImageFileUpload from "@/components/shared/ImageFileUpload";

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
  const key = "profileImage";

  function setSecondaryFormValue(data: string) {
    setValue(key, data);
  }

  function setErrorFormValue(data: string) {
    setError(key, { message: data });
  }

  return (
    <ImageFileUpload
      itemKey={key}
      uploadType="profile-image"
      src={src}
      error={error}
      defaultImage={DefaultUserProfileImage}
      SuccessCb={setSecondaryFormValue}
      ErrorCb={setErrorFormValue}
    />
  );
}

export default ProfileImageUpload;
