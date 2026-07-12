"use client";

import CreateOrganisationForm from "./CreateOrganisationForm";
import CloseDialogCross from "../../../../modal/CloseDialogCross";
import QueryClientWrapper from "@/components/shared/QueryClientWrapper";

function CreateOrganisationMain() {
  return (
    <div className="w-220 h-220  p-15 text-left relative">
      <QueryClientWrapper>
        <CreateOrganisationForm />
      </QueryClientWrapper>
      <CloseDialogCross />
    </div>
  );
}

export default CreateOrganisationMain;
