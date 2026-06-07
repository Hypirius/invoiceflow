import AppError from "@/lib/errors/AppError";
import { $ZodIssue } from "zod/v4/core";

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

class UserNotFoundError extends AppError {
  constructor() {
    super(
      "User on data was not found",
      404,
      "ERR_USER_NOT_FOUND",
      true,
      "UserNotFoundError",
    );
  }
}

class TokenExpiredError extends AppError {
  constructor() {
    super(
      "Token expired, please login again",
      401,
      "ERR_TOKEN_EXPIRED",
      true,
      "TokenExpiredError",
    );
  }
}

class DBTokenMismatch extends AppError {
  constructor() {
    super(
      "Incorrect token has been provided, mismatch occured",
      409,
      "ERR_TOKEN_MISMATCH",
      true,
      "DBTokenMismatch",
    );
  }
}

class TokenUserNotExistsError extends AppError {
  constructor() {
    super(
      "User on token doesn't exist",
      404,
      "ERR_TOKEN_USER_NOT_FOUND",
      true,
      "TokenUserNotExistsError",
    );
  }
}

class TokenDecryptionFailedError extends AppError {
  constructor() {
    super(
      "Incorrect key or corrupted token",
      422,
      "ERR_TOKEN_DECRYPTION_FAILED",
      true,
      "TokenDecryptionFailedError",
    );
  }
}

class TokenInvalidError extends AppError {
  constructor() {
    super(
      "This token is not a valid token, JWE structure incorrect",
      422,
      "ERR_TOKEN_INVALID",
      true,
      "TokenInvalidError",
    );
  }
}

class AuthenicationFailedError extends AppError {
  constructor(data: $ZodIssue[]) {
    super(
      "Missing or incorrect authorization token, go to /access-token to regenerate token or login again",
      403,
      "ERR_AUTHENICATION_FAILED",
      true,
      "AuthenicationFailedError",
      data,
    );
  }
}

class PasswordHashMismatchError extends AppError {
  constructor() {
    super(
      "Incorrect password was provided",
      403,
      "ERR_PASSWORD_INCORRECT",
      true,
      "PasswordHashMismatch",
    );
  }
}

export {
  UserExistsError,
  IncorrectDetailsError,
  UserNotFoundError,
  TokenExpiredError,
  DBTokenMismatch,
  TokenUserNotExistsError,
  TokenDecryptionFailedError,
  TokenInvalidError,
  AuthenicationFailedError,
  PasswordHashMismatchError,
};
