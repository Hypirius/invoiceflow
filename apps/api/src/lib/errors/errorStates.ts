const globalErrorStates = {
  INTERNAL_SERVER: {
    code: "ERR_INTERNAL_SERVER",
    message: "An internal server error has occured",
  },
  FORBIDDEN_ERR: {
    code: "ERR_CLIENT_FORBIDDEN",
    message: "Client is not whitelisted for access",
  },
  VALIDATION_ERR: {
    code: "ERR_VALIDATION_FAILED",
    message: "One or more fields have incorrect state or format",
  },
  EMAIL_SERVICE_ERR: {
    code: "ERR_EMAIL_SEND_FAILED",
    message: "Unable to send verification email, please try again later",
  },
};

export { globalErrorStates };

// TODO: A potentially better way of error definition can be done
