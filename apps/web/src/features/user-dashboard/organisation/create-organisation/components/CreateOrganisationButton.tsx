"use client";

import { ToggleProvider } from "@/features/modal/context/toggle";
import CreateOrganisationModal from "../modals/CreateOrganisationModal";
import ModalOpenButton from "@/features/modal/ModalOpenButton";

function CreateOrganisationContainer({ className }: { className?: string }) {
  return (
    <ToggleProvider>
      <ModalOpenButton className={className}>
        + Create Organisation
      </ModalOpenButton>
      <CreateOrganisationModal />
    </ToggleProvider>
  );
}

export default CreateOrganisationContainer;
