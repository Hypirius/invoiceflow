"use client";

import InputWithLabelAndError from "@/components/shared/InputWIthLabelAndError";
import { organisationDetailsSchema } from "@repo/zod-schema/organisation/organisationDetails.schema.ts";
import { organisationDetailsType } from "@repo/zod-schema/organisation/types/organisationDetails.types.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import LogoUpload from "./LogoUpload";
import Button from "@/components/ui/Button";
import CountryAndStateSelectors from "./CountryAndStateSelectors";
import PhoneNumber from "./PhoneNumber";
import ErrorOrSuccessMessage from "@/components/shared/UserMessages/ErrorOrSuccessMessage";
import usePost from "@/hooks/usePost";
import fetchUrls from "@/config/fetchUrls";
import invalidateCache from "@/lib/invalidateCache";

function CreateOrganisationForm() {
  const {
    register,
    setValue,
    setError,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<organisationDetailsType>({
    resolver: zodResolver(organisationDetailsSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  const { mutate, data, error, isPending } = usePost({
    key: "organisationCreate",
    url: fetchUrls.organisation,
    credentials: true,
  });

  function processSubmit(data: organisationDetailsType) {
    mutate(data, {
      onSuccess: async () => {
        await invalidateCache("userOrganisations");
      },
    });
  }

  return (
    <>
      <ErrorOrSuccessMessage
        errorMessage={error?.message}
        successMessage={data?.message}
      />
      <form
        onSubmit={handleSubmit(processSubmit)}
        className="w-120 [&_input]: text-right [&_input]:w-80 [&_label]:inline [&_label]:after:content-[':'] [&_label]:mr-3"
      >
        <InputWithLabelAndError
          id="name"
          labelText="Organisation name"
          {...register("name")}
          error={errors?.name?.message}
          required
        />
        <LogoUpload
          setValue={setValue}
          setError={setError}
          error={errors.logoLink?.message}
        />
        <InputWithLabelAndError
          id="email"
          labelText="Business email"
          {...register("email")}
          error={errors?.name?.message}
          required
        />
        <CountryAndStateSelectors
          setValue={setValue}
          setError={setError}
          countryError={errors.address?.country?.message}
          stateError={errors.address?.state?.message}
        />

        <PhoneNumber control={control} error={errors.phoneNumber?.message} />

        <InputWithLabelAndError
          id="street-address"
          labelText="Address"
          {...register("address.streetAddress")}
          error={errors?.address?.streetAddress?.message}
          required
        />
        <InputWithLabelAndError
          id="city"
          labelText="City"
          {...register("address.city")}
          error={errors?.name?.message}
          required
        />
        <InputWithLabelAndError
          id="zip-code"
          labelText="Zip Code"
          {...register("address.zipCode")}
          error={errors?.address?.zipCode?.message}
          required
        />
        <Button variant="primary" type="submit" isDisabled={isPending}>
          Submit
        </Button>
      </form>
    </>
  );
}

export default CreateOrganisationForm;
