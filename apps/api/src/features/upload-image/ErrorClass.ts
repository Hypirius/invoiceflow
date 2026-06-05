import AppError from "@/lib/errors/AppError";

class SignatureFailedError extends AppError {
  constructor() {
    super(
      "Unable to generate signature for image upload",
      500,
      "ERR_SIGNATURE_GEN_FAILED",
      true,
    );
  }
}

export { SignatureFailedError };
