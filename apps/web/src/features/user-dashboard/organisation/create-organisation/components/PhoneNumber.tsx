import "react-phone-number-input/style.css";

import PhoneInput from "react-phone-number-input";
import { Control, Controller } from "react-hook-form";
import { organisationDetailsType } from "@repo/zod-schema/organisation/types/organisationDetails.types.js";
import ErrorMessage from "@/components/shared/UserMessages/ErrorMessage";

type PhoneNumberProps = {
  control: Control<organisationDetailsType>;
  error?: string;
};

function PhoneNumber({ control, error }: PhoneNumberProps) {
  return (
    <>
      <Controller
        name="phoneNumber"
        control={control}
        render={({ field }) => <PhoneInput {...field} />}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </>
  );
}

export default PhoneNumber;
