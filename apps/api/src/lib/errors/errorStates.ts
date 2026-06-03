const globalErrorStates = {
  INTERNAL_SERVER: {
    code: "ERR_INTERNAL_SERVER",
    message: "An internal server error has occured",
  },
  FORBIDDEN_ERR: {
    code: "ERR_CLIENT_FORBIDDEN",
    message: "Client is not whitelisted for access",
  },
};

export { globalErrorStates };

// TODO: A potentially better way of error definition can be done
