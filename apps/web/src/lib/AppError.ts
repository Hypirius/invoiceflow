class AppError extends Error {
  success: false;
  code: string;
  constructor(message: string, code: string) {
    super(message);
    this.success = false;
    this.code = code;
  }
}

class FetchError extends AppError {
  constructor() {
    super("Failed to fetch data from api", "ERR_FETCH_ERROR");
  }
}

export { AppError, FetchError };
