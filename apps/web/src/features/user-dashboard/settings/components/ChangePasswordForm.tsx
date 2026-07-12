import InputWithLabelAndError from "@/components/shared/InputWIthLabelAndError";
import Button from "@/components/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "@repo/zod-schema/change-details/changePassword.schema.ts";
import { ChangePasswordType } from "@repo/zod-schema/change-details/types/changePassword.types.ts";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/shared/UserMessages/ErrorMessage";
import useChangeUserDetails from "../hooks/useChangeUserDetails";
import useConditionalRedirect from "@/hooks/useConditionalRedirect";

function ChangePasswordForm() {
  const { register, handleSubmit } = useForm<ChangePasswordType>({
    resolver: zodResolver(changePasswordSchema),
  });

  const { mutate, isError, error, isSuccess, isPending } =
    useChangeUserDetails();

  useConditionalRedirect("/login", isSuccess);

  return (
    <>
      {isError && <ErrorMessage>{error.message}</ErrorMessage>}
      <form
        onSubmit={handleSubmit((data) => mutate({ passwordDetails: data }))}
      >
        <InputWithLabelAndError
          id="current-password"
          labelText="Current password"
          {...register("currentPassword")}
          type="password"
        />
        <InputWithLabelAndError
          id="new-password"
          labelText="New password"
          {...register("newPassword")}
          type="password"
        />
        <Button variant="primary" type="submit" isDisabled={isPending}>
          Submit
        </Button>
      </form>
    </>
  );
}

export default ChangePasswordForm;
