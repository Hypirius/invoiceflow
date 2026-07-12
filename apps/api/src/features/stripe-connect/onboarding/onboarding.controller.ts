import ApiSuccessResponse from "@/utils/ApiSuccessResponse";
import { Request, Response } from "express";
import onboardingService from "./onboarding.service";
import getRequestUrl from "@/utils/getRequestUrl";

async function onboardingController(req: Request, res: Response) {
  const { domainUrl } = getRequestUrl(req);
  const organisationId = req.params.organisationId;

  const data = await onboardingService(Number(organisationId), domainUrl);
  res.status(200).json(
    new ApiSuccessResponse("Successfully created stripe onboarding link", {
      url: data.url,
    }),
  );
}

export default onboardingController;
