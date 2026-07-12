"use client";

import RefreshPageButton from "@/components/shared/RefreshPageButton";
import FilterContainer from "@/components/shared/SearchAndFilter/FilterContainer";
import SearchContainer from "@/components/shared/SearchAndFilter/SearchContainer";
import Select from "@/components/shared/Select";
import { useState } from "react";
import { UserOrganisation } from "../types/UserOrganisation";
import handleAlphabeticalSort from "@/utils/handleAlphabeticalSort";

type sortOptions = "none" | "owner" | "role" | "name";

type SearchAndFilterProps = {
  data: UserOrganisation[];
  originalData: UserOrganisation[];
  setSortedData: (data: UserOrganisation[]) => void;
};

function OrganisationSearchAndSort({
  data,
  originalData,
  setSortedData,
}: SearchAndFilterProps) {
  const [selectedOption, setSelectedOption] = useState<sortOptions>("none");

  function handleChangeOption(sortOption: sortOptions) {
    let newData = [...data];

    if (sortOption === "name") {
      newData.sort((a, b) => handleAlphabeticalSort(a.name, b.name));
    } else if (sortOption === "owner") {
      newData.sort((a, b) =>
        handleAlphabeticalSort(a.owner.displayName, b.owner.displayName),
      );
    } else if (sortOption === "role") {
      newData.sort((a, b) => handleAlphabeticalSort(a.role, b.role));
    } else if (sortOption === "none") {
      newData = originalData;
    }

    setSortedData(newData);

    setSelectedOption(sortOption);
  }

  return (
    <SearchContainer>
      <FilterContainer>
        <Select
          defaultOptionText={`Sort By: ${selectedOption}`}
          staticValue={`Sort By: ${selectedOption}`}
          onChange={(event) =>
            handleChangeOption(event.target.value as sortOptions)
          }
        >
          <option value="none">none</option>
          <option value="name">name</option>
          <option value="owner">owner</option>
          <option value="role">role</option>
        </Select>
        <RefreshPageButton />
      </FilterContainer>
    </SearchContainer>
  );
}

export default OrganisationSearchAndSort;
