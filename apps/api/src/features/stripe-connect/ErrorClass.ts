import AppError from "@/lib/errors/AppError";

class StripeSignatureMismatchError extends AppError {
  constructor() {
    super(
      "Webhook signature verification failed",
      400,
      "ERR_STRIPE_SIGNATURE_FAILED",
      true,
      "StripeSignatureMismatchError",
    );
  }
}

export { StripeSignatureMismatchError };
