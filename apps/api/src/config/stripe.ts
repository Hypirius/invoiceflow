import Stripe from "stripe";
import config from "./env";

const stripe = new Stripe(config.STRIPE_SECRET_KEY, {
  typescript: true,
  maxNetworkRetries: 3,
});

//TODO: could use more config options

export default stripe;
