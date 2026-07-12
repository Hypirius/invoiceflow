import { Router } from "express";
import checkAuth from "./features/auth/checkAuth.middleware";
import changeDetailsController from "./features/auth/change-details/changeDetails.controller";
import organisationRouter from "./features/organisation/routes";

const protectedRouter: Router = Router();

protectedRouter.use(checkAuth());
protectedRouter.post("/auth/change-details", changeDetailsController);
protectedRouter.use("/organisation", organisationRouter);

export default protectedRouter;
