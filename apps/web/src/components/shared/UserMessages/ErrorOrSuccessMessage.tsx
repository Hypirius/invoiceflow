import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";

type ErrorOrSuccessMessageProps = {
  errorMessage: string | undefined;
  successMessage: string | undefined;
};

function ErrorOrSuccessMessage({
  errorMessage,
  successMessage,
}: ErrorOrSuccessMessageProps) {
  if (errorMessage) return <ErrorMessage>{errorMessage}</ErrorMessage>;

  if (successMessage) return <SuccessMessage>{successMessage}</SuccessMessage>;
}

export default ErrorOrSuccessMessage;
