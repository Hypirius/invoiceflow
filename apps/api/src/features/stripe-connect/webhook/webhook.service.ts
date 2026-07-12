import stripe from "@/config/stripe";
import Stripe from "stripe";
import { StripeSignatureMismatchError } from "../ErrorClass";
import config from "@/config/env";
import updateOrganisationStripeFeatures from "./webhook.repository";

async function webhookService(signature: string, buffer: Buffer) {
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buffer,
      signature,
      config.STRIPE_WEBHOOK_CONNECT_SECRET,
    );
  } catch (err) {
    throw new StripeSignatureMismatchError();
  }

  switch (event.type) {
    case "account.updated": {
      const account = event.data.object as Stripe.Account;
      await updateOrganisationStripeFeatures(account.id, {
        chargesEnabled: account.charges_enabled,
        payoutsEnabled: account.payouts_enabled,
      });

      break;
    }
    case "account.application.deauthorized": {
      //TODO: requirements and disabled reasons showcase
      break;
    }
  }

  return { received: true };
}

export default webhookService;
