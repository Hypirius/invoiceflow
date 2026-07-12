import AppError from "@/lib/errors/AppError";

class UserOrganisationsNotFoundError extends AppError {
  constructor() {
    super(
      "No organisations of user was found",
      404,
      "ERR_USER_ORGANISATIONS_NOT_FOUND",
      true,
      "UserOrganisationsNotFoundError",
    );
  }
}

export { UserOrganisationsNotFoundError };
