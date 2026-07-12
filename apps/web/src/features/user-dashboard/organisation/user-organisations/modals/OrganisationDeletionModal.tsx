import { UserOrganisation } from "../types/UserOrganisation";
import CloseDialogButton from "@/features/modal/CloseDialogButton";
import Button from "@/components/ui/Button";
import ErrorOrSuccessMessage from "@/components/shared/UserMessages/ErrorOrSuccessMessage";
import useDelete from "@/hooks/useDelete";
import fetchUrls from "@/config/fetchUrls";

type OrganisationDeletionModalProps = {
  selectedOrganisations: UserOrganisation[];
};

function OrganisationDeletionModal({
  selectedOrganisations,
}: OrganisationDeletionModalProps) {
  const { mutate, isPending, error, isSuccess } = useDelete({
    url: fetchUrls.organisation,
    key: "deleteOrganisations",
  });

  return (
    <div className="w-120 rounded min-h-32 p-4 flex flex-col justify-center items-center gap-4 [&_h2]">
      <ErrorOrSuccessMessage
        errorMessage={error?.message}
        successMessage={
          isSuccess ? "Successfully deleted organisations" : undefined
        }
      />
      <h2 className="text-xl font-bold">Please confirm deletion</h2>
      <p>Your memberships on these organisations will be removed:</p>
      <ol>
        {selectedOrganisations.map(({ id, name }) => (
          <li key={id} className="font-semibold">
            {name}
          </li>
        ))}
      </ol>

      <h3 className="text-xl font-bold">Owned organisations:</h3>
      <p>These organisations will be deleted permanently:</p>
      <ol>
        {selectedOrganisations
          .filter(({ role }) => role === "owner")
          .map(({ name, id }) => (
            <li key={id} className="font-semibold">
              {name}
            </li>
          ))}
      </ol>

      <div className="*:inline *:w-20 ">
        <Button
          isDisabled={isPending}
          variant="primary"
          onClick={() => mutate(selectedOrganisations.map(({ id }) => id))}
          className="mr-2"
        >
          Yes
        </Button>
        <CloseDialogButton>No</CloseDialogButton>
      </div>
    </div>
  );
}

export default OrganisationDeletionModal;
