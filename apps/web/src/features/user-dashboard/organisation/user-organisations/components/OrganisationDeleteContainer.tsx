"use client";

import { ToggleProvider } from "@/features/modal/context/toggle";
import OrganisationDeletionModal from "../modals/OrganisationDeletionModal";
import ModalOpenButton from "@/features/modal/ModalOpenButton";
import { UserOrganisation } from "../types/UserOrganisation";
import ModalMain from "@/features/modal/ModalMain";
import QueryClientWrapper from "@/components/shared/QueryClientWrapper";

function OrganisationDeleteContainer({
  selectedOrganisations,
}: {
  selectedOrganisations: UserOrganisation[];
}) {
  return (
    <ToggleProvider>
      <ModalOpenButton isDisabled={selectedOrganisations.length <= 0}>
        Delete
      </ModalOpenButton>
      <ModalMain>
        <QueryClientWrapper>
          <OrganisationDeletionModal
            selectedOrganisations={selectedOrganisations}
          />
        </QueryClientWrapper>
      </ModalMain>
    </ToggleProvider>
  );
}

export default OrganisationDeleteContainer;
