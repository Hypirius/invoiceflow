import findUserOrganisations from "../server/findUserOrganisations";
import UserOrganisationsContainer from "./UserOrganisationContainer";

async function UserOrganisationsMain() {
  const {
    data: userOrganisationsList,
    error,
    isError,
  } = await findUserOrganisations();

  return (
    <UserOrganisationsContainer
      userOrganisationsList={userOrganisationsList}
      errorMessage={error}
      isError={isError}
    />
  );
}

export default UserOrganisationsMain;
