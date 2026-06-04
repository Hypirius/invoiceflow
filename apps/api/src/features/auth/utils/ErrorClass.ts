import AppError from "@/lib/errors/AppError";

class UserExistsError extends AppError {
  constructor() {
    super(
      "Email is already used, please login in or use a different email",
      409,
      "ERR_USER_ALREADY_EXISTS",
      true,
      "UserExistsError",
    );
  }
}

class IncorrectDetailsError extends AppError {
  constructor() {
    super(
      "Email or password is incorrect",
      401,
      "ERR_INCORRECT_DETAILS",
      true,
      "IncorrectDetailsError",
    );
  }
}

export { UserExistsError, IncorrectDetailsError };
