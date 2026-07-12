import AppError from "@/lib/errors/AppError";

class OrganisationNotFoundError extends AppError {
  constructor() {
    super("Specifed organisation was not found", 404, "ERR_ORGANISATION_NOT_");
  }
}
