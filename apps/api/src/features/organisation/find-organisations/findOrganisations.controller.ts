import { Request, Response } from "express";
import ApiSuccessResponse from "@/utils/ApiSuccessResponse";
import findOrganisationService from "./findOrganisations.service";
import readJwtPayload from "@/utils/readJwtPayload";

async function findOrganisationsController(req: Request, res: Response) {
  const { sub: userId } = readJwtPayload(req.headers);

  const data = await findOrganisationService(userId);

  res
    .status(200)
    .json(
      new ApiSuccessResponse(
        `Successfully found organisations of user ${userId}`,
        data,
      ),
    );
}

export default findOrganisationsController;
