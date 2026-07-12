import { Request, Response } from "express";
import createOrganisationService from "./createOrganisation.service";
import readJwtPayload from "@/utils/readJwtPayload";
import ApiSuccessResponse from "@/utils/ApiSuccessResponse";

async function createOrganisationController(req: Request, res: Response) {
  const { sub } = readJwtPayload(req.headers);

  const reqId = req.headers["request-id"] as string;

  await createOrganisationService(req.body, sub, reqId);

  res
    .status(201)
    .json(
      new ApiSuccessResponse(
        "Successfully created organisation and its details",
      ),
    );
}

export default createOrganisationController;
