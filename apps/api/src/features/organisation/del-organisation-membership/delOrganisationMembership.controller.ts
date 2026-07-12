import readJwtPayload from "@/utils/readJwtPayload";
import { Request, Response } from "express";
import delOrganisationService from "./delOrganisationMembership.service";

async function delOrganisationController(req: Request, res: Response) {
  const { sub } = readJwtPayload(req.headers);
  await delOrganisationService(req.body, sub);

  res.status(204).end();
}

export default delOrganisationController;
