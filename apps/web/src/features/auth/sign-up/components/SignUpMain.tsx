"use client";

import { useEffect, useState } from "react";
import {
  FullDetailsType,
  SignUpDetailsType,
  SignUpPrimaryDetailsType,
} from "../../types";
import { userSignUpSecondaryDetailsType } from "@repo/zod-schema/auth/types/signUp.types.ts";
import SecondaryForm from "./SecondaryForm";
import PrimaryForm from "./PrimaryForm";
import { useRouter } from "next/navigation";
import SignUpSuccess from "./SignUpSuccess";
import FormController from "./FormController";
import usePost from "@/hooks/usePost";
import fetchUrls from "@/config/fetchUrls";

type selectedFormType = {
  step: 1 | 2;
  formId: "primary-form" | "secondary-form";
};

// TODO: UI could be better and code can be made slightly better or refactored

export default function SignUpMain() {
  const [userPrimaryDetails, setUserPrimaryDetails] =
    useState<SignUpPrimaryDetailsType>({
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    });

  const [selectedForm, setSelectedForm] = useState<selectedFormType>({
    step: 1,
    formId: "primary-form",
  });

  const { mutate, isSuccess, isPending } = usePost<FullDetailsType>({
    url: fetchUrls.signUp,
    key: "userSignUp",
    credentials: true,
  });

  const router = useRouter();

  function handleSubmitStep(
    action: "next" | "back" | "submit",
    data?: FullDetailsType,
  ) {
    if (action === "next" && selectedForm.step === 1) {
      setSelectedForm({ step: 2, formId: "secondary-form" });
    } else if (action === "back" && selectedForm.step === 2) {
      setSelectedForm({ step: 1, formId: "primary-form" });
    } else if (action === "submit" && selectedForm.step === 2 && data) {
      const { email, password, fullName, displayName, profileImage } = data;

      const uploadData = { email, password, fullName } as SignUpDetailsType;

      if (displayName) {
        uploadData.displayName = displayName;
      }

      if (profileImage) {
        uploadData.profileImage = profileImage;
      }

      mutate(uploadData);
    }
  }

  function setPrimaryDetails(data: SignUpPrimaryDetailsType) {
    setUserPrimaryDetails(data);
    handleSubmitStep("next");
  }

  function setSecondaryDetails(data: userSignUpSecondaryDetailsType) {
    handleSubmitStep("submit", {
      ...userPrimaryDetails,
      ...data,
    });
  }

  useEffect(() => {
    if (isSuccess) {
      router.push("/user/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  if (isSuccess) {
    return <SignUpSuccess />;
  }

  if (isPending) {
    return <p>Authenicating...</p>;
  }

  return (
    <div className="[&_form]:w-full h-110 w-full relative flex justify-center">
      {selectedForm.step === 1 && (
        <PrimaryForm
          setPrimaryDetails={setPrimaryDetails}
          values={userPrimaryDetails}
        />
      )}
      {selectedForm.step === 2 && (
        <SecondaryForm
          fullName={userPrimaryDetails.fullName}
          setSecondaryDetails={setSecondaryDetails}
        />
      )}
      <FormController
        handleSubmitStep={handleSubmitStep}
        selectedFormId={selectedForm.formId}
      />
    </div>
  );
}
