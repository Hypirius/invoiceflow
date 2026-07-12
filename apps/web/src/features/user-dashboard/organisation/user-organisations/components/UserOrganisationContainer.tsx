"use client";

import ErrorMessage from "@/components/shared/UserMessages/ErrorMessage";
import { UserOrganisation } from "../types/UserOrganisation";
import ListContainer from "@/components/shared/Lists/ListContainer";
import OrganisationListColumns from "./OrganisationListColumn";
import OrganisationListItem from "./OrganisationListItem";
import { useState } from "react";
import OrganisationSearchAndSort from "./OrganisationSearchAndSort";
import OrganisationDeleteContainer from "./OrganisationDeleteContainer";

type UserOrganisationsContainerProps = {
  userOrganisationsList: UserOrganisation[];
  errorMessage: string | null;
  isError: boolean;
};

function UserOrganisationsContainer({
  userOrganisationsList,
  errorMessage,
  isError,
}: UserOrganisationsContainerProps) {
  const [userOrganisations, setUserOrganisations] = useState(
    userOrganisationsList,
  );
  const [selectedOrganisations, setSelectedOrganisations] = useState<
    UserOrganisation[]
  >([]);

  function handleSelection(
    chosenOrganisation: UserOrganisation,
    action: "add" | "remove",
  ) {
    if (action === "add") {
      setSelectedOrganisations([...selectedOrganisations, chosenOrganisation]);
    } else if (action === "remove") {
      setSelectedOrganisations(
        selectedOrganisations.filter(
          (organisation) => organisation.id !== chosenOrganisation.id,
        ),
      );
    }
  }

  return (
    <>
      {isError && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <ListContainer>
        <OrganisationSearchAndSort
          data={userOrganisations}
          setSortedData={(data) => setUserOrganisations(data)}
          originalData={userOrganisationsList}
        />
        <OrganisationDeleteContainer
          selectedOrganisations={selectedOrganisations}
        />
        <OrganisationListColumns />
        {userOrganisations.length > 0 ? (
          userOrganisations.map((organisationItem) => (
            <OrganisationListItem
              organisationItem={organisationItem}
              key={organisationItem.id}
              handleSelection={handleSelection}
            />
          ))
        ) : (
          <p>No organisations found. Please create an organisation</p>
        )}
      </ListContainer>
    </>
  );
}

//TODO: static components can be optimized, ie: use them as server components instead of client as in here currently

export default UserOrganisationsContainer;
