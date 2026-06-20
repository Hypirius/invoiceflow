import { Router } from "express";
import checkAuth from "./features/auth/checkAuth.middleware";

const protectedRouter: Router = Router();

protectedRouter.use(checkAuth());

export default protectedRouter;
