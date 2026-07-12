import { Router, raw } from "express";
import onboardingController from "./onboarding/onboarding.controller";
import webhookController from "./webhook/webhook.controller";

const stripeRoutes: Router = Router();

stripeRoutes.post("/:organisationId/stripe-onboarding", onboardingController);
stripeRoutes.post(
  "/webhook/stripe-connect",
  raw({ type: "application/json" }),
  webhookController,
);

export default stripeRoutes;
