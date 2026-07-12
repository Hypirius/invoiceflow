"use client";

import { ToggleProvider } from "@/features/modal/context/toggle";
import ModalOpenButton from "@/features/modal/ModalOpenButton";
import ChangePasswordModal from "../modal/ChangePasswordModal";

function ChangePasswordContainer() {
  return (
    <ToggleProvider>
      <ModalOpenButton className="mt-8 justify-self-start">
        Change password
      </ModalOpenButton>
      <ChangePasswordModal />
    </ToggleProvider>
  );
}

export default ChangePasswordContainer;
