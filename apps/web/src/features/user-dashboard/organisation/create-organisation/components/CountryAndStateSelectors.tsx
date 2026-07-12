import { useState, ChangeEvent } from "react";
import { Country, State } from "country-state-city";
import { UseFormSetError, UseFormSetValue } from "react-hook-form";
import { organisationDetailsType } from "@repo/zod-schema/organisation/types/organisationDetails.types.js";
import Select from "@/components/shared/Select";

type CountryValue = {
  name: string;
  isoCode: string;
};

type CountryAndStateSelectorsProps = {
  setValue: UseFormSetValue<organisationDetailsType>;
  setError: UseFormSetError<organisationDetailsType>;
  countryError?: string;
  stateError?: string;
};

function CountryAndStateSelectors({
  setValue,
  setError,
  countryError,
  stateError,
}: CountryAndStateSelectorsProps) {
  const [countries] = useState<CountryValue[]>(() => {
    return Country.getAllCountries().map(({ name, isoCode }) => ({
      name,
      isoCode,
    }));
  });
  const [selectedCountry, setSelectedCountry] = useState<CountryValue>(
    countries[0] as CountryValue,
  );

  function handleCountrySelect(event: ChangeEvent<HTMLSelectElement>) {
    const name = Country.getCountryByCode(event.target.value)?.name;

    if (!name) {
      return setError("address.country", {
        message: "Please select a valid country",
      });
    }

    const data = {
      name,
      isoCode: event.target.value,
    };
    setSelectedCountry(data);
    setValue("address.country", data.name);
  }

  function handleStateSelect(event: ChangeEvent<HTMLSelectElement>) {
    const state = event.target.value;

    if (!state) {
      return setError("address.state", {
        message: "Please select a valid state",
      });
    }

    setValue("address.state", state);
  }

  const selectedCountryStates = State.getStatesOfCountry(
    selectedCountry.isoCode,
  ).map(({ isoCode, name }) => (
    <option key={isoCode} value={name}>
      {name}
    </option>
  ));

  return (
    <>
      <Select
        defaultOptionText="Choose a country"
        error={countryError}
        onChange={handleCountrySelect}
      >
        {countries.map(({ name, isoCode }) => (
          <option key={isoCode} value={isoCode}>
            {name}
          </option>
        ))}
      </Select>

      <Select
        defaultOptionText="Choose a state"
        error={stateError}
        onChange={handleStateSelect}
      >
        {selectedCountryStates.length > 0 ? (
          selectedCountryStates
        ) : (
          <option value={selectedCountry.name}>{selectedCountry.name}</option>
        )}
      </Select>
    </>
  );
}

export default CountryAndStateSelectors;
