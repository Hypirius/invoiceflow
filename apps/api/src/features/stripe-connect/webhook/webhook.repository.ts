import prisma from "@/config/db";

type updateFeaturesType = {
  chargesEnabled: boolean;
  payoutsEnabled: boolean;
};

async function updateOrganisationStripeFeatures(
  stripeAccountId: string,
  { chargesEnabled, payoutsEnabled }: updateFeaturesType,
) {
  return await prisma.organisation.update({
    where: {
      stripeAccountId,
    },
    data: {
      chargesEnabled,
      payoutsEnabled,
    },
  });
}

export default updateOrganisationStripeFeatures;
