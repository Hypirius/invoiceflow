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

class TokenExistsError extends AppError {
  constructor() {
    super(
      "Unable to generate tokens, already exists",
      422,
      "ERR_TOKEN_EXISTS",
      true,
      "TokenExistsError",
    );
  }
}

class IncorrectOtpError extends AppError {
  constructor() {
    super(
      "Provided otp does not match",
      404,
      "ERR_OTP_INCORRECT",
      true,
      "IncorrectOtpError",
    );
  }
}

class AttemptsExceededError extends AppError {
  constructor() {
    super(
      "Too many attempts on otp, invalidating otp",
      429,
      "ERR_ATTEMPTS_EXCEEDED",
      true,
      "AttemptsExceededError",
    );
  }
}

class StateMismatchError extends AppError {
  constructor() {
    super(
      "State provided by oauth provider and client do not match",
      401,
      "ERR_STATE_MISMATCH",
      true,
      "StateMismatchError",
    );
  }
}

class OauthProviderError extends AppError {
  constructor() {
    super(
      "Unable to process oauth, provider returned error",
      422,
      "ERR_PROVIDER_REJECTED",
      true,
      "OauthProviderError",
    );
  }
}

class OtpNotExistsError extends AppError {
  constructor() {
    super(
      "Otp on requested email was not found",
      404,
      "ERR_OTP_NOT_EXISTS",
      true,
      "OtpNotExistsError",
    );
  }
}

class OldTokenDetectedError extends AppError {
  constructor() {
    super(
      "Old refresh token is detected. You have been outsmarted, all tokens are now expired",
      403,
      "ERR_OLD_TOKEN_DETECTED",
      true,
      "OldTokenDetectedError",
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
  TokenExistsError,
  IncorrectOtpError,
  AttemptsExceededError,
  StateMismatchError,
  OauthProviderError,
  OtpNotExistsError,
  OldTokenDetectedError,
};

//TODO: CHECK ALL STATUS CODE AND CHANGE THE ERROR STATES TO A SEPARATE OBJECT
