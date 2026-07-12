import { UseFormSetError, UseFormSetValue } from "react-hook-form";
import ImageFileUpload from "@/components/shared/ImageFileUpload";
import { organisationDetailsType } from "@repo/zod-schema/organisation/types/organisationDetails.types.js";
import defaultOrganisationLogo from "public/default-organisation-logo.png";
import ErrorMessage from "@/components/shared/UserMessages/ErrorMessage";

type LogoUploadProps = {
  setValue: UseFormSetValue<organisationDetailsType>;
  setError: UseFormSetError<organisationDetailsType>;
  error?: string;
  src?: string;
};

function LogoUpload({ setValue, setError, error }: LogoUploadProps) {
  const key = "OrganisationLogo";

  function setLogoLink(data: string) {
    setValue("logoLink", data);
  }

  function setImageLinkError(data: string) {
    setError("logoLink", { message: data });
  }

  return (
    <>
      <ErrorMessage>{error}</ErrorMessage>
      <ImageFileUpload
        itemKey={key}
        uploadType="organisation-logo"
        defaultImage={defaultOrganisationLogo}
        labelText="Enter Image(required)"

        ErrorCb={setImageLinkError}
        SuccessCb={setLogoLink}
        className="absolute top-14 left-4/6 [&_image]:"
      />
    </>
  );
}

export default LogoUpload;
