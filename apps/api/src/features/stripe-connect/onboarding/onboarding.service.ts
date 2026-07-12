import validateSchema from "@/features/auth/utils/validateSchema";
import stripe from "@/config/stripe";
import findOrganisationById from "@/features/shared-repositories/findOrganisationById.repository";
import updateOrganisationStripeId from "./onboarding.repository";
import onboardingSchema from "./onboarding.schema";
import updateOrganisationById from "@/features/shared-repositories/updateOrganisationById.repository";

async function onboardingService(organisationId: number, domainUrl: string) {
  const validationResult = validateSchema(onboardingSchema, {
    organisationId,
    domainUrl,
  });

  const { email, id, stripeAccountId } = await findOrganisationById(
    organisationId,
    {
      email: true,
      id: true,
      stripeAccountId: true,
    },
  );

  let orgStripeAccountId = stripeAccountId;

  if (!orgStripeAccountId) {
    const account = await stripe.accounts.create({
      type: "express",
      email,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true }, // needed to receive payouts
      },
    });

    orgStripeAccountId = account.id;

    await updateOrganisationById(id, { stripeAccountId: orgStripeAccountId });
  }

  const accountLink = await stripe.accountLinks.create({
    account: orgStripeAccountId,
    refresh_url: `${domainUrl}/settings/stripe/refresh`,
    return_url: `${domainUrl}/settings/stripe/complete`,
    type: "account_onboarding",
  });

  return { url: accountLink.url }; // redirect organisationDetails here
}

export default onboardingService;
