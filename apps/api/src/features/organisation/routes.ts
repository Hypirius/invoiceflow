import { Router } from "express";
import createOrganisationController from "./create-organisation/createOrganisation.controller";
import findOrganisationsController from "./find-organisations/findOrganisations.controller";
import delOrganisationController from "./del-organisation-membership/delOrganisationMembership.controller";

const organisationRouter: Router = Router();

//TODO: could be change to router.route().method() potentially

organisationRouter.post("/", createOrganisationController);
organisationRouter.get("/", findOrganisationsController);
organisationRouter.delete("/", delOrganisationController);

export default organisationRouter;
