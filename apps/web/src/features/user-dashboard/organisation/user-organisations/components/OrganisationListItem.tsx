import ListItemContainer from "@/components/shared/Lists/ListItemContainer";
import Image from "next/image";
import { ChangeEvent } from "react";
import { UserOrganisation } from "../types/UserOrganisation";

type OrganisationListItemProps = {
  organisationItem: UserOrganisation;
  handleSelection: (
    chosenOrganisation: UserOrganisation,
    action: "add" | "remove",
  ) => void;
};

function OrganisationListItem({
  organisationItem,
  handleSelection,
}: OrganisationListItemProps) {
  const {
    name,
    logoLink,
    role,
    owner: { profileImage, displayName },
  } = organisationItem;
  function handleClick(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.checked) {
      handleSelection(organisationItem, "add");
    } else {
      handleSelection(organisationItem, "remove");
    }
  }

  return (
    <ListItemContainer onChangeFn={handleClick}>
      <p className="flex-1 flex justify-center items-center gap-2">
        <Image src={logoLink} alt={`${name}-logo`} width={30} height={30} />
        {name}
      </p>
      <p className="flex-1 ml-14">{role}</p>
      <p className="flex-1 flex justify-center items-center gap-2">
        <Image
          src={profileImage}
          alt={`${displayName} profile image`}
          width={30}
          height={30}
        />
        {displayName}
      </p>
    </ListItemContainer>
  );
}
export default OrganisationListItem;
