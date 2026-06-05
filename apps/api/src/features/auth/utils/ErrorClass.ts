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

class UserNotFound extends AppError {
  constructor() {
    super(
      "User on data was not found",
      404,
      "ERR_USER_NOT_FOUND",
      true,
      "UserNotFound",
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

export {
  UserExistsError,
  IncorrectDetailsError,
  UserNotFound,
  TokenExpiredError,
  DBTokenMismatch,
  TokenUserNotExistsError,
  TokenDecryptionFailedError,
  TokenInvalidError,
};
