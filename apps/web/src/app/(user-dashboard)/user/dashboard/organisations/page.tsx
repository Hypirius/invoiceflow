import ListHeader from "@/components/shared/Lists/ListHeader";
import CreateOrganisationButton from "@/features/user-dashboard/organisation/create-organisation/components/CreateOrganisationButton";
import UserOrganisationsMain from "@/features/user-dashboard/organisation/user-organisations/components/UserOrganisationsMain";
import { Suspense } from "react";

function OrganisationPage() {
  return (
    <div>
      <ListHeader
        headText="Organisation"
        subHeadingText="Manage your organisations"
      >
        <CreateOrganisationButton className="w-50 h-9 rounded-md font-medium text-[14px]" />
      </ListHeader>
      <Suspense fallback={<p>Loading organisations...</p>}>
        <UserOrganisationsMain />
      </Suspense>
    </div>
  );
}

export default OrganisationPage;
